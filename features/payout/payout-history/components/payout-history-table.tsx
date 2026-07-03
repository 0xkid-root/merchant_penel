'use client'

import { MoreVertical } from 'lucide-react'

import  PayoutStatusBadge  from './payout-status-badge'

import type { PayoutHistoryItem } from '../types/payout-history.types'

interface PayoutHistoryTableProps {
  payouts: PayoutHistoryItem[]
  currentPage: number
  setCurrentPage: (page: number) => void
}

const PAYOUT_TYPE_STYLES: Record<
  PayoutHistoryItem['payoutType'],
  string
> = {
  Single: 'bg-indigo-50 text-indigo-700',
  Direct: 'bg-sky-50 text-sky-700',
  Bulk: 'bg-violet-50 text-violet-700',
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function PayoutHistoryTable({
  payouts,
  currentPage,
  setCurrentPage,
}: PayoutHistoryTableProps) {
  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[1100px] border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Payout ID
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Type
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Beneficiary
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Bank Account
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Amount
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Created At
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {payouts.map((payout) => (
              <tr
                key={payout.id}
                className="border-b border-slate-200 transition hover:bg-slate-50"
              >
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-indigo-600">
                  {payout.payoutId}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${
                      PAYOUT_TYPE_STYLES[payout.payoutType]
                    }`}
                  >
                    {payout.payoutType}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                      {payout.beneficiaryName
                        .split(' ')
                        .slice(0, 2)
                        .map((name) => name[0])
                        .join('')
                        .toUpperCase()}
                    </div>

                    <span className="whitespace-nowrap text-sm font-medium text-slate-900">
                      {payout.beneficiaryName}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <p className="whitespace-nowrap text-sm font-medium text-slate-900">
                    {payout.bankName} •••• {payout.accountLastFour}
                  </p>  

                  <p className="mt-1 text-xs text-slate-500">
                    IFSC: {payout.ifscCode}
                  </p>
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-slate-900">
                  {formatCurrency(payout.amount)}
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                  {payout.createdAt}
                </td>

                <td className="px-4 py-3">
                  <PayoutStatusBadge status={payout.status} />
                </td>

                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    aria-label={`More actions for ${payout.payoutId}`}
                    className="rounded-lg p-2 transition hover:bg-slate-100"
                  >
                    <MoreVertical className="h-4 w-4 text-slate-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing {payouts.length} payout{payouts.length !== 1 ? 's' : ''}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ←
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                page === currentPage
                  ? 'bg-indigo-600 text-white'
                  : 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage(currentPage + 1)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-50"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}