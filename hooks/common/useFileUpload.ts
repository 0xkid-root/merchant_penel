import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { fileUploadApi } from '../../lib/api/fileUploadApi'
import { FileUploadResponse, FileUploadRequest } from '../../lib/types/file-upload.types'

export const useFileUpload = () => {
    return useMutation<FileUploadResponse, Error, FileUploadRequest>({
        mutationFn: fileUploadApi.uploadFile,
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
