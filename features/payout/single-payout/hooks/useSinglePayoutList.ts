import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '@/hooks/use-debounce'
import { PayoutStatus } from '../types/single-payout.types'

import { singlePayoutApi } from '../api/singlePayoutApi'

interface UseSinglePayoutListParams {
    page?: number
    size?: number
    search?: string
    status?: PayoutStatus
}

export const useSinglePayoutList = ({
    page = 0,
    size = 10,
    search = '',
    status,
}: UseSinglePayoutListParams = {}) => {
    const debouncedSearch = useDebounce(search, 400)

    return useQuery({
        queryKey: ['single-payouts', page, size, debouncedSearch, status],

        queryFn: () =>
            singlePayoutApi.getSinglePayouts(
                page,
                size,
                debouncedSearch,
                status
            ),
    })
}