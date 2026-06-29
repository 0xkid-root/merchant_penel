'use client'

import { Search, Download, ChevronDown } from 'lucide-react'

const mockTransactions = [
  {
    id: '#TXN8821',
    type: 'Add Funds',
    icon: '↓',
    amount: '+₹50,000.00',
    amountColor: 'text-green-600',
    status: 'Success',
    statusBg: 'bg-green-100',
    statusColor: 'text-green-700',
    remarks: 'IMPS - HDFC - 1234',
    date: '18 Jun 2025, 10:02 AM',
    balance: '₹14,82,350.00',
  },
  {
    id: '#TXN8820',
    type: 'Payout',
    icon: '↑',
    amount: '-₹12,000.00',
    amountColor: 'text-red-600',
    status: 'Success',
    statusBg: 'bg-green-100',
    statusColor: 'text-green-700',
    remarks: 'UPI - pr***@upi',
    date: '18 Jun 2025, 09:47 AM',
    balance: '₹14,32,350.00',
  },
  {
    id: '#TXN8819',
    type: 'Withdrawal Request',
    icon: '↑',
    amount: '-₹25,000.00',
    amountColor: 'text-red-600',
    status: 'Pending',
    statusBg: 'bg-yellow-100',
    statusColor: 'text-yellow-700',
    remarks: 'Withdrawal to HDFC - 4321',
    date: '18 Jun 2025, 09:30 AM',
    balance: '₹14,44,350.00',
  },
  {
    id: '#TXN8818',
    type: 'Add Funds',
    icon: '↓',
    amount: '+₹1,00,000.00',
    amountColor: 'text-green-600',
    status: 'Success',
    statusBg: 'bg-green-100',
    statusColor: 'text-green-700',
    remarks: 'NEFT - ICICI - 9234',
    date: '18 Jun 2025, 09:15 AM',
    balance: '₹14,69,350.00',
  },
  {
    id: '#TXN8817',
    type: 'Payout',
    icon: '↑',
    amount: '-₹8,500.00',
    amountColor: 'text-red-600',
    status: 'Failed',
    statusBg: 'bg-red-100',
    statusColor: 'text-red-700',
    remarks: 'NEFT - 9988776655',
    date: '18 Jun 2025, 08:55 AM',
    balance: '₹13,69,350.00',
  },
]

export function WalletTransactionsTable() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '20px' }}>
          Recent Transactions
        </h3>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>
            <span>All Transactions</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search transaction ID, remark..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          style={{ fontFamily: 'var(--font-sans)', fontSize: '14px' }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-gray-600 py-3 px-4" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>
                TXN ID
              </th>
              <th className="text-left text-gray-600 py-3 px-4" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>
                TYPE
              </th>
              <th className="text-left text-gray-600 py-3 px-4" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>
                AMOUNT
              </th>
              <th className="text-left text-gray-600 py-3 px-4" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>
                STATUS
              </th>
              <th className="text-left text-gray-600 py-3 px-4" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>
                REMARKS
              </th>
              <th className="text-left text-gray-600 py-3 px-4" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>
                DATE & TIME
              </th>
              <th className="text-left text-gray-600 py-3 px-4" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>
                BALANCE
              </th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((tx, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <span className="text-indigo-600" style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '14px' }}>
                    {tx.id}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-gray-700" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px' }}>
                    {tx.type}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`${tx.amountColor}`} style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>
                    {tx.amount}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`${tx.statusBg} ${tx.statusColor} px-3 py-1 rounded-full text-sm`} style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '13px' }}>
                    {tx.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-gray-700" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '14px' }}>
                    {tx.remarks}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-gray-600" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '14px' }}>
                    {tx.date}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>
                    {tx.balance}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-gray-600 text-sm" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}>
          Showing 1 to 5 of 24 transactions
        </p>
        <div className="flex items-center gap-2">
          <button className="px-2 py-2 text-gray-600 hover:bg-gray-100 rounded-lg" style={{ fontFamily: 'var(--font-sans)', fontSize: '14px' }}>
            ←
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                page === 1
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {page}
            </button>
          ))}
          <button className="px-2 py-2 text-gray-600 hover:bg-gray-100 rounded-lg" style={{ fontFamily: 'var(--font-sans)', fontSize: '14px' }}>
            →
          </button>
        </div>
      </div>
    </div>
  )
}
