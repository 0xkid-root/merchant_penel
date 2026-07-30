import { useQuery } from '@tanstack/react-query'

import { walletTransactionsApi } from '../api/walletTransactionsApi'

export const useWalletStatement = () => {
    return useQuery({
        queryKey: ['wallet-statement'],

        queryFn: () =>
            walletTransactionsApi.getStatement(),

        staleTime: 1000 * 60 * 5,

        retry: 1,

        refetchOnWindowFocus: false,
    })
}