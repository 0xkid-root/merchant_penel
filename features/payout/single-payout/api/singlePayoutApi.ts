import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/endpoints'

import {
    SinglePayoutListResponse,
} from '../types/single-payout.types'

export const singlePayoutApi = {

    /**
     * Get Single Payout List
     */
    getSinglePayouts: async (
        page = 0,
        size = 10,
        search?: string,
        status?: string
    ): Promise<SinglePayoutListResponse> => {

        const response =
            await apiClient.get<SinglePayoutListResponse>(
                API_ENDPOINTS.PAYOUTS.SINGLE.LIST,
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
}