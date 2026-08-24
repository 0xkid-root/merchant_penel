export interface PayoutHistoryTransaction {
  id: number
  transactionId: string
  utrNumber: string
  beneficiaryName: string
  accountNumber: string
  ifscCode: string
  bankName?: string
  merchantName?: string
  amount: number
  paymentMode: string | null
  payoutType: string
  payoutStatus: string
  createdAt: string
}

export interface PayoutHistoryListResponse {
  content: PayoutHistoryTransaction[]
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