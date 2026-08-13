import { useQuery } from '@tanstack/react-query'

import { singlePayoutApi } from '../api/singlePayoutApi'

interface UseSinglePayoutListParams {
    page?: number
    size?: number
}

export const useSinglePayoutList = ({
    page = 0,
    size = 10,
}: UseSinglePayoutListParams = {}) => {
    return useQuery({
        queryKey: ['single-payouts', page, size],

        queryFn: () =>
            singlePayoutApi.getSinglePayouts(
                page,
                size
            ),
    })
}