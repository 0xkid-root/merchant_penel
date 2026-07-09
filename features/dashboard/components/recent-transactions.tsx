'use client'

import Link from 'next/link'

import { RECENT_TRANSACTIONS } from '../data/dashboard-data'
import { getStatusBadge } from '../utils/status-badge'

export default function RecentTransactions() {
  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-4 px-4 py-5 sm:px-6 sm:py-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Recent Transactions
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Latest wallet activity.
          </p>
        </div>

        <Link
          href="/wallet-transactions"
          className="shrink-0 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
        >
          View all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[720px] w-full">
          <thead>
            <tr className="border-y border-slate-200 bg-slate-50/70">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6 sm:py-4">
                TXN ID
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6 sm:py-4">
                Type
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6 sm:py-4">
                Amount
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6 sm:py-4">
                Status
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6 sm:py-4">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {RECENT_TRANSACTIONS.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-slate-100 transition-colors hover:bg-slate-50"
              >
                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-indigo-600 sm:px-6 sm:py-5">
                  {tx.id}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-700 sm:px-6 sm:py-5">
                  {tx.type}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-900 sm:px-6 sm:py-5">
                  {tx.amount}
                </td>

                <td className="whitespace-nowrap px-4 py-4 sm:px-6 sm:py-5">
                  <span className={getStatusBadge(tx.status)}>
                    {tx.status}
                  </span>
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500 sm:px-6 sm:py-5">
                  {tx.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </section>
  )
}