import type { DirectPayoutFormData } from '../schema/direct-payout.schema'

export type { DirectPayoutFormData }

export type DirectPayoutStep = 'form' | 'review' | 'otp' | 'result'

export type DirectPayoutStatus = 'SUCCESS' | 'PENDING' | 'FAILED'

export type DirectPayoutPaymentMode = 'IMPS' | 'NEFT' | 'RTGS'

export interface DirectPayoutTransaction {
  id: number
  transactionId: string
  utrNumber?: string | null
  merchantName?: string | null
  beneficiaryName: string
  accountNumber: string
  ifscCode: string
  amount: number
  paymentMode: DirectPayoutPaymentMode
  payoutType: string
  payoutStatus: DirectPayoutStatus
  createdAt: string
}

export interface DirectPayoutListResponse {
  content: DirectPayoutTransaction[]
  pageable: {
    pageNumber: number
    pageSize: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    offset: number
    paged: boolean
    unpaged: boolean
  }
  last: boolean
  totalElements: number
  totalPages: number
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  first: boolean
  numberOfElements: number
  empty: boolean
}

export interface DirectPayoutSendOtpRequest {
  beneficiaryName: string
  mobile: string
  accountNumber: string
  ifscCode: string
  bankName: string
  email: string
  amount: number
  paymentMode: DirectPayoutPaymentMode
  remarks?: string
}

export interface DirectPayoutSendOtpResponse {
  success: boolean
  message: string
  data: {
    otpSent: boolean
    remainingSeconds: number
  }
}

export interface DirectPayoutRequest {
  beneficiaryName: string
  mobile: string
  email: string
  accountNumber: string
  confirmAccountNumber: string
  bankName: string
  ifscCode: string
  amount: number
  paymentMode: DirectPayoutPaymentMode
  remarks?: string
}

export interface ProcessDirectPayoutResponse {
  id: number
  transactionId: string
  utrNumber: string | null
  status: DirectPayoutStatus
  message: string
}

export interface DirectPayoutResultData {
  status: DirectPayoutStatus
  payoutId: string
  message: string
  failureReason?: string
}

export interface DirectPayoutState {
  currentStep: DirectPayoutStep
  formData: DirectPayoutFormData
  otp: string
  isLoading: boolean
  result: DirectPayoutResultData | null
  remainingSeconds: number
  otpExpiryTime: number | null
}

export const INITIAL_FORM_DATA: DirectPayoutFormData = {
  mobile: '',
  accountHolderName: '',
  accountNumber: '',
  confirmAccountNumber: '',
  ifscCode: '',
  bankName: '',
  amount: '',
  paymentMode: 'IMPS',
  remarks: '',
}

export const INITIAL_STATE: DirectPayoutState = {
  currentStep: 'form',
  formData: INITIAL_FORM_DATA,
  otp: '',
  isLoading: false,
  result: null,
  remainingSeconds: 0,
  otpExpiryTime: null,
}
