export type SinglePayoutStep = 'form' | 'review' | 'otp' | 'result'

export type PayoutStatus =
  | 'success'
  | 'failed'
  | 'pending'
  | 'processing'

export interface SinglePayoutBeneficiary {
  id: number
  beneficiaryName: string
  accountHolderName: string
  bankName: string
  accountNumber: string
  maskedAccountNumber: string
  ifscCode: string
  accountType: string
}

export interface SinglePayoutFormData {
  beneficiaryId: number | null
  amount: string
  remarks: string
}

export interface SinglePayoutRequest {
  beneficiaryId: number
  amount: number
  remarks: string
}

export interface SinglePayoutTransaction {
  payoutId: string
  beneficiaryName: string
  bankName: string
  maskedAccountNumber: string
  ifscCode: string
  amount: number
  charges: number
  totalDebit: number
  remarks: string
  status: PayoutStatus
  createdAt: string
}

export interface SinglePayoutResult {
  status: PayoutStatus
  payoutId: string
  message: string
  failureReason?: string
  createdAt?: string
}

export interface SinglePayoutState {
  currentStep: SinglePayoutStep
  selectedBeneficiary: SinglePayoutBeneficiary | null
  formData: SinglePayoutFormData
  otp: string
  isLoading: boolean
  result: SinglePayoutResult | null
}