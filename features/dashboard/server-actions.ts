'use server'

import { ApiResponse } from '@/lib/types'
import { DashboardData, DashboardStats, PayoutChartData, RecentTransaction, RecentPayout } from './types'

// Get dashboard data
export async function getDashboardDataAction(): Promise<ApiResponse<DashboardData>> {
  try {
    await new Promise(resolve => setTimeout(resolve, 800))

    const stats: DashboardStats = {
      walletBalance: 14823500,
      availableBalance: 14823500,
      todaysPayout: 78200,
      todaysCredit: 124500,
      todaysDebit: 45700,
      successfulPayouts: 156,
      failedPayouts: 3,
      pendingPayouts: 5,
    }

    const chartData: PayoutChartData[] = [
      { date: '1 Jun', amount: 450000 },
      { date: '5 Jun', amount: 520000 },
      { date: '10 Jun', amount: 380000 },
      { date: '15 Jun', amount: 620000 },
      { date: '18 Jun', amount: 550000 },
    ]

    const recentTransactions: RecentTransaction[] = [
      {
        id: '#TXN8821',
        type: 'PAYOUT',
        amount: 5200,
        status: 'SUCCESS',
        date: new Date(),
        description: 'IMPS',
      },
      {
        id: '#TXN8820',
        type: 'PAYOUT',
        amount: 25200,
        status: 'FAILED',
        date: new Date(Date.now() - 120000),
        description: 'NEFT',
      },
      {
        id: '#TXN8819',
        type: 'DEPOSIT',
        amount: 100000,
        status: 'SUCCESS',
        date: new Date(Date.now() - 240000),
        description: 'Bank Transfer',
      },
      {
        id: '#TXN8818',
        type: 'PAYOUT',
        amount: 8500,
        status: 'PENDING',
        date: new Date(Date.now() - 360000),
        description: 'RTGS',
      },
      {
        id: '#TXN8817',
        type: 'WITHDRAWAL',
        amount: 2000000,
        status: 'SUCCESS',
        date: new Date(Date.now() - 86400000),
        description: 'Bulk Payout',
      },
    ]

    const recentPayouts: RecentPayout[] = [
      {
        id: '1',
        beneficiaryName: 'Ravi Kumar',
        avatar: 'R',
        bankInfo: 'HDFC **** 4821',
        amount: 5200,
        mode: 'IMPS',
        status: 'SUCCESS',
      },
      {
        id: '2',
        beneficiaryName: 'Priya Singh',
        avatar: 'P',
        bankInfo: 'ICICI **** 9234',
        amount: 12000,
        mode: 'UPI',
        status: 'PENDING',
      },
      {
        id: '3',
        beneficiaryName: 'Deepak Mehta',
        avatar: 'D',
        bankInfo: 'SBI **** 5678',
        amount: 8500,
        mode: 'NEFT',
        status: 'FAILED',
      },
      {
        id: '4',
        beneficiaryName: 'Sneha Patel',
        avatar: 'S',
        bankInfo: 'Axis **** 1102',
        amount: 22000,
        mode: 'RTGS',
        status: 'SUCCESS',
      },
      {
        id: '5',
        beneficiaryName: 'Amit Verma',
        avatar: 'A',
        bankInfo: 'HDFC **** 3400',
        amount: 3400,
        mode: 'UPI',
        status: 'SUCCESS',
      },
    ]

    return {
      success: true,
      data: {
        stats,
        chartData,
        recentTransactions,
        recentPayouts,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'DASHBOARD_DATA_FAILED',
        message: 'Failed to fetch dashboard data',
      },
    }
  }
}
