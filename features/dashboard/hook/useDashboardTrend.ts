import { useQuery } from '@tanstack/react-query'

import { dashboardApi } from '../api/dashboardApi'
import type { ApiResponse, DashboardTrend } from '../types'

export const useDashboardTrend = () => {
  return useQuery<ApiResponse<DashboardTrend[]>, Error>({
    queryKey: ['dashboard-trend'],
    queryFn: dashboardApi.getTrend,
  })
}