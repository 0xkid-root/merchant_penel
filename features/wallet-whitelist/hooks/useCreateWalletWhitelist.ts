import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { walletWhitelistApi } from '../api/walletWhitelistApi'

export const useCreateWalletWhitelist = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: walletWhitelistApi.createWalletWhitelist,

        onSuccess: (response) => {
            toast.success(response.message)

            queryClient.invalidateQueries({
                queryKey: ['wallet-whitelists']
            })
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ??
                'Something went wrong'
            )
        },
    })
}