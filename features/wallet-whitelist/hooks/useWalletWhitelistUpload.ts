import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { walletWhitelistUploadApi } from '../api/walletWhitelistUploadApi'
import { FileUploadResponse } from '../types/wallet-whitelist.types'

export const useWalletWhitelistUpload = () => {
    return useMutation<FileUploadResponse, Error, File>({
        mutationFn: walletWhitelistUploadApi.uploadDocument,
        onSuccess: (response) => {
            if (response.success) {
                toast.success(response.message || 'File uploaded successfully')
            } else {
                toast.error(response.message || 'File upload failed')
            }
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ||
                error.message ||
                'Failed to upload document'
            )
        },
    })
}
