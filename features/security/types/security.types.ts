export type SecurityTabId =
  | 'password'
  | 'sessions'
  | 'activity'

export interface SecurityTab {
  id: SecurityTabId
  label: string
}

export interface PasswordSecurityData {
  status: 'Active' | 'Expired' | 'Pending'
  lastChangedAt: string
  recommendation: string
}

export interface LoginSession {
  id: string
  deviceName: string
  browser: string
  ipAddress: string
  location: string
  lastActive: string
  isCurrentSession: boolean
}

export interface SecurityActivity {
  id: string
  title: string
  description: string
  occurredAt: string
  type: 'success' | 'warning' | 'info'
}

export interface SecurityStatusData {
  accountAccess: string
  passwordStatus: string
  statusLabel: string
  description: string
}

export interface SecuritySupportData {
  title: string
  description: string
  actionLabel: string
}