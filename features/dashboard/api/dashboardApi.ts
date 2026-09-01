import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/endpoints'

import type {
    ApiResponse,
    DashboardPaymentMode,
    DashboardRecentTransaction,
    DashboardSummary,
    DashboardTrend,
} from '../types'

export const dashboardApi = {
    getSummary: async (): Promise<ApiResponse<DashboardSummary>> => {
        const response = await apiClient.get<ApiResponse<DashboardSummary>>(
            API_ENDPOINTS.DASHBOARD.SUMMARY,
        )

        return response.data
    },

    getRecentTransactions: async (): Promise<
        ApiResponse<DashboardRecentTransaction[]>
    > => {
        const response = await apiClient.get<
            ApiResponse<DashboardRecentTransaction[]>
        >(API_ENDPOINTS.DASHBOARD.RECENT_TRANSACTIONS)

        return response.data
    },

    getTrend: async (): Promise<ApiResponse<DashboardTrend[]>> => {
        const response = await apiClient.get<ApiResponse<DashboardTrend[]>>(
            API_ENDPOINTS.DASHBOARD.TREND,
        )

        return response.data
    },

    getPaymentMode: async (): Promise<ApiResponse<DashboardPaymentMode>> => {
        const response = await apiClient.get<ApiResponse<DashboardPaymentMode>>(
            API_ENDPOINTS.DASHBOARD.PAYMENT_MODE,
        )

        return response.data
    },
}