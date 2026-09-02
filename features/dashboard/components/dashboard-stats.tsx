'use client'

import {
  Wallet,
  Calendar,
  CheckCircle,
  XCircle,
  Users,
  CreditCard,
  CalendarDays,
  Landmark
} from 'lucide-react'

import { StatCard } from '@/components/cards/stat-card'
import { useDashboardSummary } from '../hook/useDashboardSummary'
import { formatCurrency } from '@/lib/utils/formatCurrency'

export default function DashboardStats() {
  const { data: response, isLoading, isError } = useDashboardSummary()

  const data = response?.data

  if (isLoading) {
    return (
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="h-[120px] animate-pulse rounded-2xl bg-white border border-slate-200"></div>
        ))}
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
        Failed to load dashboard summary.
      </div>
    )
  }

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
      {/* ROW 1 */}
      <StatCard
        label="Total Funds Added"
        value={formatCurrency(data.totalFundsAdded)}
        change=""
        changeType="neutral"
        icon={Landmark}
        iconBg="bg-amber-50"
        iconColor="text-amber-600"
      />

      <StatCard
        label="Wallet Balance"
        value={formatCurrency(data.walletBalance)}
        change=""
        changeType="neutral"
        icon={Wallet}
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
      />

      <StatCard
        label="Today's Payouts"
        value={String(data.todaysPayouts)}
        change=""
        changeType="neutral"
        icon={Calendar}
        iconBg="bg-violet-50"
        iconColor="text-violet-600"
      />

      <StatCard
        label="Successful Payouts"
        value={String(data.successfulPayouts)}
        change=""
        changeType="neutral"
        icon={CheckCircle}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
      />

      {/* ROW 2 */}
      <StatCard
        label="Failed Payouts"
        value={String(data.failedPayouts)}
        change=""
        changeType="neutral"
        icon={XCircle}
        iconBg="bg-red-50"
        iconColor="text-red-600"
      />

      <StatCard
        label="Total Beneficiaries"
        value={String(data.totalBeneficiaries)}
        change=""
        changeType="neutral"
        icon={Users}
        iconBg="bg-indigo-50"
        iconColor="text-indigo-600"
      />

      <StatCard
        label="Total Amount Paid"
        value={formatCurrency(data.totalAmountPaid)}
        change=""
        changeType="neutral"
        icon={CreditCard}
        iconBg="bg-cyan-50"
        iconColor="text-cyan-600"
      />

      <StatCard
        label="Monthly Amount"
        value={formatCurrency(data.monthlyAmount)}
        change=""
        changeType="neutral"
        icon={CalendarDays}
        iconBg="bg-fuchsia-50"
        iconColor="text-fuchsia-600"
      />
    </div>
  )
}