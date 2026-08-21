import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/endpoints'

export interface VerifyOtpRequest {
  email: string
  otp: string
  moduleName: string
}

export interface VerifyOtpResponse {
  success: boolean
  message: string
  data: boolean
}

export const otpApi = {
  /**
   * Verify OTP for various modules (e.g., PAYOUT)
   */
  verifyOtp: async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
    const response = await apiClient.post<VerifyOtpResponse>(
      API_ENDPOINTS.OTP.VERIFY,
      data
    )
    return response.data
  },
}
