import { useQuery } from '@tanstack/react-query'

import { walletWhitelistApi } from '../api/walletWhitelistApi'

export const useWalletWhitelistDetails = (
    id: number
) => {
    return useQuery({
        queryKey: ['wallet-whitelist', id],

        queryFn: () =>
            walletWhitelistApi.getWalletWhitelistById(id),

        enabled: !!id,
    })
}