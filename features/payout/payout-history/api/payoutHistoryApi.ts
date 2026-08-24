import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/endpoints'
import type { PayoutHistoryListResponse } from '../types/payout-history.types'

export const payoutHistoryApi = {
  getPayoutTransactions: async (params: {
    page?: number
    size?: number
    search?: string
    status?: string
    payoutType?: string
    fromDate?: string
    toDate?: string
  }): Promise<PayoutHistoryListResponse> => {
    // Clean up empty params
    const cleanParams: Record<string, any> = {
      page: params.page || 0,
      size: params.size || 10,
    }

    if (params.search?.trim()) cleanParams.search = params.search.trim()
    if (params.status && params.status !== 'ALL') cleanParams.status = params.status
    if (params.payoutType && params.payoutType !== 'ALL') cleanParams.payoutType = params.payoutType
    if (params.fromDate) cleanParams.fromDate = params.fromDate
    if (params.toDate) cleanParams.toDate = params.toDate

    const response = await apiClient.get<PayoutHistoryListResponse>(
      API_ENDPOINTS.PAYOUTS.HISTORY.LIST,
      {
        params: cleanParams,
      }
    )
    return response.data
  },
}
