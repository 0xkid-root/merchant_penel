import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { beneficiaryApi } from '../api/beneficiaryApi'

export const useUpdateBeneficiaryStatus =
    () => {
        return useMutation({
            mutationFn: ({
                id,
                payload,
            }: {
                id: number
                payload: any
            }) =>
                beneficiaryApi.updateBeneficiaryStatus(
                    id,
                    payload
                ),

            onSuccess: () => {
                toast.success(
                    'Status updated successfully'
                )
            },

            onError: () => {
                toast.error(
                    'Failed to update status'
                )
            },
        })
    }