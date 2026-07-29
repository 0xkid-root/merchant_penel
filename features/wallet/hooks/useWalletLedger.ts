import { useQuery } from '@tanstack/react-query'

import { walletLedgerApi } from '../api/walletLedgerApi'

export const useWalletLedger = (
    page = 0,
    size = 10,
    transactionType?: 'CREDIT' | 'DEBIT'
) =>
    useQuery({
        queryKey: ['wallet-ledger', page, size, transactionType],

        queryFn: () =>
            walletLedgerApi.getLedger(page, size, transactionType),

        staleTime: 1000 * 60 * 5,

        retry: 1,

        refetchOnWindowFocus: false,
    })

export const useWalletLedgerDetails = (
    ledgerId: number
) =>
    useQuery({
        queryKey: ['wallet-ledger-details', ledgerId],

        queryFn: () =>
            walletLedgerApi.getLedgerDetails(ledgerId),

        enabled: !!ledgerId,

        staleTime: 1000 * 60 * 5,

        retry: 1,

        refetchOnWindowFocus: false,
    })