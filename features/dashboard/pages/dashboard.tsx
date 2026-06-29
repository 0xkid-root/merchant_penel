'use client'

import { useEffect, useState } from 'react'

import DashboardHeader from '../components/dashboard-header'
import DashboardStats from '../components/dashboard-stats'
import PayoutChart from '../components/payout-chart'
import RecentTransactions from '../components/recent-transactions'
import RecentPayouts from '../components/recent-payouts'

import { RecentActivity } from '@/features/dashboard/components/recent-activity'

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    setUserEmail(email || 'Demo Pvt. Ltd.')
  }, [])

  return (
    <div className="p-8">

      {/* Header */}
      <DashboardHeader userEmail={userEmail} />

      {/* Statistics */}
      <DashboardStats />

      {/* Chart + Activity */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <PayoutChart />
        <RecentActivity />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-2 gap-6">
        <RecentTransactions />
        <RecentPayouts />
      </div>

      

    </div>
  )
}