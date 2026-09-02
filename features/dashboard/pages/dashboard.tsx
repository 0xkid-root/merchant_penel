'use client'

import { useEffect, useState } from 'react'

import PageHeader from '@/components/layout/page-header'
import DashboardStats from '../components/dashboard-stats'
import PayoutChart from '../components/payout-chart'
import RecentTransactions from '../components/recent-transactions'
import RecentPayouts from '../components/recent-payouts'
import { RecentActivity } from '../components/recent-activity'
import { PayoutDistribution } from '../components/payout-distribution'

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    setUserEmail(email || 'Demo Pvt. Ltd.')
  }, [])

  return (
    <div className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back. Here's what's happening with your account today."
      />

      <DashboardStats />

      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <PayoutChart />
        <RecentActivity />

      </div>



      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <RecentTransactions />
        <PayoutDistribution />
      </div>
    </div>
  )
}