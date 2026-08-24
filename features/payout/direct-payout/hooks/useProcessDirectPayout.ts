import { useMutation } from '@tanstack/react-query'
import { directPayoutApi } from '../api/directPayoutApi'
import { DirectPayoutRequest, ProcessDirectPayoutResponse } from '../types/direct-payout.types'

export const useProcessDirectPayout = () => {
  return useMutation<ProcessDirectPayoutResponse, Error, DirectPayoutRequest>({
    mutationFn: (data: DirectPayoutRequest) => directPayoutApi.processDirectPayout(data),
  })
}
