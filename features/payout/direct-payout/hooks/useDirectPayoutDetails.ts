import { useQuery } from '@tanstack/react-query'
import { directPayoutApi } from '../api/directPayoutApi'
import { DirectPayoutTransaction } from '../types/direct-payout.types'

export const useDirectPayoutDetails = (id: number | undefined) => {
  return useQuery<DirectPayoutTransaction, Error>({
    queryKey: ['directPayoutDetails', id],
    queryFn: () => directPayoutApi.getDirectPayoutById(id!),
    enabled: id !== undefined,
  })
}
