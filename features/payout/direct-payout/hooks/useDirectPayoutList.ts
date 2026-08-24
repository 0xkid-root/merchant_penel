import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '@/hooks/use-debounce'
import { directPayoutApi } from '../api/directPayoutApi'
import { DirectPayoutListResponse } from '../types/direct-payout.types'

interface UseDirectPayoutListParams {
  page?: number
  size?: number
  search?: string
  status?: string
}

export const useDirectPayoutList = ({
  page = 0,
  size = 10,
  search = '',
  status,
}: UseDirectPayoutListParams = {}) => {
  const debouncedSearch = useDebounce(search, 400)

  return useQuery<DirectPayoutListResponse, Error>({
    queryKey: ['directPayouts', page, size, debouncedSearch, status],
    queryFn: () => directPayoutApi.getDirectPayouts(page, size, debouncedSearch, status),
  })
}
