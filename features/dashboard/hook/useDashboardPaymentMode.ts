import { useQuery } from '@tanstack/react-query'

import { dashboardApi } from '../api/dashboardApi'
import type { ApiResponse, DashboardPaymentMode } from '../types'

export const useDashboardPaymentMode = () => {
  return useQuery<ApiResponse<DashboardPaymentMode>, Error>({
    queryKey: ['dashboard-payment-mode'],
    queryFn: dashboardApi.getPaymentMode,
  })
}