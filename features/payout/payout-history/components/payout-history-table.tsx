'use client'

import { Building2, Check, ChevronRight, Copy } from 'lucide-react'
import { useState } from 'react'

import { getShortPayoutId, getPayoutTypeLabel, getInitials } from '../utils/payout-history.utils'

import PayoutStatusBadge from './payout-status-badge'

import type { PayoutHistoryItem } from '../types/payout-history.types'
import { toast } from 'sonner'

interface PayoutHistoryTableProps {
  payouts: PayoutHistoryItem[]
  onViewDetails: (payout: PayoutHistoryItem) => void
}

function formatIndianCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export default function PayoutHistoryTable({
  payouts,
  onViewDetails,
}: PayoutHistoryTableProps) {

  const [copiedPayoutId, setCopiedPayoutId] = useState<string | null>(null)

  const handleCopyPayoutId = async (
    event: React.MouseEvent<HTMLButtonElement>,
    payoutId: string,
  ) => {
    event.stopPropagation()

    try {
      await navigator.clipboard.writeText(payoutId)

      setCopiedPayoutId(payoutId)

      toast.success('Payout ID copied to clipboard')

      window.setTimeout(() => {
        setCopiedPayoutId(null)
      }, 1800)
    } catch {
      toast.error('Unable to copy payout ID')
    }
  }

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
      <table className="w-full min-w-[1120px] border-collapse">
        <thead>
          <tr className="border-y border-slate-200 bg-slate-50">
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
          {payouts.map((payout) => {
            const isCopied = copiedPayoutId === payout.payoutId

            return (
              <tr
                key={payout.id}
                className="border-b border-slate-200 transition hover:bg-slate-50"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onViewDetails(payout)}
                      className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700 hover:underline"
                      title={payout.payoutId}
                    >
                      {getShortPayoutId(payout.payoutId)}
                    </button>

                    <button
                      type="button"
                      onClick={(event) =>
                        handleCopyPayoutId(event, payout.payoutId)
                      }
                      aria-label={`Copy ${payout.payoutId}`}
                      title={isCopied ? 'Copied' : 'Copy payout ID'}
                      className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600"
                    >
                      {isCopied ? (
                        <Check className="h-3.5 w-3.5 text-green-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <span className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                    {getPayoutTypeLabel(payout.payoutType)}
                  </span>
                </td>

                <td className="w-[250px] px-4 py-3">
                  <div className="flex items-center gap-2">
                    {/* <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                      {getInitials(payout.beneficiaryName)}
                    </div> */}

                    <p
                      title={payout.beneficiaryName}
                      className="max-w-[190px] truncate text-sm font-medium text-slate-900"
                    >
                      {payout.beneficiaryName}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-slate-900">
                    {/* <Building2 className="h-4 w-4 shrink-0 text-slate-400" /> */}
                    {payout.bankName}
                    <span className="text-slate-400">
                      {payout.maskedAccountNumber}
                    </span>
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    IFSC: {payout.ifscCode}
                  </p>
                </td>

                <td className="px-4 py-3">
                  <p className="whitespace-nowrap text-sm font-semibold text-slate-900">
                    {formatIndianCurrency(payout.amount)}
                  </p>

                  <p className="mt-1 whitespace-nowrap text-xs text-slate-500">
                    Debit: {formatIndianCurrency(payout.totalDebit)}
                  </p>
                </td>

                <td className="px-4 py-3">
                  <p className="whitespace-nowrap text-sm text-slate-600">
                    {payout.createdAt}
                  </p>
                </td>

                <td className="px-4 py-3">
                  <PayoutStatusBadge status={payout.status} />
                </td>

                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => onViewDetails(payout)}
                    aria-label={`View details for ${payout.payoutId}`}
                    title="View payout details"
                    className="rounded-lg p-2 transition hover:bg-slate-100"
                  >
                    <ChevronRight className="h-4 w-4 text-slate-500" />
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