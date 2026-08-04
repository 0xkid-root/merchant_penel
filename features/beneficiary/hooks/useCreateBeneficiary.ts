import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { beneficiaryApi } from '../api/beneficiaryApi'

export const useCreateBeneficiary = () => {
    return useMutation({
        mutationFn: beneficiaryApi.createBeneficiary,

        onSuccess: (response) => {
            toast.success(response.message)
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ??
                'Something went wrong'
            )
        },
    })
}