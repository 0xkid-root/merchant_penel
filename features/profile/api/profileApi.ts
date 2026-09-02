import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

import {
    MerchantProfileResponse,
} from '../types/profile.types';

export const profileApi = {
    /**
     * Get Logged In Merchant Profile
     */
    getProfile: async (): Promise<MerchantProfileResponse> => {
        const response = await apiClient.get<MerchantProfileResponse>(
            API_ENDPOINTS.PROFILE.GET_PROFILE
        );
        console.log("resposne is here:", response);

        return response.data;
    },
};