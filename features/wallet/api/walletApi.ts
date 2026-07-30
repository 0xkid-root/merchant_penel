import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import {
    WalletResponse,
    WalletSummaryResponse,
    WalletDashboardResponse,
} from '../types/wallet.types';

export const walletApi = {
    getWallet: async (): Promise<WalletResponse> => {
        const response = await apiClient.get<{ data: WalletResponse }>(
            API_ENDPOINTS.WALLET.GET_WALLET
        );

        return response.data.data;
    },

    getWalletSummary: async (): Promise<WalletSummaryResponse> => {
        const response = await apiClient.get<{ data: WalletSummaryResponse }>(
            API_ENDPOINTS.WALLET.GET_WALLET_SUMMARY
        );

        return response.data.data;
    },

    getWalletDashboard: async (): Promise<WalletDashboardResponse> => {
        const response = await apiClient.get<{ data: WalletDashboardResponse }>(
            API_ENDPOINTS.WALLET.GET_DASHBOARD
        );

        return response.data.data;
    },
};