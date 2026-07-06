
export type BulkPayoutStatus =
  | 'PROCESSING'
  | 'COMPLETED'
  | 'PARTIALLY_FAILED'
  | 'FAILED'

export interface BulkPayoutBatch {
  id: string
  fileName: string
  totalRecords: number
  totalAmount: number
  successCount: number
  failedCount: number
  pendingCount: number
  status: BulkPayoutStatus
  createdAt: string
}


export type BulkPayoutValidationStatus = 'valid' | 'invalid'


export interface BulkPayoutValidationRecord {
  id: string
  beneficiaryName: string
  accountNumber: string
  ifscCode: string
  amount: number
  remarks?: string
  status: BulkPayoutValidationStatus
  errorMessage?: string
}