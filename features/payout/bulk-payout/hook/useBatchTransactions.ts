import { useQuery } from '@tanstack/react-query'
import { bulkPayoutApi } from '../api/bulkPayoutApi'
import { BulkPayoutTransactionListResponse } from '../types/bulk-payout.types'

interface UseBatchTransactionsParams {
    bulkPayoutId: number
    page?: number
    size?: number
}

export const useBatchTransactions = ({
    bulkPayoutId,
    page = 0,
    size = 10,
}: UseBatchTransactionsParams) => {
    return useQuery<BulkPayoutTransactionListResponse, Error>({
        queryKey: ['batch-transactions', bulkPayoutId, page, size],
        queryFn: () => bulkPayoutApi.getBatchTransactions(bulkPayoutId, page, size),
        enabled: !!bulkPayoutId,
    })
}
