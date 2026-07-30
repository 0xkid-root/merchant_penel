import { useQuery } from '@tanstack/react-query'

import { walletTransactionsApi } from '../api/walletTransactionsApi'

export const useWalletTransactionDetails = (
    ledgerId: number
) => {
    return useQuery({
        queryKey: ['wallet-transaction-details', ledgerId],

        queryFn: () =>
            walletTransactionsApi.getTransactionDetails(ledgerId),

        enabled: !!ledgerId,

        staleTime: 1000 * 60 * 5,

        retry: 1,

        refetchOnWindowFocus: false,
    })
}