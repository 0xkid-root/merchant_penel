import { PaginationResponse } from '../../../lib/types/pagination'

export type WalletTransactionType =
    | 'CREDIT'
    | 'DEBIT'
    | 'HOLD'
    | 'RELEASE'
    | 'REFUND'
    | 'ADJUSTMENT'

export type TransactionStatus =
    | 'SUCCESS'
    | 'FAILED'
    | 'PENDING'
    | 'PROCESSING'
    | 'UNKNOWN'

export type ReferenceType =
    | 'ADMIN_TOPUP'
    | 'DIRECT_PAYOUT'
    | 'SINGLE_PAYOUT'
    | 'BULK_PAYOUT'

export interface WalletLedger {
    id: number
    ledgerCode: string
    walletCode: string

    merchantId: number
    merchantName: string

    transactionType: WalletTransactionType
    referenceType: ReferenceType
    referenceId: string
    status: TransactionStatus

    amount: number

    openingBalance: number
    closingBalance: number

    remarks: string

    createdBy: string

    createdAt: string
}

export interface WalletLedgerListResponse {
    success: boolean
    message: string
    data: PaginationResponse<WalletLedger>
}

export interface WalletLedgerDetailsResponse {
    success: boolean
    message: string
    data: WalletLedger
}