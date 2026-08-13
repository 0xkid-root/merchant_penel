import { useQuery } from '@tanstack/react-query'
import { singlePayoutApi } from '../api/singlePayoutApi'

export const useSinglePayoutDetails = (id?: number) => {
    return useQuery({
        queryKey: ['single-payout', 'details', id],
        queryFn: () => singlePayoutApi.getSinglePayoutById(id!),
        enabled: typeof id === 'number' && id > 0,
    })
}
