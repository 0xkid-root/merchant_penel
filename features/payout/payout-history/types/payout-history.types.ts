export type PayoutType = 'single' | 'direct' | 'bulk'

export type PayoutStatus = 'success' | 'pending' | 'failed'

export interface PayoutHistoryItem {
  id: number
  payoutId: string
  payoutType: PayoutType
  beneficiaryName: string
  accountHolderName: string
  maskedAccountNumber: string
  bankName: string
  ifscCode: string
  amount: number
  charges: number
  totalDebit: number
  remarks: string
  status: PayoutStatus
  createdAt: string
}