import { useQuery } from '@tanstack/react-query'

import { bulkPayoutApi } from '../api/bulkPayoutApi'

import { BulkPayoutTransaction } from '../types/bulk-payout.types'

export const useBulkPayoutTransactionDetails = (
    id: number | undefined,
) => {
    return useQuery<BulkPayoutTransaction, Error>({
        queryKey: ['bulkPayoutTransactionDetails', id],
        queryFn: () => bulkPayoutApi.getBulkPayoutTransactionById(id!),
        enabled: id !== undefined,
    })
}