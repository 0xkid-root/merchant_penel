import { useMutation, useQueryClient } from '@tanstack/react-query'
import { singlePayoutApi } from '../api/singlePayoutApi'
import {
  SinglePayoutRequest,
  ProcessSinglePayoutResponse,
} from '../types/single-payout.types'

export const useProcessSinglePayout = () => {
  const queryClient = useQueryClient()

  return useMutation<ProcessSinglePayoutResponse, Error, SinglePayoutRequest>({
    mutationFn: (data: SinglePayoutRequest) =>
      singlePayoutApi.processSinglePayout(data),
    onSuccess: () => {
      // Invalidate the payout list to refresh data
      queryClient.invalidateQueries({ queryKey: ['single-payouts'] })
      queryClient.invalidateQueries({ queryKey: ['wallet-dashboard'] }) // Assuming we might want to refresh wallet balance
    },
  })
}
