import { apiClient } from '@/lib/api/client'
import { FileUploadResponse } from '../types/wallet-whitelist.types'

export const walletWhitelistUploadApi = {
    /**
     * ============================================
     * Upload Document for Wallet Whitelist
     * ============================================
     */
    uploadDocument: async (file: File): Promise<FileUploadResponse> => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', 'wallet-whitelist')

        const response = await apiClient.post<FileUploadResponse>(
            '/api/v1/upload', 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )

        return response.data
    },
}
