import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/endpoints'

import {
    BulkPayoutListResponse,
    BulkPayoutPreviewResponse,
    BulkPayoutSendOtpRequest,
    BulkPayoutSendOtpResponse,
    ProcessBulkPayoutResponse,
    BulkPayoutTransaction,
    BulkPayoutTransactionListResponse,
} from '../types/bulk-payout.types'

export const bulkPayoutApi = {
    /**
     * Get Bulk Payout Summary List
     *
     * GET /api/v1/payouts/bulk/list
     */
    getBulkPayouts: async (
        page = 0,
        size = 10,
    ): Promise<BulkPayoutListResponse> => {
        const response = await apiClient.get<BulkPayoutListResponse>(
            API_ENDPOINTS.PAYOUTS.BULK.LIST,
            {
                params: {
                    page,
                    size,
                },
            },
        )

        return response.data
    },

    /**
     * Preview Bulk Payout File
     *
     * POST /api/v1/payouts/bulk/preview
     *
     * multipart/form-data
     */
    previewBulkPayout: async (
        file: File,
    ): Promise<BulkPayoutPreviewResponse> => {
        const formData = new FormData()

        formData.append('file', file)

        const response = await apiClient.post<BulkPayoutPreviewResponse>(
            API_ENDPOINTS.PAYOUTS.BULK.PREVIEW,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )

        return response.data
    },

    /**
     * Send OTP for Bulk Payout
     *
     * POST /api/v1/payouts/bulk/send-otp
     */
    sendOtp: async (
        data: BulkPayoutSendOtpRequest,
    ): Promise<BulkPayoutSendOtpResponse> => {
        const response = await apiClient.post<BulkPayoutSendOtpResponse>(
            API_ENDPOINTS.PAYOUTS.BULK.SEND_OTP,
            data,
        )

        return response.data
    },

    /**
     * Process / Create Bulk Payout
     *
     * POST /api/v1/payouts/bulk/create
     *
     * multipart/form-data
     */
    processBulkPayout: async (
        file: File,
        makerRemark?: string,
    ): Promise<ProcessBulkPayoutResponse> => {
        const formData = new FormData()

        formData.append('file', file)

        if (makerRemark?.trim()) {
            formData.append('makerRemark', makerRemark.trim())
        }

        const response = await apiClient.post<ProcessBulkPayoutResponse>(
            API_ENDPOINTS.PAYOUTS.BULK.CREATE,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )

        return response.data
    },

    /**
     * Get Individual Bulk Payout Transactions
     *
     * GET /api/v1/payouts/bulk
     */
    getBulkPayoutTransactions: async (
        page = 0,
        size = 10,
    ): Promise<BulkPayoutTransactionListResponse> => {
        const response = await apiClient.get<BulkPayoutTransactionListResponse>(
            API_ENDPOINTS.PAYOUTS.BULK.TRANSACTIONS as string,
            {
                params: {
                    page,
                    size,
                },
            },
        )

        return response.data
    },

    /**
     * Get Individual Bulk Payout Transactions for a specific Batch
     *
     * GET /api/v1/payouts/bulk/{bulkPayoutId}/transactions
     */
    getBatchTransactions: async (
        bulkPayoutId: number,
        page = 0,
        size = 10,
    ): Promise<BulkPayoutTransactionListResponse> => {
        const response = await apiClient.get<BulkPayoutTransactionListResponse>(
            API_ENDPOINTS.PAYOUTS.BULK.BATCH_TRANSACTIONS(bulkPayoutId),
            {
                params: {
                    page,
                    size,
                },
            },
        )

        return response.data
    },

    /**
     * Get Individual Bulk Payout Transaction By ID
     *
     * GET /api/v1/payouts/bulk/{id}
     */
    getBulkPayoutTransactionById: async (
        id: number,
    ): Promise<BulkPayoutTransaction> => {
        const response = await apiClient.get<BulkPayoutTransaction>(
            API_ENDPOINTS.PAYOUTS.BULK.TRANSACTION_BY_ID(id),
        )

        return response.data
    },
}