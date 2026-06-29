'use client'

import { ChevronDown } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const chartData = [
  { date: '1 Jun', balance: 12 },
  { date: '6 Jun', balance: 9 },
  { date: '11 Jun', balance: 14 },
  { date: '16 Jun', balance: 15 },
  { date: '21 Jun', balance: 13 },
  { date: '26 Jun', balance: 10 },
]

export function BalanceTrendChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '20px' }}>
          Balance Trend
        </h3>
        <button className="flex items-center gap-2 text-gray-700 hover:bg-gray-50 px-3 py-1 rounded-lg" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px' }}>
          <span>This Month</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            stroke="#9ca3af"
            style={{ fontSize: '13px', fontFamily: 'var(--font-sans)' }}
          />
          <YAxis 
            stroke="#9ca3af"
            label={{ value: '₹L', angle: -90, position: 'insideLeft', style: { fontSize: '13px' } }}
            style={{ fontSize: '13px', fontFamily: 'var(--font-sans)' }}
          />
          <Tooltip 
            formatter={(value) => `₹${value}L`}
            contentStyle={{ 
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="balance" 
            stroke="#4f46e5" 
            strokeWidth={2}
            dot={{ fill: '#4f46e5', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
