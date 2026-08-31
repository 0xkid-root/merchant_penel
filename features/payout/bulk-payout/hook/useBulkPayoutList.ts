import { useQuery } from '@tanstack/react-query'

import { bulkPayoutApi } from '../api/bulkPayoutApi'
import { BulkPayoutListResponse } from '../types/bulk-payout.types'

interface UseBulkPayoutListParams {
    page?: number
    size?: number
}

export const useBulkPayoutList = ({
    page = 0,
    size = 10,
}: UseBulkPayoutListParams = {}) => {
    return useQuery<BulkPayoutListResponse, Error>({
        queryKey: ['bulk-payouts', page, size],
        queryFn: () => bulkPayoutApi.getBulkPayouts(page, size),
    })
}