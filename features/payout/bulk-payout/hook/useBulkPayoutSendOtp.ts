import { useMutation } from '@tanstack/react-query'

import { bulkPayoutApi } from '../api/bulkPayoutApi'

import {
    BulkPayoutSendOtpRequest,
    BulkPayoutSendOtpResponse,
} from '../types/bulk-payout.types'

export const useBulkPayoutSendOtp = () => {
    return useMutation<
        BulkPayoutSendOtpResponse,
        Error,
        BulkPayoutSendOtpRequest
    >({
        mutationFn: (data: BulkPayoutSendOtpRequest) =>
            bulkPayoutApi.sendOtp(data),
    })
}