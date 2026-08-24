import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/endpoints'

import {
  DirectPayoutListResponse,
  DirectPayoutTransaction,
  DirectPayoutSendOtpRequest,
  DirectPayoutSendOtpResponse,
  DirectPayoutRequest,
  ProcessDirectPayoutResponse
} from '../types/direct-payout.types'

export const directPayoutApi = {
  /**
   * Get Direct Payout List
   */
  getDirectPayouts: async (
    page = 0,
    size = 10,
    search?: string,
    status?: string
  ): Promise<DirectPayoutListResponse> => {
    const response = await apiClient.get<DirectPayoutListResponse>(
      API_ENDPOINTS.PAYOUTS.DIRECT.LIST,
      {
        params: {
          page,
          size,
          ...(search?.trim() && { search: search.trim() }),
          ...(status && { status }),
        },
      }
    )
    return response.data
  },

  /**
   * Get Direct Payout Details By ID
   */
  getDirectPayoutById: async (id: number): Promise<DirectPayoutTransaction> => {
    const response = await apiClient.get<DirectPayoutTransaction>(
      API_ENDPOINTS.PAYOUTS.DIRECT.GET_BY_ID(id)
    )
    return response.data
  },

  /**
   * Send OTP for Direct Payout
   */
  sendOtp: async (
    data: DirectPayoutSendOtpRequest
  ): Promise<DirectPayoutSendOtpResponse> => {
    const response = await apiClient.post<DirectPayoutSendOtpResponse>(
      API_ENDPOINTS.PAYOUTS.DIRECT.SEND_OTP,
      data
    )
    return response.data
  },

  /**
   * Process Direct Payout
   */
  processDirectPayout: async (
    data: DirectPayoutRequest
  ): Promise<ProcessDirectPayoutResponse> => {
    const response = await apiClient.post<ProcessDirectPayoutResponse>(
      API_ENDPOINTS.PAYOUTS.DIRECT.CREATE,
      data
    )
    return response.data
  },
}
