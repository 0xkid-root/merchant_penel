import { useQuery } from '@tanstack/react-query'

import { dashboardApi } from '../api/dashboardApi'
import type { ApiResponse, DashboardSummary } from '../types'

export const useDashboardSummary = () => {
  return useQuery<ApiResponse<DashboardSummary>, Error>({
    queryKey: ['dashboard-summary'],
    queryFn: dashboardApi.getSummary,
  })
}