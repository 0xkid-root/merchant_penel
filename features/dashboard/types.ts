export interface DashboardSummary {
  walletBalance: number
  todaysPayouts: number
  successfulPayouts: number
  failedPayouts: number
  totalFundsAdded: number
  totalBeneficiaries: number
  totalAmountPaid: number
  monthlyAmount: number
}

export interface DashboardRecentTransaction {
  transactionId: string
  beneficiaryName: string
  amount: number
  paymentMode: string
  status: string
  createdAt: string
}

export interface DashboardTrend {
  date: string
  amount: number
}

export interface PaymentModeStats {
  amount: number
  count: number
}

export interface DashboardPaymentMode {
  imps: PaymentModeStats
  neft: PaymentModeStats
  rtgs: PaymentModeStats
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}
