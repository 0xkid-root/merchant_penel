import { useQuery } from '@tanstack/react-query'
import { payoutHistoryApi } from '../api/payoutHistoryApi'

interface UsePayoutHistoryListParams {
  page?: number
  size?: number
  search?: string
  status?: string
  payoutType?: string
  fromDate?: string
  toDate?: string
}

export function usePayoutHistoryList(params: UsePayoutHistoryListParams) {
  return useQuery({
    queryKey: ['payoutHistoryList', params],
    queryFn: () => payoutHistoryApi.getPayoutTransactions(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}
