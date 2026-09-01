import type { BulkPayoutStep } from '../../components/bulk-payout-stepper'

export type BulkPayoutStatus =
  | 'PROCESSING'
  | 'SUCCESS'
  | 'FAILED'
  | 'PENDING'

export type BulkPayoutPaymentMode =
  | 'IMPS'
  | 'NEFT'
  | 'RTGS'

/**
 * Bulk Payout Summary / Batch
 *
 * Used by:
 * GET /api/v1/payouts/bulk/list
 */
export interface BulkPayoutSummary {
  id?: number
  bulkPayoutId?: number
  bulkReferenceId: string
  fileName: string
  makerRemark?: string | null
  merchantName?: string | null
  totalTransactions: number
  totalBeneficiaries: number
  totalAmount: number
  status: BulkPayoutStatus
  createdAt: string
}

/**
 * Pagination Sort
 */
export interface BulkPayoutSort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

/**
 * Pagination information
 */
export interface BulkPayoutPageable {
  pageNumber: number
  pageSize: number
  sort: BulkPayoutSort
  offset: number
  paged: boolean
  unpaged: boolean
}

/**
 * Bulk Payout Summary List Response
 *
 * GET /api/v1/payouts/bulk/list
 */
export interface BulkPayoutListResponse {
  content: BulkPayoutSummary[]
  pageable: BulkPayoutPageable
  last: boolean
  totalElements: number
  totalPages: number
  size: number
  number: number
  sort: BulkPayoutSort
  first: boolean
  numberOfElements: number
  empty: boolean
}

/**
 * Preview Response
 *
 * POST /api/v1/payouts/bulk/preview
 */
export interface BulkPayoutPreviewResponse {
  fileName: string
  totalTransactions: number
  totalBeneficiaries: number
  totalAmount: number
}

/**
 * Send OTP Request
 *
 * POST /api/v1/payouts/bulk/send-otp
 */
export interface BulkPayoutSendOtpRequest {
  email: string
  totalAmount: number
  totalTransactions: number
  totalBeneficiaries: number
}

/**
 * Send OTP Response
 */
export interface BulkPayoutSendOtpResponse {
  success: boolean
  message: string
  data: {
    otpSent: boolean
    remainingSeconds: number
  }
}

/**
 * Create / Process Bulk Payout Response
 *
 * POST /api/v1/payouts/bulk/create
 */
export interface ProcessBulkPayoutResponse {
  bulkPayoutId: number
  bulkReferenceId: string
  totalTransactions: number
  status: BulkPayoutStatus
  message: string
}

/**
 * Individual Bulk Payout Transaction
 *
 * GET /api/v1/payouts/bulk
 * GET /api/v1/payouts/bulk/{id}
 */
export interface BulkPayoutTransaction {
  id: number
  bulkPayoutId: number
  bulkReferenceId: string
  transactionId: string
  utrNumber?: string | null
  merchantName?: string | null
  beneficiaryName: string
  accountNumber: string
  ifscCode: string
  amount: number
  paymentMode: BulkPayoutPaymentMode
  payoutType: string
  payoutStatus: BulkPayoutStatus
  createdAt: string
}

/**
 * Individual Transaction List Response
 *
 * GET /api/v1/payouts/bulk
 */
export interface BulkPayoutTransactionListResponse {
  content: BulkPayoutTransaction[]
  pageable: BulkPayoutPageable
  last: boolean
  totalElements: number
  totalPages: number
  size: number
  number: number
  sort: BulkPayoutSort
  first: boolean
  numberOfElements: number
  empty: boolean
}

/**
 * Result shown after create/process
 */
export interface BulkPayoutResultData {
  status: BulkPayoutStatus
  bulkPayoutId: number | null
  bulkReferenceId: string
  totalTransactions: number
  message: string
  failureReason?: string
}

/**
 * Complete Bulk Payout UI State
 */
export interface BulkPayoutState {
  currentStep: BulkPayoutStep

  file: File | null

  preview: BulkPayoutPreviewResponse | null

  makerRemark: string

  otp: string

  isLoading: boolean

  result: BulkPayoutResultData | null

  remainingSeconds: number

  otpExpiryTime: number | null
}

/**
 * Initial Bulk Payout State
 */
export const INITIAL_BULK_PAYOUT_STATE: BulkPayoutState = {
  currentStep: 'upload',

  file: null,

  preview: null,

  makerRemark: '',

  otp: '',

  isLoading: false,

  result: null,

  remainingSeconds: 0,

  otpExpiryTime: null,
}