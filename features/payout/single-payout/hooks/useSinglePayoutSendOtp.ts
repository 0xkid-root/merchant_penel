import { useMutation } from '@tanstack/react-query'
import { singlePayoutApi } from '../api/singlePayoutApi'
import {
  SinglePayoutSendOtpRequest,
  SinglePayoutSendOtpResponse,
} from '../types/single-payout.types'

export const useSinglePayoutSendOtp = () => {
  return useMutation<SinglePayoutSendOtpResponse, Error, SinglePayoutSendOtpRequest>({
    mutationFn: (data: SinglePayoutSendOtpRequest) =>
      singlePayoutApi.sendOtp(data),
  })
}
