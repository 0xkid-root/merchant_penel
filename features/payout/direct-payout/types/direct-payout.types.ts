export type DirectPayoutStep = 'form' | 'review' | 'otp' | 'result'

export type DirectPayoutStatus = 'success' | 'pending' | 'failed'

export interface DirectPayoutFormData {
  accountHolderName: string
  accountNumber: string
  confirmAccountNumber: string
  ifscCode: string
  bankName: string
  branchName: string
  amount: string
  remarks: string
}

export interface DirectPayoutTransaction {
  payoutId: string
  accountHolderName: string
  accountNumber: string
  maskedAccountNumber: string
  ifscCode: string
  bankName: string
  branchName: string
  amount: number
  charges: number
  totalDebit: number
  remarks: string
  status: DirectPayoutStatus
  createdAt: string
}



export interface DirectPayoutItem {
  id: number
  payoutId: string
  accountHolderName: string
  maskedAccountNumber: string
  bankName: string
  ifscCode: string
  amount: number
  totalDebit: number
  remarks: string
  status: DirectPayoutStatus
  createdAt: string
}