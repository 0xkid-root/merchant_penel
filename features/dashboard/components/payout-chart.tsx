'use client'

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

import { PAYOUT_DATA } from '../data/dashboard-data'

export default function PayoutChart() {
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

      <div className="h-[260px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={PAYOUT_DATA}
            margin={{ top: 8, right: 0, left: -18, bottom: 0 }}
          >
            <CartesianGrid
              stroke="#e5e7eb"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="date"
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
            />

            <Bar
              dataKey="amount"
              fill="#4f46e5"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500">
        <span className="font-semibold text-slate-900">Total Payout</span>{' '}
        ₹2,61,000.00{' '}
        <span className="font-semibold text-green-600">↑ 15.6%</span> vs last
        month
      </p>
    </section>
  )
}