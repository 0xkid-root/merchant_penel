'use client'

import { Building2, Check, Copy, Eye } from 'lucide-react'

import type {
  DirectPayoutTransaction,
  DirectPayoutStatus,
} from '../types/direct-payout.types'

import {
  getPayoutStatusLabel,
  getPayoutStatusStyles,
  maskAccountNumber,
} from '../../utils/payout.utils'

import { formatCurrency } from '@/lib/utils/formatCurrency'
import { formatDateTime } from '@/lib/utils/formatDate'

interface DirectPayoutTableProps {
  payouts: DirectPayoutTransaction[]
  copiedPayoutId: string | null
  onViewDetails: (payout: DirectPayoutTransaction) => void
  onCopyPayoutId: (
    event: React.MouseEvent<HTMLButtonElement>,
    payoutId: string,
  ) => void
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
            const isCopied = copiedPayoutId === payout.transactionId

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
                      title={payout.transactionId}
                      className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline"
                    >
                      {getShortPayoutId(payout.transactionId)}
                    </button>

                    <button
                      type="button"
                      onClick={(event) =>
                        onCopyPayoutId(event, payout.transactionId)
                      }
                      aria-label={`Copy ${payout.transactionId}`}
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
                      {getInitials(payout.beneficiaryName)}
                    </div>

                    <div className="min-w-0">
                      <p
                        title={payout.beneficiaryName}
                        className="max-w-[230px] truncate text-sm font-semibold text-slate-900"
                      >
                        {payout.beneficiaryName}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Direct bank transfer
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <p className="flex items-center whitespace-nowrap gap-1.5 text-sm font-medium text-slate-900">
                    <span>{payout.paymentMode}</span>

                    <span className="text-slate-400">
                      {maskAccountNumber(payout.accountNumber)}
                    </span>
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    IFSC: {payout.ifscCode}
                  </p>
                </td>

                <td className="px-5 py-4 text-right">
                  <p className="text-sm font-bold text-slate-900">
                    {formatCurrency(payout.amount)}
                  </p>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {formatDateTime(payout.createdAt)}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getPayoutStatusStyles(
                      payout.payoutStatus
                    )}`}
                  >
                    {getPayoutStatusLabel(payout.payoutStatus)}
                  </span>
                </td>

                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => onViewDetails(payout)}
                    aria-label={`View details for ${payout.transactionId}`}
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