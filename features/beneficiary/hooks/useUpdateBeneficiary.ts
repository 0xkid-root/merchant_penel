import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { beneficiaryApi } from '../api/beneficiaryApi'

export const useUpdateBeneficiary = () => {
    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: number
            payload: any
        }) =>
            beneficiaryApi.updateBeneficiary(
                id,
                payload
            ),

        onSuccess: () => {
            toast.success(
                'Beneficiary updated successfully'
            )
        },

        onError: () => {
            toast.error(
                'Failed to update beneficiary'
            )
        },
    })
}