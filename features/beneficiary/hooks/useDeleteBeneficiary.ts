import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { beneficiaryApi } from '../api/beneficiaryApi'

export const useDeleteBeneficiary = () => {
    return useMutation({
        mutationFn: (id: number) =>
            beneficiaryApi.deleteBeneficiary(id),

        onSuccess: () => {
            toast.success(
                'Beneficiary deleted successfully'
            )
        },

        onError: () => {
            toast.error(
                'Failed to delete beneficiary'
            )
        },
    })
}