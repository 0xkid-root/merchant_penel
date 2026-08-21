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



import type { BeneficiaryResponse } from '@/features/beneficiary/types/beneficiary.types'

export type SinglePayoutStep = 'form' | 'review' | 'otp' | 'result'

export interface SinglePayoutFormData {
  beneficiaryId: number | null
  amount: string
  paymentMode: 'IMPS' | 'NEFT' | 'RTGS' | ''
  remarks: string
}

export interface SinglePayoutRequest {
  beneficiaryId: number
  amount: number
  paymentMode: string
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
  selectedBeneficiary: BeneficiaryResponse | null
  formData: SinglePayoutFormData
  otp: string
  isLoading: boolean
  result: SinglePayoutResult | null
  remainingSeconds: number
}

export interface SinglePayoutSendOtpRequest {
  beneficiaryId: number
  amount: number
  paymentMode: string
  remarks: string
  email: string
}

export interface SinglePayoutSendOtpResponse {
  success: boolean
  message: string
  data: {
    otpSent: boolean
    remainingSeconds: number
  }
}

export interface ProcessSinglePayoutResponse {
  id: number
  message: string
  status: string
  transactionId: string
  utrNumber: string
}