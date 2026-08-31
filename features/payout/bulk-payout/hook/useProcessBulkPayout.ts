import { useMutation } from '@tanstack/react-query'

import { bulkPayoutApi } from '../api/bulkPayoutApi'

import { ProcessBulkPayoutResponse } from '../types/bulk-payout.types'

interface ProcessBulkPayoutVariables {
    file: File
    makerRemark?: string
}

export const useProcessBulkPayout = () => {
    return useMutation<
        ProcessBulkPayoutResponse,
        Error,
        ProcessBulkPayoutVariables
    >({
        mutationFn: ({ file, makerRemark }) =>
            bulkPayoutApi.processBulkPayout(file, makerRemark),
    })
}