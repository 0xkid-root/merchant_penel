'use client'

import Link from 'next/link'

import { RECENT_PAYOUTS } from '../data/dashboard-data'
import { getStatusBadge } from '../utils/status-badge'

export default function RecentPayouts() {
  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-4 px-4 py-5 sm:px-6 sm:py-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Recent Payouts
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Latest payouts sent to beneficiaries.
          </p>
        </div>

        <Link
          href="/payout/payout-history"
          className="shrink-0 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
        >
          View all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full">
          <thead>
            <tr className="border-y border-slate-200 bg-slate-50/70">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6 sm:py-4">
                Beneficiary
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6 sm:py-4">
                Bank / UPI
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6 sm:py-4">
                Amount
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6 sm:py-4">
                Mode
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6 sm:py-4">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {RECENT_PAYOUTS.map((payout, index) => (
              <tr
                key={`${payout.beneficiary}-${index}`}
                className="border-b border-slate-100 transition-colors hover:bg-slate-50"
              >
                <td className="px-4 py-4 sm:px-6 sm:py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-700">
                      {payout.avatar}
                    </div>

                    <span className="whitespace-nowrap text-sm font-medium text-slate-900">
                      {payout.beneficiary}
                    </span>
                  </div>
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6 sm:py-5">
                  {payout.bank}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-900 sm:px-6 sm:py-5">
                  {payout.amount}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-700 sm:px-6 sm:py-5">
                  {payout.mode}
                </td>

                <td className="whitespace-nowrap px-4 py-4 sm:px-6 sm:py-5">
                  <span className={getStatusBadge(payout.status)}>
                    {payout.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}