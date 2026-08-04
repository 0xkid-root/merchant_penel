import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { beneficiaryApi } from '../api/beneficiaryApi'
import { UpdateBeneficiaryStatusRequest } from '../types/beneficiary.types'

export const useUpdateBeneficiaryStatus = () => {
    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: number
            payload: UpdateBeneficiaryStatusRequest
        }) =>
            beneficiaryApi.updateBeneficiaryStatus(
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