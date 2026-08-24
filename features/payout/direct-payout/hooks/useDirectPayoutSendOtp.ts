import { useMutation } from '@tanstack/react-query'
import { directPayoutApi } from '../api/directPayoutApi'
import { DirectPayoutSendOtpRequest, DirectPayoutSendOtpResponse } from '../types/direct-payout.types'

export const useDirectPayoutSendOtp = () => {
  return useMutation<DirectPayoutSendOtpResponse, Error, DirectPayoutSendOtpRequest>({
    mutationFn: (data: DirectPayoutSendOtpRequest) => directPayoutApi.sendOtp(data),
  })
}
