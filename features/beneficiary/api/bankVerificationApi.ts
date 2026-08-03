import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/endpoints'

import {
    VerifyBankRequest,
    VerifyBankApiResponse,
} from '../types/bankVerification.types'

export const bankVerificationApi = {
    verifyBank: async (
        payload: VerifyBankRequest
    ): Promise<VerifyBankApiResponse> => {
        const response = await apiClient.post<VerifyBankApiResponse>(
            API_ENDPOINTS.BANK_VERIFICATION.VERIFY_BANK,
            payload
        )

        return response.data
    },
}