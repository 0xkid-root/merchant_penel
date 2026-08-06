import { apiClient } from './client'
import { FileUploadResponse, FileUploadRequest } from '../types/file-upload.types'

export const fileUploadApi = {
    /**
     * ============================================
     * Generic Document Upload
     * ============================================
     */
    uploadFile: async ({ file, folder }: FileUploadRequest): Promise<FileUploadResponse> => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', folder)

        const response = await apiClient.post<FileUploadResponse>(
            '/api/file/upload', 
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
