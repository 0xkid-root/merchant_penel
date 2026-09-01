import { useQuery } from '@tanstack/react-query'

import { dashboardApi } from '../api/dashboardApi'
import type {
  ApiResponse,
  DashboardRecentTransaction,
} from '../types'

export const useDashboardRecentTransactions = () => {
  return useQuery<ApiResponse<DashboardRecentTransaction[]>, Error>({
    queryKey: ['dashboard-recent-transactions'],
    queryFn: dashboardApi.getRecentTransactions,
  })
}