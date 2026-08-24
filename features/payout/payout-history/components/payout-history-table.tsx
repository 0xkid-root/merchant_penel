'use client'

import { Building2, Check, Copy, Eye } from 'lucide-react'

import type { PayoutHistoryTransaction } from '../types/payout-history.types'

import {
  getPayoutStatusLabel,
  getPayoutStatusStyles,
  maskAccountNumber,
} from '../../utils/payout.utils'

import { formatCurrency } from '@/lib/utils/formatCurrency'
import { formatDateTime } from '@/lib/utils/formatDate'

interface PayoutHistoryTableProps {
  transactions: PayoutHistoryTransaction[]
  copiedPayoutId: string | null
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
  if (!name) return '?'
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
}

export default function PayoutHistoryTable({
  transactions,
  copiedPayoutId,
  onCopyPayoutId,
}: PayoutHistoryTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1200px] border-collapse">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Transaction ID
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Beneficiary
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Bank Details
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Type
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
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 bg-white">
          {transactions.map((tx) => {
            const isCopied = copiedPayoutId === tx.transactionId

            return (
              <tr key={tx.id} className="transition hover:bg-slate-50/80">
                {/* Transaction ID */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <span
                      title={tx.transactionId}
                      className="text-sm font-semibold text-slate-700"
                    >
                      {getShortPayoutId(tx.transactionId)}
                    </span>
                    <button
                      type="button"
                      onClick={(event) => onCopyPayoutId(event, tx.transactionId)}
                      aria-label={`Copy ${tx.transactionId}`}
                      title={isCopied ? 'Copied' : 'Copy transaction ID'}
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

                {/* Beneficiary */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                      {getInitials(tx.beneficiaryName)}
                    </div>
                    <div className="min-w-0">
                      <p
                        title={tx.beneficiaryName}
                        className="max-w-[230px] truncate text-sm font-semibold text-slate-900"
                      >
                        {tx.beneficiaryName}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Bank Details */}
                <td className="px-5 py-4">
                  <p className="flex items-center whitespace-nowrap gap-1.5 text-sm font-medium text-slate-900">
                    <span>{tx.paymentMode || 'N/A'}</span>
                    <span className="text-slate-400">
                      {maskAccountNumber(tx.accountNumber)}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    IFSC: {tx.ifscCode}
                  </p>
                </td>

                {/* Type */}
                <td className="px-5 py-4">
                  <span className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                    {tx.payoutType}
                  </span>
                </td>

                {/* Amount */}
                <td className="px-5 py-4 text-right">
                  <p className="text-sm font-bold text-slate-900">
                    {formatCurrency(tx.amount)}
                  </p>
                </td>

                {/* Created At */}
                <td className="px-5 py-4 text-sm text-slate-600">
                  {formatDateTime(tx.createdAt)}
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getPayoutStatusStyles(
                      tx.payoutStatus
                    )}`}
                  >
                    {getPayoutStatusLabel(tx.payoutStatus)}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}