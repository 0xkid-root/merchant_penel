import { useQuery } from '@tanstack/react-query'

import { walletLedgerApi } from '../api/walletLedgerApi'


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