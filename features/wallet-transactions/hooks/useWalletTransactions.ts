import { useQuery } from '@tanstack/react-query'

import { walletTransactionsApi } from '../api/walletTransactionsApi'

export const useWalletTransactions = (
    page = 0,
    size = 10,
    transactionType?: 'CREDIT' | 'DEBIT',
    search?: string
) => {
    return useQuery({
        queryKey: [
            'wallet-transactions',
            page,
            size,
            transactionType,
            search,
        ],

        queryFn: () =>
            walletTransactionsApi.getTransactions(
                page,
                size,
                transactionType,
                search
            ),

        staleTime: 1000 * 60 * 5,

        retry: 1,

        refetchOnWindowFocus: false,
    })
}