import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/endpoints'

import {
  WalletLedgerDetailsResponse,
} from '../types/walletLedger.types'

export const walletLedgerApi = {
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