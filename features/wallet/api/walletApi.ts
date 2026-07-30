import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import {
    WalletDashboardResponse,
} from '../types/wallet.types';

export const walletApi = {
    getWalletDashboard: async (): Promise<WalletDashboardResponse> => {
        const response = await apiClient.get<{ data: WalletDashboardResponse }>(
            API_ENDPOINTS.WALLET.GET_DASHBOARD
        );

        return response.data.data;
    },
};