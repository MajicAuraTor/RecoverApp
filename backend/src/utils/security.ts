import crypto from 'crypto';

// 🔐 PHI/PII ENCRYPTION UTILITIES
// These functions handle encryption/decryption of sensitive health data

export class PHIEncryption {
  private static algorithm = 'aes-256-cbc';
  private static keyLength = 32; // 256 bits

  /**
   * Generate a new encryption key (store securely in environment)
   */
  static generateEncryptionKey(): string {
    return crypto.randomBytes(this.keyLength).toString('hex');
  }

  /**
   * Encrypt PHI data before storing in database
   */
  static encryptPHI(data: string, key?: string): string {
    if (!data) return '';
    
    const encryptionKey = key || process.env.PHI_ENCRYPTION_KEY;
    if (!encryptionKey) {
      throw new Error('PHI_ENCRYPTION_KEY not found in environment variables');
    }

    const keyBuffer = Buffer.from(encryptionKey, 'hex');
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, keyBuffer, iv);

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Return format: iv:encrypted
    return `${iv.toString('hex')}:${encrypted}`;
  }

  /**
   * Decrypt PHI data when retrieving from database
   */
  static decryptPHI(encryptedData: string, key?: string): string {
    if (!encryptedData) return '';
    
    const encryptionKey = key || process.env.PHI_ENCRYPTION_KEY;
    if (!encryptionKey) {
      throw new Error('PHI_ENCRYPTION_KEY not found in environment variables');
    }

    const parts = encryptedData.split(':');
    if (parts.length !== 2) {
      throw new Error('Invalid encrypted data format');
    }

    const [ivHex, encrypted] = parts;
    const keyBuffer = Buffer.from(encryptionKey, 'hex');
    const iv = Buffer.from(ivHex, 'hex');

    const decipher = crypto.createDecipheriv(this.algorithm, keyBuffer, iv);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  /**
   * Hash sensitive data for indexing (one-way)
   */
  static hashForIndex(data: string): string {
    return crypto
      .createHash('sha256')
      .update(data + (process.env.HASH_SALT || 'default-salt'))
      .digest('hex');
  }
}

// 📋 AUDIT LOGGING FOR PHI ACCESS
export interface AuditLogEntry {
  userId: string;
  action: string;
  resource: string;
  phiAccessed: boolean;
  phiFields?: string[];
  patientId?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  success: boolean;
  reasonCode: 'treatment' | 'payment' | 'operations' | 'patient-request' | 'legal';
  details?: any;
}

export class AuditLogger {
  /**
   * Log PHI access for HIPAA compliance
   */
  static async logPHIAccess(entry: AuditLogEntry): Promise<void> {
    try {
      // In production, this would write to a secure, tamper-proof audit database
      console.log('🔍 PHI ACCESS AUDIT:', {
        timestamp: entry.timestamp.toISOString(),
        user: entry.userId,
        action: entry.action,
        phi: entry.phiAccessed,
        patient: entry.patientId,
        reason: entry.reasonCode,
        ip: entry.ipAddress
      });

      // TODO: Implement database storage
      // await executeQuery(`
      //   INSERT INTO audit_logs 
      //   (user_id, action, resource, phi_accessed, phi_fields, patient_id, 
      //    ip_address, user_agent, timestamp, success, reason_code, details)
      //   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      // `, [entry.userId, entry.action, entry.resource, entry.phiAccessed, 
      //     JSON.stringify(entry.phiFields), entry.patientId, entry.ipAddress,
      //     entry.userAgent, entry.timestamp, entry.success, entry.reasonCode,
      //     JSON.stringify(entry.details)]);

    } catch (error) {
      console.error('❌ Failed to log PHI access:', error);
      // In production, this should trigger an alert
    }
  }

  /**
   * Log failed access attempts
   */
  static async logAccessDenied(userId: string, resource: string, reason: string, req: any): Promise<void> {
    await this.logPHIAccess({
      userId: userId || 'anonymous',
      action: 'ACCESS_DENIED',
      resource,
      phiAccessed: false,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent') || 'unknown',
      timestamp: new Date(),
      success: false,
      reasonCode: 'legal',
      details: { reason }
    });
  }
}

// 🛡️ DATA SANITIZATION FOR DIFFERENT ROLES
export class DataSanitizer {
  /**
   * Remove or mask PHI based on user role and purpose
   */
  static sanitizePatientData(data: any, userRole: string, purpose: string): any {
    const allowedFields = {
      'patient': {
        'self-access': ['id', 'firstName', 'lastName', 'email', 'phone', 'medicalHistory'],
        'general': ['id', 'firstName', 'lastName']
      },
      'provider': {
        'treatment': ['*'], // All fields for treatment
        'general': ['id', 'firstName', 'lastName', 'email', 'phone', 'medicalRecordNumber']
      },
      'admin': {
        'operations': ['*'], // All fields for operations
        'general': ['id', 'firstName', 'lastName', 'email', 'createdAt']
      }
    };

    const rolePermissions = allowedFields[userRole as keyof typeof allowedFields];
    if (!rolePermissions) return {};

    const purposeFields = rolePermissions[purpose as keyof typeof rolePermissions] || rolePermissions['general'];
    
    if (purposeFields.includes('*')) {
      return data; // Full access
    }

    // Filter to only allowed fields
    const sanitized: any = {};
    purposeFields.forEach(field => {
      if (data[field] !== undefined) {
        sanitized[field] = data[field];
      }
    });

    return sanitized;
  }

  /**
   * Mask sensitive data for logging
   */
  static maskForLogging(data: any): any {
    const sensitiveFields = ['ssn', 'dateOfBirth', 'medicalRecordNumber', 'phone', 'email'];
    const masked = { ...data };

    sensitiveFields.forEach(field => {
      if (masked[field]) {
        if (field === 'email') {
          masked[field] = masked[field].replace(/(.{2})(.*)(@.*)/, '$1***$3');
        } else if (field === 'phone') {
          masked[field] = masked[field].replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');
        } else {
          masked[field] = '***MASKED***';
        }
      }
    });

    return masked;
  }
}

// 🔒 SECURE SESSION MANAGEMENT
export class SecureSession {
  /**
   * Generate secure session token
   */
  static generateSessionToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Validate session and check for suspicious activity
   */
  static validateSession(sessionData: any, req: any): boolean {
    // Check for session hijacking indicators
    const currentIP = req.ip;
    const currentUserAgent = req.get('User-Agent');
    
    if (sessionData.ipAddress !== currentIP) {
      console.warn('🚨 Potential session hijacking - IP mismatch');
      return false;
    }

    if (sessionData.userAgent !== currentUserAgent) {
      console.warn('🚨 Potential session hijacking - User Agent mismatch');
      return false;
    }

    return true;
  }
}

export default {
  PHIEncryption,
  AuditLogger,
  DataSanitizer,
  SecureSession
};
