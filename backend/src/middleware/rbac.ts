// HIPAA Compliance: Role-Based Access Control
export enum UserRole {
  PATIENT = 'patient',
  NURSE = 'nurse', 
  DOCTOR = 'doctor',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}

export enum Permission {
  // Patient data permissions
  VIEW_OWN_PHI = 'view_own_phi',
  VIEW_ALL_PHI = 'view_all_phi',
  EDIT_OWN_PHI = 'edit_own_phi',
  EDIT_ALL_PHI = 'edit_all_phi',
  
  // System permissions
  MANAGE_USERS = 'manage_users',
  VIEW_AUDIT_LOGS = 'view_audit_logs',
  SYSTEM_ADMIN = 'system_admin'
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.PATIENT]: [
    Permission.VIEW_OWN_PHI,
    Permission.EDIT_OWN_PHI
  ],
  [UserRole.NURSE]: [
    Permission.VIEW_ALL_PHI,
    Permission.EDIT_ALL_PHI
  ],
  [UserRole.DOCTOR]: [
    Permission.VIEW_ALL_PHI,
    Permission.EDIT_ALL_PHI
  ],
  [UserRole.ADMIN]: [
    Permission.VIEW_ALL_PHI,
    Permission.EDIT_ALL_PHI,
    Permission.MANAGE_USERS,
    Permission.VIEW_AUDIT_LOGS
  ],
  [UserRole.SUPER_ADMIN]: [
    Permission.VIEW_ALL_PHI,
    Permission.EDIT_ALL_PHI,
    Permission.MANAGE_USERS,
    Permission.VIEW_AUDIT_LOGS,
    Permission.SYSTEM_ADMIN
  ]
};

export const hasPermission = (userRole: UserRole, permission: Permission): boolean => {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) || false;
};

export const canAccessUserData = (userRole: UserRole, userId: string, targetUserId: string): boolean => {
  // Users can only access their own data
  if (userRole === UserRole.PATIENT) {
    return userId === targetUserId;
  }
  
  // Healthcare providers can access all user data
  return hasPermission(userRole, Permission.VIEW_ALL_PHI);
};
