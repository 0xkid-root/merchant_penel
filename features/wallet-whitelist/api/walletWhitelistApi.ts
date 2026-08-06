import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/endpoints'

import {
    WalletWhitelistListResponse,
    WalletWhitelistDetailsResponse,
    CreateWalletWhitelistRequest,
    CreateWalletWhitelistResponse,
    DeleteWalletWhitelistResponse,
} from '../types/wallet-whitelist.types'

export const walletWhitelistApi = {
    /**
     * ============================================
     * Create Wallet Whitelist
     * ============================================
     */
    createWalletWhitelist: async (
        payload: CreateWalletWhitelistRequest
    ): Promise<CreateWalletWhitelistResponse> => {
        const response =
            await apiClient.post<CreateWalletWhitelistResponse>(
                API_ENDPOINTS.WALLET_WHITELIST.CREATE,
                payload
            )

        return response.data
    },

    /**
     * ============================================
     * Get Wallet Whitelist List
     * ============================================
     */
    getWalletWhitelists: async (
        page = 0,
        size = 10
    ): Promise<WalletWhitelistListResponse> => {
        const response =
            await apiClient.get<WalletWhitelistListResponse>(
                API_ENDPOINTS.WALLET_WHITELIST.GET_ALL,
                {
                    params: {
                        page,
                        size,
                    },
                }
            )

        return response.data
    },

    /**
     * ============================================
     * Get Wallet Whitelist Details
     * ============================================
     */
    getWalletWhitelistById: async (
        id: number
    ): Promise<WalletWhitelistDetailsResponse> => {
        const response =
            await apiClient.get<WalletWhitelistDetailsResponse>(
                API_ENDPOINTS.WALLET_WHITELIST.GET_BY_ID(id)
            )

        return response.data
    },


    /**
     * ============================================
     * Delete Wallet Whitelist
     * ============================================
     */
    deleteWalletWhitelist: async (
        id: number
    ): Promise<DeleteWalletWhitelistResponse> => {
        const response =
            await apiClient.delete<DeleteWalletWhitelistResponse>(
                API_ENDPOINTS.WALLET_WHITELIST.DELETE(id)
            )

        return response.data
    },
}