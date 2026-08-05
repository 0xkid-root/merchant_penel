import { useQuery } from '@tanstack/react-query'

import { walletWhitelistApi } from '../api/walletWhitelistApi'

interface UseWalletWhitelistListParams {
    page?: number
    size?: number
}

export const useWalletWhitelistList = ({
    page = 0,
    size = 10,
}: UseWalletWhitelistListParams = {}) => {

    return useQuery({
        queryKey: [
            'wallet-whitelists',
            page,
            size,
        ],

        queryFn: () =>
            walletWhitelistApi.getWalletWhitelists(
                page,
                size
            ),
    })
}