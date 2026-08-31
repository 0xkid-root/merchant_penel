import { useMutation } from '@tanstack/react-query'

import { bulkPayoutApi } from '../api/bulkPayoutApi'
import { BulkPayoutPreviewResponse } from '../types/bulk-payout.types'

export const useBulkPayoutPreview = () => {
    return useMutation<BulkPayoutPreviewResponse, Error, File>({
        mutationFn: (file: File) => bulkPayoutApi.previewBulkPayout(file),
    })
}