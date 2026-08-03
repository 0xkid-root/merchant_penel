import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { beneficiaryApi } from '../api/beneficiaryApi'

export const useCreateBeneficiary = () => {
    return useMutation({
        mutationFn:
            beneficiaryApi.createBeneficiary,

        onSuccess: () => {
            toast.success(
                'Beneficiary created successfully'
            )
        },

        onError: () => {
            toast.error(
                'Failed to create beneficiary'
            )
        },
    })
}