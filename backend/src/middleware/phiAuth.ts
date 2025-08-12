import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { executeQuery } from '../config/database';
import { RowDataPacket } from 'mysql2';
import { AuditLogger } from '../utils/security';

export interface AuthRequest extends Request {
  user?: any;
  phiAccess?: {
    allowed: boolean;
    purpose: 'treatment' | 'payment' | 'operations' | 'patient-request' | 'legal';
    patientId?: string;
  };
}

// Enhanced authentication with PHI protection
export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    let token: string | undefined;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check for token in cookies
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      await AuditLogger.logAccessDenied('anonymous', req.path, 'No token provided', req);
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as any;
      
      // Get user from token with role information
      const users = await executeQuery(
        'SELECT id, name, email, role, last_login, failed_login_attempts FROM users WHERE id = ? AND is_active = 1',
        [decoded.id]
      ) as RowDataPacket[];
      
      if (users.length === 0) {
        await AuditLogger.logAccessDenied(decoded.id, req.path, 'User not found or inactive', req);
        return res.status(401).json({
          success: false,
          message: 'Token is valid but user not found or inactive'
        });
      }

      const user = users[0];

      // Check for suspicious activity (multiple failed attempts)
      if (user.failed_login_attempts > 5) {
        await AuditLogger.logAccessDenied(user.id, req.path, 'Account locked due to failed attempts', req);
        return res.status(423).json({
          success: false,
          message: 'Account temporarily locked due to suspicious activity'
        });
      }

      // Update last access time
      await executeQuery('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);

      req.user = user;
      next();
    } catch (error) {
      await AuditLogger.logAccessDenied('unknown', req.path, 'Invalid token', req);
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication service error'
    });
  }
};

// Role-based access control for PHI
export const requireRole = (allowedRoles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      await AuditLogger.logAccessDenied(
        req.user.id, 
        req.path, 
        `Role ${req.user.role} not in allowed roles: ${allowedRoles.join(', ')}`, 
        req
      );
      
      return res.status(403).json({
        success: false,
        message: 'Insufficient privileges for this resource'
      });
    }

    next();
  };
};

// PHI access control with purpose limitation
export const requirePHIAccess = (purpose: 'treatment' | 'payment' | 'operations' | 'patient-request' | 'legal') => {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required for PHI access'
      });
    }

    // Define PHI access rules by role and purpose
    const phiAccessRules = {
      'patient': ['patient-request'],
      'provider': ['treatment', 'operations'],
      'nurse': ['treatment'],
      'admin': ['operations', 'legal'],
      'billing': ['payment', 'operations']
    };

    const userRole = req.user.role;
    const allowedPurposes = phiAccessRules[userRole as keyof typeof phiAccessRules] || [];

    if (!allowedPurposes.includes(purpose)) {
      await AuditLogger.logAccessDenied(
        req.user.id,
        req.path,
        `PHI access denied: role ${userRole} not authorized for purpose ${purpose}`,
        req
      );

      return res.status(403).json({
        success: false,
        message: `PHI access denied: ${userRole} role not authorized for ${purpose} purpose`
      });
    }

    // Log PHI access attempt
    await AuditLogger.logPHIAccess({
      userId: req.user.id,
      action: 'PHI_ACCESS_GRANTED',
      resource: req.path,
      phiAccessed: true,
      patientId: req.params.patientId || req.body.patientId,
      ipAddress: req.ip || req.socket?.remoteAddress || 'unknown',
      userAgent: req.get('User-Agent') || 'unknown',
      timestamp: new Date(),
      success: true,
      reasonCode: purpose
    });

    // Set PHI access context for the request
    req.phiAccess = {
      allowed: true,
      purpose,
      patientId: req.params.patientId || req.body.patientId
    };

    next();
  };
};

// Patient data access (own data only)
export const requireOwnDataAccess = async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  const requestedPatientId = req.params.patientId || req.params.userId || req.body.patientId;
  
  // Admin and providers can access any patient data (with audit logging)
  if (['admin', 'provider', 'nurse'].includes(req.user.role)) {
    await AuditLogger.logPHIAccess({
      userId: req.user.id,
      action: 'PATIENT_DATA_ACCESS',
      resource: req.path,
      phiAccessed: true,
      patientId: requestedPatientId,
      ipAddress: req.ip || req.socket?.remoteAddress || 'unknown',
      userAgent: req.get('User-Agent') || 'unknown',
      timestamp: new Date(),
      success: true,
      reasonCode: 'treatment'
    });
    
    return next();
  }

  // Patients can only access their own data
  if (req.user.role === 'patient') {
    if (requestedPatientId && requestedPatientId !== req.user.id.toString()) {
      await AuditLogger.logAccessDenied(
        req.user.id,
        req.path,
        `Patient ${req.user.id} attempted to access data for patient ${requestedPatientId}`,
        req
      );

      return res.status(403).json({
        success: false,
        message: 'You can only access your own medical data'
      });
    }
  }

  next();
};

// Rate limiting for sensitive operations
export const rateLimitSensitiveOps = (maxAttempts: number = 5, windowMinutes: number = 15) => {
  const attempts = new Map<string, { count: number; resetTime: number }>();

  return (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
    const key = `${req.ip}-${req.user?.id || 'anonymous'}`;
    const now = Date.now();
    const windowMs = windowMinutes * 60 * 1000;

    const userAttempts = attempts.get(key);
    
    if (userAttempts) {
      if (now > userAttempts.resetTime) {
        // Reset window
        attempts.set(key, { count: 1, resetTime: now + windowMs });
      } else if (userAttempts.count >= maxAttempts) {
        // Rate limit exceeded
        return res.status(429).json({
          success: false,
          message: `Too many attempts. Try again in ${Math.ceil((userAttempts.resetTime - now) / 60000)} minutes.`
        });
      } else {
        // Increment count
        userAttempts.count++;
      }
    } else {
      // First attempt
      attempts.set(key, { count: 1, resetTime: now + windowMs });
    }

    next();
  };
};

export default {
  protect,
  requireRole,
  requirePHIAccess,
  requireOwnDataAccess,
  rateLimitSensitiveOps
};
