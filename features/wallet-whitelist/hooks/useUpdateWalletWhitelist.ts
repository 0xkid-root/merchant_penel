import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { walletWhitelistApi } from '../api/walletWhitelistApi'
import { UpdateWalletWhitelistRequest } from '../types/wallet-whitelist.types'

export const useUpdateWalletWhitelist = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: number
            payload: UpdateWalletWhitelistRequest
        }) =>
            walletWhitelistApi.updateWalletWhitelist(
                id,
                payload
            ),

        onSuccess: (response, variables) => {

            toast.success(response.message)

            queryClient.invalidateQueries({
                queryKey: ['wallet-whitelists']
            })

            queryClient.invalidateQueries({
                queryKey: [
                    'wallet-whitelist',
                    variables.id
                ]
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