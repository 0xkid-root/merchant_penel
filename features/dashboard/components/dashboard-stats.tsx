'use client'

import {
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  Wallet,
} from 'lucide-react'

import { StatCard } from '@/components/cards/stat-card'

export default function DashboardStats() {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
      <StatCard
        label="Wallet Balance"
        value="₹14,82,350.00"
        change="Available Balance"
        changeType="neutral"
        icon={Wallet}
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
      />

      <StatCard
        label="Today's Payout"
        value="₹78,200.00"
        change="12.5%"
        changeType="up"
        icon={ArrowUpRight}
        iconBg="bg-green-50"
        iconColor="text-green-600"
      />

      <StatCard
        label="Today's Credit"
        value="₹1,24,500.00"
        change="8.3%"
        changeType="up"
        icon={ArrowDownLeft}
        iconBg="bg-violet-50"
        iconColor="text-indigo-600"
      />

      <StatCard
        label="Today's Debit"
        value="₹45,700.00"
        change="3.2%"
        changeType="down"
        icon={TrendingUp}
        iconBg="bg-red-50"
        iconColor="text-red-600"
      />
    </div>
  )
}