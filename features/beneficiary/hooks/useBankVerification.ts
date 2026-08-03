import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { bankVerificationApi } from '../api/bankVerificationApi'

export const useBankVerification = () => {
    return useMutation({
        mutationFn: bankVerificationApi.verifyBank,

        onSuccess: (response) => {
            if (response.data.bankTxnStatus) {
                toast.success('Bank verified successfully')
            } else {
                toast.error(
                    response.data.bankResponse ||
                    'Bank verification failed'
                )
            }
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ||
                'Bank verification failed'
            )
        },
    })
}