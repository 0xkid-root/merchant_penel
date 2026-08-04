import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { beneficiaryApi } from '../api/beneficiaryApi'
import { UpdateBeneficiaryRequest } from '../types/beneficiary.types'

export const useUpdateBeneficiary = () => {
    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: number
            payload: UpdateBeneficiaryRequest
        }) =>
            beneficiaryApi.updateBeneficiary(
                id,
                payload
            ),

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