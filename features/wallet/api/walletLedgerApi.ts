import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/endpoints'

import {
  WalletLedgerDetailsResponse,
  WalletLedgerListResponse,
} from '../types/walletLedger.types'

export const walletLedgerApi = {
  getLedger: async (
    page = 0,
    size = 10,
    transactionType?: 'CREDIT' | 'DEBIT',
    search?: string
  ): Promise<WalletLedgerListResponse> => {
    const response = await apiClient.get<WalletLedgerListResponse>(
      API_ENDPOINTS.WALLET_LEDGER.GET_LEDGER,
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

  getLedgerDetails: async (
    ledgerId: number
  ): Promise<WalletLedgerDetailsResponse> => {
    const response =
      await apiClient.get<WalletLedgerDetailsResponse>(
        API_ENDPOINTS.WALLET_LEDGER.GET_LEDGER_DETAILS(ledgerId)
      )

    return response.data
  },
}