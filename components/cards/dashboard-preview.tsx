'use client'

import { BarChart3, TrendingDown, TrendingUp, Plus } from 'lucide-react'

export function DashboardPreview() {
  const transactions = [
    { label: 'Add Funds', amount: '+₹50,000.00', color: 'text-indigo-600' },
    { label: 'Payout to Ravi Kumar', amount: '-₹25,200.00', color: 'text-red-500' },
    { label: 'Withdrawal Request', amount: '-₹10,000.00', color: 'text-red-500' },
    { label: 'Add Funds', amount: '+₹1,00,000.00', color: 'text-green-500' },
  ]

  return (
    <div className="relative">
      {/* Phone Device Frame */}
      <div className="relative mx-auto max-w-sm">
        {/* Phone Body */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl p-3 aspect-[9/19.5]">
          {/* Screen */}
          <div className="bg-white rounded-3xl h-full overflow-hidden flex flex-col">
            {/* Status Bar */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4 flex items-center justify-between text-white text-xs">
              <span>9:41</span>
              <div className="flex gap-1">
                <div className="w-1 h-2 bg-white rounded-sm" />
                <div className="w-1 h-2 bg-white rounded-sm" />
              </div>
            </div>

            {/* Navigation Bar */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4 flex flex-col gap-2">
              <div className="w-8 h-8 bg-indigo-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">⚡</span>
              </div>
              <div className="flex gap-3 flex-col">
                <div className="w-6 h-6 bg-slate-700 rounded-lg" />
                <div className="w-6 h-6 bg-slate-700 rounded-lg" />
                <div className="w-6 h-6 bg-slate-700 rounded-lg" />
                <div className="w-6 h-6 bg-slate-700 rounded-lg" />
                <div className="w-6 h-6 bg-slate-700 rounded-lg" />
                <div className="w-6 h-6 bg-slate-700 rounded-lg" />
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50">
              {/* Dashboard Header */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-slate-900">Dashboard Overview</h3>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white rounded-lg p-3 border border-slate-200">
                  <p className="text-xs text-slate-600">Available Balance</p>
                  <p className="text-sm font-bold text-indigo-600 mt-1">₹14,82,350</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-slate-200">
                  <p className="text-xs text-slate-600">Today&apos;s Payout</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">₹78,200</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-slate-200">
                  <p className="text-xs text-slate-600">Successful</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">156</p>
                </div>
              </div>

              {/* Transactions Section */}
              <div>
                <p className="text-xs font-semibold text-slate-900 mb-2">Recent Transactions</p>
                <div className="space-y-2">
                  {transactions.map((tx, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-3 border border-slate-200 text-xs">
                      <span className="text-slate-700">{tx.label}</span>
                      <span className={`font-semibold ${tx.color}`}>{tx.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini Chart */}
              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-slate-900">Payout Analytics</p>
                  <span className="text-xs text-slate-500">This Month</span>
                </div>
                <div className="flex items-end justify-between gap-1 h-12">
                  <div className="flex-1 bg-indigo-200 rounded-t" style={{ height: '30%' }} />
                  <div className="flex-1 bg-indigo-300 rounded-t" style={{ height: '45%' }} />
                  <div className="flex-1 bg-indigo-400 rounded-t" style={{ height: '60%' }} />
                  <div className="flex-1 bg-indigo-500 rounded-t" style={{ height: '75%' }} />
                  <div className="flex-1 bg-indigo-600 rounded-t" style={{ height: '65%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Illustration */}
        <div className="absolute -left-8 -bottom-12 w-24 h-24 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl shadow-lg transform -rotate-12 opacity-90 flex items-center justify-center">
          <div className="text-white text-4xl">💳</div>
        </div>

        {/* Security Badge */}
        <div className="absolute -right-8 -bottom-8 w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full shadow-lg flex items-center justify-center border-4 border-white">
          <div className="text-white text-3xl">✓</div>
        </div>
      </div>
    </div>
  )
}
