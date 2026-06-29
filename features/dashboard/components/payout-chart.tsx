'use client'

import { ChevronDown } from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

import { PAYOUT_DATA } from '../data/dashboard-data'

export default function PayoutChart() {
  return (
    <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3
          className="text-2xl font-semibold text-slate-900"
          
        >
          Payout Overview
        </h3>

        <button
          className="flex items-center gap-1 text-gray-700 hover:bg-gray-100 px-2 py-1 rounded"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: '14px',
          }}
        >
          <span>This Month</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={PAYOUT_DATA}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e5e7eb"
          />

          <XAxis
            dataKey="date"
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />

          <YAxis
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
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

      {/* Footer */}
      <p
        className="text-gray-600 mt-4"
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 400,
          fontSize: '14px',
        }}
      >
        <span
          className="text-gray-900"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
          }}
        >
          Total Payout
        </span>{' '}
        ₹2,61,000.00{' '}
        <span
          className="text-green-600"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
          }}
        >
          ↑ 15.6%
        </span>{' '}
        vs last month
      </p>
    </div>
  )
}