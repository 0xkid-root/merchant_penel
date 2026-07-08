import type {
  LoginSession,
  PasswordSecurityData,
  SecurityActivity,
  SecurityStatusData,
  SecuritySupportData,
  SecurityTab,
} from '../types/security.types'

export const securityTabs: SecurityTab[] = [
  {
    id: 'password',
    label: 'Password & Login',
  },
  {
    id: 'sessions',
    label: 'Active Sessions',
  },
  {
    id: 'activity',
    label: 'Security Activity',
  },
]

export const passwordSecurityData: PasswordSecurityData = {
  status: 'Active',
  lastChangedAt: '18 Jun 2025, 10:30 AM',
  recommendation: 'Password changes are recommended every 90 days.',
}

export const loginSessions: LoginSession[] = [
  {
    id: 'current-session',
    deviceName: 'Windows PC',
    browser: 'Google Chrome',
    ipAddress: '103.xxx.xxx.xxx',
    location: 'Lucknow, India',
    lastActive: 'Just now',
    isCurrentSession: true,
  },
]

export const securityActivities: SecurityActivity[] = [
  {
    id: 'activity-1',
    title: 'Successful login',
    description: 'You logged in from Windows PC using Google Chrome.',
    occurredAt: 'Today, 10:25 AM',
    type: 'success',
  },
  {
    id: 'activity-2',
    title: 'Password changed',
    description: 'Your merchant account password was updated successfully.',
    occurredAt: '18 Jun 2025, 10:30 AM',
    type: 'info',
  },
  {
    id: 'activity-3',
    title: 'Payout OTP verified',
    description: 'A payout authorization OTP was verified successfully.',
    occurredAt: '17 Jun 2025, 04:15 PM',
    type: 'success',
  },
]

export const securityStatusData: SecurityStatusData = {
  accountAccess: 'Protected',
  passwordStatus: 'Active',
  statusLabel: 'Secure',
  description:
    'Your account password is active and your current login session is protected.',
}

export const securitySupportData: SecuritySupportData = {
  title: 'Need help with account security?',
  description:
    'For changes to registered mobile number, business details, or payout authorization settings, please contact support.',
  actionLabel: 'Contact Support',
}