'use client'

import { RECENT_PAYOUTS } from '../data/dashboard-data'
import { getStatusBadge } from '../utils/status-badge'

export default function RecentPayouts() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between px-6 pt-6 pb-5">

        <h3 className="text-2xl font-semibold text-slate-900">
          Recent Payouts
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
                BENEFICIARY
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                BANK / UPI
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                AMOUNT
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                MODE
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                STATUS
              </th>

            </tr>

          </thead>

          <tbody>

            {RECENT_PAYOUTS.map((payout, index) => (

              <tr
                key={index}
                className="border-b border-slate-100 transition-colors hover:bg-slate-50"
              >

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm">
                      {payout.avatar}
                    </div>

                    <span className="text-sm font-medium text-slate-900">
                      {payout.beneficiary}
                    </span>

                  </div>

                </td>

                <td className="px-6 py-5 text-sm text-slate-600">
                  {payout.bank}
                </td>

                <td className="px-6 py-5 text-[15px] font-semibold text-slate-900">
                  {payout.amount}
                </td>

                <td className="px-6 py-5 text-sm font-medium text-slate-700">
                  {payout.mode}
                </td>

                <td className="px-6 py-5">
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
  )
}