export interface DashboardStats {
  walletBalance: number
  availableBalance: number
  todaysPayout: number
  todaysCredit: number
  todaysDebit: number
  successfulPayouts: number
  failedPayouts: number
  pendingPayouts: number
}

export interface PayoutChartData {
  date: string
  amount: number
}

export interface RecentTransaction {
  id: string
  type: 'PAYOUT' | 'DEPOSIT' | 'WITHDRAWAL'
  amount: number
  status: 'SUCCESS' | 'FAILED' | 'PENDING'
  date: Date
  description: string
}

export interface RecentPayout {
  id: string
  beneficiaryName: string
  avatar: string
  bankInfo: string
  amount: number
  mode: string
  status: 'SUCCESS' | 'FAILED' | 'PENDING'
}

export interface DashboardData {
  stats: DashboardStats
  chartData: PayoutChartData[]
  recentTransactions: RecentTransaction[]
  recentPayouts: RecentPayout[]
}
