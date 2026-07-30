import { PaginationResponse } from '@/lib/types/pagination'

export type WalletTransactionType =
    | 'CREDIT'
    | 'DEBIT'
    | 'HOLD'
    | 'RELEASE'
    | 'REFUND'
    | 'ADJUSTMENT'

export type WalletReferenceType =
    | 'ADMIN_TOPUP'
    | 'DIRECT_PAYOUT'
    | 'SINGLE_PAYOUT'
    | 'BULK_PAYOUT'

export interface WalletTransaction {
    id: number

    ledgerCode: string
    walletCode: string

    merchantId: number
    merchantName: string

    transactionType: WalletTransactionType

    referenceType: WalletReferenceType
    referenceId: string

    amount: number

    openingBalance: number
    closingBalance: number

    remarks: string

    createdBy: string
    createdAt: string
}

export interface WalletTransactionListResponse {
    success: boolean
    message: string
    data: PaginationResponse<WalletTransaction>
}

export interface WalletTransactionDetailsResponse {
    success: boolean
    message: string
    data: WalletTransaction
}

export interface WalletStatementResponse {
    success: boolean
    message: string
    data: {
        openingBalance: number
        closingBalance: number
        currentBalance: number

        totalCredit: number
        totalDebit: number

        ledgerList: WalletTransaction[]
    }
}