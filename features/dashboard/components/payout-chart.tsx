'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { useDashboardTrend } from '../hook/useDashboardTrend'

export default function PayoutChart() {
  const { data: response, isLoading, isError } = useDashboardTrend()
  const trendData = response?.data || []

  const chartData = React.useMemo(() => {
    return trendData.map((item) => {
      const dateObj = new Date(item.date)
      const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
      }).format(dateObj)

      return {
        ...item,
        displayDate: formattedDate,
      }
    })
  }, [trendData])

  const totalPayout = React.useMemo(() => {
    return trendData.reduce((sum, item) => sum + item.amount, 0)
  }, [trendData])

  const formattedTotalPayout = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(totalPayout)

  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4  sm:p-6 xl:col-span-2">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Payout Overview
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Overview of your payout activity this month.
          </p>
        </div>

        <button
          type="button"
          className="flex w-fit items-center gap-1 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <span>This Month</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <div className="h-[260px] sm:h-[300px] flex flex-col justify-center">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            Loading chart data...
          </div>
        ) : isError ? (
          <div className="flex h-full items-center justify-center text-sm text-red-500">
            Failed to load payout overview.
          </div>
        ) : trendData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            No payout data available for this period.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 8, right: 0, left: -18, bottom: 0 }}
            >
              <CartesianGrid
                stroke="#e5e7eb"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="displayDate"
                stroke="#94a3b8"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />

              <YAxis
                stroke="#94a3b8"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                width={48}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                }}
                cursor={{ fill: 'transparent' }}
                formatter={(value: any) =>
                  typeof value === 'number'
                    ? new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                      }).format(value)
                    : value
                }
                labelStyle={{ color: '#64748b', marginBottom: '4px' }}
              />

              <Bar
                dataKey="amount"
                fill="#4f46e5"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500">
        <span className="font-semibold text-slate-900">Total Payout</span>{' '}
        {formattedTotalPayout}
      </p>
    </section>
  )
}