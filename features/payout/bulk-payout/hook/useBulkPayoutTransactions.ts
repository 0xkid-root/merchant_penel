import { useQuery } from '@tanstack/react-query'

import { bulkPayoutApi } from '../api/bulkPayoutApi'

import {
    BulkPayoutTransactionListResponse,
} from '../types/bulk-payout.types'

interface UseBulkPayoutTransactionsParams {
    page?: number
    size?: number
}

export const useBulkPayoutTransactions = ({
    page = 0,
    size = 10,
}: UseBulkPayoutTransactionsParams = {}) => {
    return useQuery<BulkPayoutTransactionListResponse, Error>({
        queryKey: ['bulk-payout-transactions', page, size],
        queryFn: () =>
            bulkPayoutApi.getBulkPayoutTransactions(page, size),
    })
}