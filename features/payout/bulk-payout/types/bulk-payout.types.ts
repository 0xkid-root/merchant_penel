import { CheckCircle2, Clock3, XCircle } from 'lucide-react'

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
