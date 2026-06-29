export interface PayoutData {
  id: string
  beneficiaryId: string
  beneficiaryName: string
  accountNumber: string
  bankName: string
  ifscCode: string
  amount: number
  status: 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'REVERSED'
  referenceId: string
  description?: string
  failureReason?: string
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
}

export interface CreatePayoutRequest {
  beneficiaryId: string
  amount: number
  description?: string
}

export interface PayoutListResponse {
  payouts: PayoutData[]
  total: number
  page: number
  limit: number
}

export interface PayoutFilters {
  status?: string
  startDate?: Date
  endDate?: Date
  page?: number
  limit?: number
}
