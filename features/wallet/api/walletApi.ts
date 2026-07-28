import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import {
    WalletResponse,
    WalletSummaryResponse,
} from '../types/wallet.types';

export const walletApi = {
    getWallet: async (): Promise<WalletResponse> => {
        const response = await apiClient.get<WalletResponse>(
            API_ENDPOINTS.WALLET.GET_WALLET
        );

        return response.data;
    },

    getWalletSummary: async (): Promise<WalletSummaryResponse> => {
        const response = await apiClient.get<WalletSummaryResponse>(
            API_ENDPOINTS.WALLET.GET_WALLET_SUMMARY
        );

        return response.data;
    },
};