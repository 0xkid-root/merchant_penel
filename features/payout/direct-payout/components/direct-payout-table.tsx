'use client'

import { Building2, Check, Copy, Eye } from 'lucide-react'

import type {
  DirectPayoutItem,
  DirectPayoutStatus,
} from '../types/direct-payout.types'

interface DirectPayoutTableProps {
  payouts: DirectPayoutItem[]
  copiedPayoutId: string | null
  onViewDetails: (payout: DirectPayoutItem) => void
  onCopyPayoutId: (
    event: React.MouseEvent<HTMLButtonElement>,
    payoutId: string,
  ) => void
}

function formatIndianCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

function getShortPayoutId(payoutId: string) {
  if (payoutId.length <= 10) return payoutId

  return `${payoutId.slice(0, 3)}...${payoutId.slice(-3)}`
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
}

function getStatusStyles(status: DirectPayoutStatus) {
  if (status === 'success') {
    return 'border border-emerald-200 bg-emerald-50 text-emerald-700'
  }

  if (status === 'pending') {
    return 'border border-amber-200 bg-amber-50 text-amber-700'
  }

  return 'border border-red-200 bg-red-50 text-red-700'
}

function getStatusLabel(status: DirectPayoutStatus) {
  if (status === 'success') return 'Success'
  if (status === 'pending') return 'Pending'
  return 'Failed'
}

export default function DirectPayoutTable({
  payouts,
  copiedPayoutId,
  onViewDetails,
  onCopyPayoutId,
}: DirectPayoutTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1100px] border-collapse">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Payout ID
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Account Holder
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
          {payouts.map((payout) => {
            const isCopied = copiedPayoutId === payout.payoutId

            return (
              <tr
                key={payout.id}
                className="transition hover:bg-slate-50/80"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onViewDetails(payout)}
                      title={payout.payoutId}
                      className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline"
                    >
                      {getShortPayoutId(payout.payoutId)}
                    </button>

                    <button
                      type="button"
                      onClick={(event) =>
                        onCopyPayoutId(event, payout.payoutId)
                      }
                      aria-label={`Copy ${payout.payoutId}`}
                      title={isCopied ? 'Copied' : 'Copy payout ID'}
                      className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600"
                    >
                      {isCopied ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                      {getInitials(payout.accountHolderName)}
                    </div>

                    <div className="min-w-0">
                      <p
                        title={payout.accountHolderName}
                        className="max-w-[230px] truncate text-sm font-semibold text-slate-900"
                      >
                        {payout.accountHolderName}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Direct bank transfer
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <p className="flex items-center whitespace-nowrap gap-1.5 text-sm font-medium text-slate-900">
                    <span>{payout.bankName}</span>

                    <span className="text-slate-400">
                      {payout.maskedAccountNumber}
                    </span>
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    IFSC: {payout.ifscCode}
                  </p>
                </td>

                <td className="px-5 py-4 text-right">
                  <p className="text-sm font-bold text-slate-900">
                    {formatIndianCurrency(payout.amount)}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Debit: {formatIndianCurrency(payout.totalDebit)}
                  </p>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {payout.createdAt}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyles(
                      payout.status,
                    )}`}
                  >
                    {getStatusLabel(payout.status)}
                  </span>
                </td>

                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => onViewDetails(payout)}
                    aria-label={`View details for ${payout.payoutId}`}
                    title="View payout details"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}