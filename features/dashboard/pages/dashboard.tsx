'use client'

import { useState, useEffect } from 'react'
import { Bell, Calendar, Plus, ChevronDown } from 'lucide-react'
import { StatCard } from '@/components/cards/stat-card'
import { RecentActivity } from '@/components/cards/recent-activity'
import { Wallet, ArrowUpRight, ArrowDownLeft, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const PAYOUT_DATA = [
  { date: '1 Jun', amount: 45000 },
  { date: '6 Jun', amount: 52000 },
  { date: '11 Jun', amount: 48000 },
  { date: '16 Jun', amount: 61000 },
  { date: '18 Jun', amount: 55000 }
]

const RECENT_TRANSACTIONS = [
  { id: '#TXN8821', type: 'IMPS', amount: '₹5,200.00', status: 'Success', date: '18 Jun, 10:02 AM' },
  { id: '#TXN8820', type: 'NEFT', amount: '₹50,000.00', status: 'Success', date: '18 Jun, 09:47 AM' },
  { id: '#TXN8819', type: 'UPI', amount: '₹12,000.00', status: 'Pending', date: '18 Jun, 09:30 AM' },
  { id: '#TXN8818', type: 'NEFT', amount: '₹8,500.00', status: 'Failed', date: '18 Jun, 09:15 AM' },
  { id: '#TXN8817', type: 'RTGS', amount: '₹2,00,000.00', status: 'Success', date: '18 Jun, 08:55 AM' }
]

const RECENT_PAYOUTS = [
  { beneficiary: 'Ravi Kumar', bank: 'HDFC ****4821', amount: '₹5,200.00', mode: 'IMPS', status: 'Success', avatar: '🧑' },
  { beneficiary: 'Priya Singh', bank: 'priya@upi', amount: '₹12,000.00', mode: 'UPI', status: 'Pending', avatar: '👩' },
  { beneficiary: 'Deepak Mehta', bank: 'ICICI ****9234', amount: '₹8,500.00', mode: 'NEFT', status: 'Failed', avatar: '🧑' },
  { beneficiary: 'Sneha Patel', bank: 'SBI ****1102', amount: '₹22,000.00', mode: 'RTGS', status: 'Success', avatar: '👩' },
  { beneficiary: 'Amit Verma', bank: 'amit@upi', amount: '₹3,400.00', mode: 'UPI', status: 'Success', avatar: '🧑' }
]

function getStatusBadge(status: string) {
  const baseClass = 'px-3 py-1 rounded-full'
  const fontStyle = { fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '13px' }
  if (status === 'Success') return `${baseClass} bg-green-100 text-green-700`
  if (status === 'Pending') return `${baseClass} bg-yellow-100 text-yellow-700`
  return `${baseClass} bg-red-100 text-red-700`
}

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    setUserEmail(email || 'Demo Pvt. Ltd.')
  }, [])

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '32px' }}>Dashboard</h1>
          <p className="text-gray-600 mt-1" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '15px' }}>Welcome back, {userEmail}. Here's what's happening with your account today.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600 bg-white rounded-lg px-4 py-2 border border-gray-200" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px' }}>
            <Calendar className="w-4 h-4" />
            <span>18 Jun 2025</span>
          </div>
          <button className="relative p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">D</div>
            <span className="text-gray-700" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px' }}>Demo Pvt. Ltd.</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Wallet Balance"
          value="₹14,82,350.00"
          change="Available Balance"
          changeType="neutral"
          icon={Wallet}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          label="Today's Payout"
          value="₹78,200.00"
          change="12.5%"
          changeType="up"
          icon={ArrowUpRight}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          label="Today's Credit"
          value="₹1,24,500.00"
          change="8.3%"
          changeType="up"
          icon={ArrowDownLeft}
          iconBg="bg-indigo-100"
          iconColor="text-indigo-600"
        />
        <StatCard
          label="Today's Debit"
          value="₹45,700.00"
          change="3.2%"
          changeType="down"
          icon={TrendingUp}
          iconBg="bg-red-100"
          iconColor="text-red-600"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Payout Chart */}
        <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '20px' }}>Payout Overview</h3>
            <button className="flex items-center gap-1 text-gray-700 hover:bg-gray-100 px-2 py-1 rounded" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px' }}>
              <span>This Month</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={PAYOUT_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                cursor={{ fill: 'transparent' }}
              />
              <Bar dataKey="amount" fill="#4f46e5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-gray-600 mt-4" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '14px' }}>
            <span className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Total Payout</span> ₹2,61,000.00 <span className="text-green-600" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>↑ 15.6%</span> vs last month
          </p>
        </div>

        {/* Recent Activity */}
        <RecentActivity />
      </div>

      {/* Transactions and Payouts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '20px' }}>Recent Transactions</h3>
            <a href="#" className="text-indigo-600 hover:text-indigo-700" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>View all</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-gray-600 py-3" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>TXN ID</th>
                  <th className="text-left text-gray-600 py-3" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>TYPE</th>
                  <th className="text-left text-gray-600 py-3" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>AMOUNT</th>
                  <th className="text-left text-gray-600 py-3" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>STATUS</th>
                  <th className="text-left text-gray-600 py-3" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>DATE</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_TRANSACTIONS.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="text-indigo-600 py-3" style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '14px' }}>{tx.id}</td>
                    <td className="text-gray-700 py-3" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px' }}>{tx.type}</td>
                    <td className="text-gray-900 py-3" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>{tx.amount}</td>
                    <td className="py-3">
                      <span className={getStatusBadge(tx.status)}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="text-gray-500 py-3" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '14px' }}>{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Payouts */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '20px' }}>Recent Payouts</h3>
            <a href="#" className="text-indigo-600 hover:text-indigo-700" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>View all</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-gray-600 py-3" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>BENEFICIARY</th>
                  <th className="text-left text-gray-600 py-3" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>BANK / UPI</th>
                  <th className="text-left text-gray-600 py-3" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>AMOUNT</th>
                  <th className="text-left text-gray-600 py-3" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>MODE</th>
                  <th className="text-left text-gray-600 py-3" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_PAYOUTS.map((payout, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">{payout.avatar}</div>
                        <span className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px' }}>{payout.beneficiary}</span>
                      </div>
                    </td>
                    <td className="text-gray-700 py-3" style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '14px' }}>{payout.bank}</td>
                    <td className="text-gray-900 py-3" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>{payout.amount}</td>
                    <td className="text-gray-700 py-3" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px' }}>{payout.mode}</td>
                    <td className="py-3">
                      <span className={getStatusBadge(payout.status)}>
                        {payout.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '14px' }}>
        <p>© 2025 AtMoonPe. All rights reserved.</p>
      </div>
    </div>
  )
}
