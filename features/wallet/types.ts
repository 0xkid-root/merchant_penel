export interface WalletData {
  id: string
  balance: number
  availableBalance: number
  lockedBalance: number
  currency: string
  lastUpdated: Date
}

export interface AddFundsRequest {
  amount: number
  paymentMethod: 'BANK_TRANSFER' | 'UPI' | 'CARD'
}

export interface WalletTransaction {
  id: string
  type: 'DEBIT' | 'CREDIT' | 'HOLD' | 'RELEASE'
  amount: number
  description: string
  status: 'PENDING' | 'SUCCESS' | 'FAILED'
  createdAt: Date
  transactionId?: string
}

export interface WalletState {
  wallet: WalletData | null
  transactions: WalletTransaction[]
  isLoading: boolean
  error: string | null
}
