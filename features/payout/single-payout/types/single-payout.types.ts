// Single payout transaction returned by the backend
export interface SinglePayoutTransaction {
  id: number
  transactionId: string
  utrNumber: string | null
  merchantName: string | null
  beneficiaryName: string | null
  accountNumber: string | null
  ifscCode: string | null
  amount: number
  paymentMode: PaymentMode | null
  payoutType: PayoutType
  payoutStatus: PayoutStatus
  createdAt: string
}

// Backend PaymentMode enum
export type PaymentMode =
  | 'IMPS'
  | 'NEFT'
  | 'RTGS'
  | 'UPI'

// Backend PayoutStatus enum
export type PayoutStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SUCCESS'
  | 'FAILED'
  | 'REJECTED'

// Backend PayoutType enum
export type PayoutType =
  | 'SINGLE'
  | 'DIRECT'
  | 'BULK'

// Spring Boot Page<TransactionResponse>
export interface SinglePayoutListResponse {
  content: SinglePayoutTransaction[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
  numberOfElements: number
  empty: boolean
}



//old tyhpes is pasting here 

export type SinglePayoutStep = 'form' | 'review' | 'otp' | 'result'



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