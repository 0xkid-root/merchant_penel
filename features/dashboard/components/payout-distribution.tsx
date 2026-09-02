'use client'

import { ChevronDown } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { useDashboardPaymentMode } from '../hook/useDashboardPaymentMode'
import { formatCurrency } from '@/lib/utils/formatCurrency'

const COLORS = {
  imps: '#4f46e5', // Indigo
  neft: '#10b981', // Emerald
  rtgs: '#f59e0b', // Amber
}

const LABELS = {
  imps: 'IMPS',
  neft: 'NEFT',
  rtgs: 'RTGS',
}

export function PayoutDistribution() {
  const { data: response, isLoading, isError } = useDashboardPaymentMode()
  const data = response?.data

  if (isLoading) {
    return (
      <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 h-[400px] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </section>
    )
  }

  if (isError || !data) {
    return (
      <section className="min-w-0 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600 h-[400px] flex items-center justify-center">
        Failed to load payout distribution.
      </section>
    )
  }

  const chartData = [
    { name: 'imps', value: data.imps.amount },
    { name: 'neft', value: data.neft.amount },
    { name: 'rtgs', value: data.rtgs.amount },
  ].filter((item) => item.value > 0) // Only show segments > 0

  const totalAmount = chartData.reduce((sum, item) => sum + item.value, 0)

  // Calculate percentages safely
  const getPercentage = (amount: number) => {
    if (totalAmount === 0) return '0.0%'
    return ((amount / totalAmount) * 100).toFixed(1) + '%'
  }

  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-2 sm:gap-4">
        <h3 className="whitespace-nowrap text-xl font-semibold text-slate-900 sm:text-2xl">
          Payout Distribution
        </h3>

        <button
          type="button"
          className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <span>This Month</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 flex flex-col items-center gap-8">
        
        {/* Chart Area */}
        <div className="relative h-[180px] w-[180px] shrink-0">
          {totalAmount > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={COLORS[entry.name as keyof typeof COLORS]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center rounded-full border-[15px] border-slate-100">
              <span className="text-sm text-slate-400">No Data</span>
            </div>
          )}

          {/* Center Text */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-lg font-bold text-slate-900">
              {formatCurrency(totalAmount)}
            </span>
            <span className="text-xs text-slate-500 mt-0.5 font-medium">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex w-full flex-col gap-3 px-2 sm:px-6">
          {['imps', 'neft', 'rtgs'].map((key) => {
            const stats = data[key as keyof typeof data]
            if (stats.amount === 0 && stats.count === 0) return null // Hide zero amounts

            return (
              <div key={key} className="flex items-center justify-between gap-4 border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: COLORS[key as keyof typeof COLORS] }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-700 leading-tight">
                      {LABELS[key as keyof typeof LABELS]}
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5">
                      {stats.count} {stats.count === 1 ? 'txn' : 'txns'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold text-slate-900 leading-tight">
                    {formatCurrency(stats.amount)}
                  </span>
                  <span className="text-xs font-medium text-slate-500 mt-0.5">
                    {getPercentage(stats.amount)}
                  </span>
                </div>
              </div>
            )
          })}

          {totalAmount === 0 && (
            <div className="text-center text-sm text-slate-500 py-4">No payout data available for this period.</div>
          )}
        </div>
      </div>
    </section>
  )
}
