// HIPAA Compliance: Comprehensive Audit Logging
import { executeQuery } from '../config/database';
import { OkPacket } from 'mysql2';

export enum AuditAction {
  LOGIN = 'login',
  LOGOUT = 'logout',
  VIEW_PHI = 'view_phi',
  EDIT_PHI = 'edit_phi',
  CREATE_PHI = 'create_phi',
  DELETE_PHI = 'delete_phi',
  EXPORT_PHI = 'export_phi',
  FAILED_LOGIN = 'failed_login',
  PERMISSION_DENIED = 'permission_denied'
}

interface AuditLogEntry {
  userId: string;
  action: AuditAction;
  resourceType: string;
  resourceId?: string;
  targetUserId?: string;
  ipAddress: string;
  userAgent: string;
  details?: string;
}

export class AuditLogger {
  
  static async log(entry: AuditLogEntry): Promise<void> {
    try {
      await executeQuery(`
        INSERT INTO audit_logs (
          user_id, action, resource_type, resource_id, target_user_id,
          ip_address, user_agent, details, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `, [
        entry.userId,
        entry.action,
        entry.resourceType,
        entry.resourceId || null,
        entry.targetUserId || null,
        entry.ipAddress,
        entry.userAgent,
        entry.details || null
      ]);
    } catch (error) {
      console.error('Failed to log audit entry:', error);
      // Don't throw - audit logging should never break the app
    }
  }
  
  static async logPHIAccess(
    userId: string, 
    targetUserId: string, 
    action: AuditAction,
    req: any,
    details?: string
  ): Promise<void> {
    await this.log({
      userId,
      action,
      resourceType: 'user_data',
      targetUserId: targetUserId,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent') || 'Unknown',
      details
    });
  }
  
  static async logFailedLogin(
    email: string,
    req: any,
    reason: string
  ): Promise<void> {
    await this.log({
      userId: 'anonymous',
      action: AuditAction.FAILED_LOGIN,
      resourceType: 'authentication',
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent') || 'Unknown',
      details: `Failed login attempt for ${email}: ${reason}`
    });
  }
}

// Audit log table creation SQL
export const AUDIT_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS audit_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(255) NOT NULL,
  action ENUM('login', 'logout', 'view_phi', 'edit_phi', 'create_phi', 'delete_phi', 'export_phi', 'failed_login', 'permission_denied') NOT NULL,
  resource_type VARCHAR(100) NOT NULL,
  resource_id VARCHAR(255),
  target_user_id VARCHAR(255),
  ip_address VARCHAR(45) NOT NULL,
  user_agent TEXT,
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_audit_user_action (user_id, action),
  INDEX idx_audit_target_user (target_user_id),
  INDEX idx_audit_created (created_at)
);`;
