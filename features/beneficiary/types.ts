export interface BeneficiaryData {
  id: string
  name: string
  accountNumber: string
  ifscCode: string
  bankName: string
  accountType: 'SAVINGS' | 'CURRENT'
  isVerified: boolean
  verificationMode: 'PENNY_DROP' | 'MANUAL'
  upiId?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateBeneficiaryRequest {
  name: string
  accountNumber: string
  ifscCode: string
  accountType: 'SAVINGS' | 'CURRENT'
  upiId?: string
}

export interface UpdateBeneficiaryRequest {
  name?: string
  accountNumber?: string
  ifscCode?: string
  accountType?: 'SAVINGS' | 'CURRENT'
}

export interface BeneficiaryListResponse {
  beneficiaries: BeneficiaryData[]
  total: number
  page: number
  limit: number
}
