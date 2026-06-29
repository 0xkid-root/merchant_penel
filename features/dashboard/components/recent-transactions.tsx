'use client'

import { RECENT_TRANSACTIONS } from '../data/dashboard-data'
import { getStatusBadge } from '../utils/status-badge'

export default function RecentTransactions() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-5">
        <h3 className="text-2xl font-semibold text-slate-900">
          Recent Transactions
        </h3>

        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
          View all
        </button>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-200">

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                TXN ID
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                TYPE
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                AMOUNT
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                STATUS
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                DATE
              </th>

            </tr>

          </thead>

          <tbody>

            {RECENT_TRANSACTIONS.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-slate-100 transition-colors hover:bg-slate-50"
              >

                <td className="px-6 py-5 text-sm font-medium text-indigo-600">
                  {tx.id}
                </td>

                <td className="px-6 py-5 text-sm font-medium text-slate-700">
                  {tx.type}
                </td>

                <td className="px-6 py-5 text-[15px] font-semibold text-slate-900">
                  {tx.amount}
                </td>

                <td className="px-6 py-5">
                  <span className={getStatusBadge(tx.status)}>
                    {tx.status}
                  </span>
                </td>

                <td className="px-6 py-5 text-sm text-slate-500">
                  {tx.date}
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>

    </div>
  )
}