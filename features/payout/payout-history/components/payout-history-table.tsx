'use client'

import {
  Building2,
  ChevronRight,
  MoreVertical,
  UserRound,
} from 'lucide-react'

import PayoutStatusBadge from './payout-status-badge'

import type { PayoutHistoryItem } from '../types/payout-history.types'

interface PayoutHistoryTableProps {
  payouts: PayoutHistoryItem[]
  onViewDetails: (payout: PayoutHistoryItem) => void
}

function formatIndianCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount)
}

function getPayoutTypeLabel(type: PayoutHistoryItem['payoutType']) {
  if (type === 'single') return 'Single'
  if (type === 'direct') return 'Direct'
  return 'Bulk'
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

export default function PayoutHistoryTable({ payouts, onViewDetails }: PayoutHistoryTableProps) {
    
  if (payouts.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
          <Building2 className="h-5 w-5 text-slate-400" />
        </div>

        <h3 className="mt-4 text-base font-semibold text-slate-900">
          No payouts found
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Try changing your search or filter selection.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-[1120px] w-full">
        <thead className="border-y border-slate-200 bg-slate-50">
          <tr>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Payout ID
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Type
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Beneficiary
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Bank Account
            </th>

            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Amount
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Created At
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>

            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 bg-white">
          {payouts.map((payout) => (
            <tr
              key={payout.id}
              className="transition hover:bg-slate-50/80"
            >
              <td className="px-5 py-4">
                <button
                  type="button"
                  onClick={() => onViewDetails(payout)}
                  className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline"
                >
                  {payout.payoutId}
                </button>
              </td>

              <td className="px-5 py-4">
                <span className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {getPayoutTypeLabel(payout.payoutType)}
                </span>
              </td>

              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                    {getInitials(payout.beneficiaryName)}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {payout.beneficiaryName}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {payout.accountHolderName}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-5 py-4">
                <div>
                  <p className="flex items-center gap-1.5 text-sm font-medium text-slate-800">
                    <Building2 className="h-4 w-4 text-slate-400" />
                    {payout.bankName}
                    <span className="text-slate-400">
                      {payout.maskedAccountNumber}
                    </span>
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    IFSC: {payout.ifscCode}
                  </p>
                </div>
              </td>

              <td className="px-5 py-4 text-right">
                <p className="text-sm font-bold text-slate-900">
                  {formatIndianCurrency(payout.amount)}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Debit: {formatIndianCurrency(payout.totalDebit)}
                </p>
              </td>

              <td className="px-5 py-4">
                <p className="text-sm text-slate-600">
                  {payout.createdAt}
                </p>
              </td>

              <td className="px-5 py-4">
                <PayoutStatusBadge status={payout.status} />
              </td>

              <td className="px-5 py-4 text-right">
                <button
                  type="button"
                  onClick={() => onViewDetails(payout)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
                  aria-label={`View ${payout.payoutId} details`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}