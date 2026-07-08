import type { SecurityData } from '../types/security.types'

export const securityMockData: SecurityData = {
  passwordStatus: 'Active',

  lastPasswordChanged: '18 Jun 2025, 10:30 AM',

  passwordPolicy: 'Password changes are recommended every 90 days.',

  sessions: [
    {
      id: 'current-session',
      device: 'Windows PC',
      browser: 'Google Chrome',
      location: 'Lucknow, India',
      ipAddress: '103.xxx.xxx.xxx',
      lastActive: 'Just now',
      isCurrent: true,
    },
  ],

  activities: [
    {
      id: 'activity-1',
      type: 'login',
      title: 'Login successful',
      description: 'Windows PC · Google Chrome · Lucknow, India',
      date: 'Today, 4:20 PM',
    },
    {
      id: 'activity-2',
      type: 'password',
      title: 'Password changed',
      description: 'Your merchant account password was updated.',
      date: '18 Jun 2025, 10:30 AM',
    },
    {
      id: 'activity-3',
      type: 'device',
      title: 'New device login',
      description: 'Windows PC · Google Chrome · Lucknow, India',
      date: '17 Jun 2025, 4:15 PM',
    },
    {
      id: 'activity-4',
      type: 'warning',
      title: 'Failed login attempt',
      description: 'An unsuccessful login attempt was detected.',
      date: '16 Jun 2025, 9:12 PM',
    },
  ],
}