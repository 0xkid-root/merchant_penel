'use client'

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

const breakdownData = [
  { name: 'Available Balance', value: 80.7, amount: '₹14,82,350.00' },
  { name: 'Hold Balance', value: 2.7, amount: '₹50,000.00' },
  { name: 'Total Utilized', value: 16.6, amount: '₹3,05,600.00' },
]

const COLORS = ['#3b82f6', '#f59e0b', '#10b981']

export function BalanceBreakdown() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '20px', marginBottom: '24px' }}>
        Balance Breakdown
      </h3>

      <div className="flex flex-col items-center justify-center">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={breakdownData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {breakdownData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `${value.toFixed(1)}%`}
              contentStyle={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
            Total Balance
          </p>
          <p className="text-gray-900 mt-1" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '24px' }}>
            ₹18,37,950.00
          </p>
        </div>
      </div>

      {/* Breakdown Details */}
      <div className="space-y-3 mt-6 pt-6 border-t border-gray-100">
        {breakdownData.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
              <span className="text-gray-700 text-sm" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
                {item.name}
              </span>
            </div>
            <div className="text-right">
              <p className="text-gray-900 text-sm" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                {item.value.toFixed(1)}%
              </p>
              <p className="text-gray-600 text-xs" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}>
                {item.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
