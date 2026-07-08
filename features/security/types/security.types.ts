export type SecurityActivityType =
  | 'login'
  | 'password'
  | 'device'
  | 'warning'

export interface SecuritySession {
  id: string
  device: string
  browser: string
  location: string
  ipAddress: string
  lastActive: string
  isCurrent: boolean
}

export interface SecurityActivity {
  id: string
  type: SecurityActivityType
  title: string
  description: string
  date: string
}

export interface SecurityData {
  passwordStatus: 'Active'
  lastPasswordChanged: string
  passwordPolicy: string
  sessions: SecuritySession[]
  activities: SecurityActivity[]
}