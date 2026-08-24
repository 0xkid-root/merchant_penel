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
  id: number
  transactionId: string
  utrNumber: string
  merchantName?: string
  beneficiaryName: string
  accountNumber: string
  ifscCode: string
  amount: number
  paymentMode: string
  payoutType: string
  payoutStatus: string
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
  accountNumber: string
  ifscCode: string
  bankName: string
  mobile: string
  email: string
  amount: number
  paymentMode: string
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
  email: string
  mobile: string
  accountNumber: string
  confirmAccountNumber: string
  bankName: string
  ifscCode: string
  amount: number
  paymentMode: string
  remarks?: string
}

export interface ProcessDirectPayoutResponse {
  id: number
  transactionId: string
  utrNumber: string
  status: string
  message: string
}
