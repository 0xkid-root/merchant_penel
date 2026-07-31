import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/endpoints'

import {
    WalletTransactionListResponse,
    WalletTransactionDetailsResponse,
    WalletStatementResponse,
} from '../types/walletTransactions.types'

export const walletTransactionsApi = {
    getTransactions: async (
        page = 0,
        size = 10,
        transactionType?: 'CREDIT' | 'DEBIT',
        search?: string
    ): Promise<WalletTransactionListResponse> => {
        const response =
            await apiClient.get<WalletTransactionListResponse>(
                API_ENDPOINTS.WALLET_TRANSACTIONS.GET_TRANSACTIONS,
                {
                    params: {
                        page,
                        size,
                        transactionType,
                        search,
                    },
                }
            )

        return response.data
    },

    getTransactionDetails: async (
        ledgerId: number
    ): Promise<WalletTransactionDetailsResponse> => {
        const response =
            await apiClient.get<WalletTransactionDetailsResponse>(
                API_ENDPOINTS.WALLET_TRANSACTIONS.GET_TRANSACTION_DETAILS(ledgerId)
            )

        return response.data
    },

    getStatement: async (): Promise<WalletStatementResponse> => {
        const response =
            await apiClient.get<WalletStatementResponse>(
                API_ENDPOINTS.WALLET_TRANSACTIONS.GET_STATEMENT
            )

        return response.data
    },

    exportTransactions: async (params: {
        transactionType?: string
        referenceType?: string
        referenceId?: string
        fromDate?: string
        toDate?: string
        search?: string
        exportFormat?: string
    }): Promise<Blob> => {
        const response = await apiClient.get<Blob>(
            API_ENDPOINTS.WALLET_TRANSACTIONS.EXPORT,
            {
                params: {
                    ...params,
                    exportFormat: params.exportFormat || 'CSV',
                },
                responseType: 'blob',
            }
        )
        return response.data
    },
}