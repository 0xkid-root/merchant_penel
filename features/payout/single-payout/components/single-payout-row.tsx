'use client'

import { useState } from 'react'
import { MoreVertical, Copy, Check, Eye } from 'lucide-react'
import { toast } from 'sonner'

import { formatTransactionId } from '@/lib/utils/maskTransactionId'

import {
  formatIndianCurrency,
  formatPayoutDateTime,
} from '../data/single-payout-data'

import type { SinglePayoutTransaction } from '../types/single-payout.types'

import BeneficiaryAvatar from './beneficiary-avatar'
import PayoutStatusBadge from './payout-status-badge'

interface SinglePayoutRowProps {
  transaction: SinglePayoutTransaction
  onViewDetails: (payoutId: string) => void
}

export default function SinglePayoutRow({
  transaction,
  onViewDetails,
}: SinglePayoutRowProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id)
    setCopiedId(id)
    toast.success('Transaction ID copied')
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50">
      <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-indigo-600">
        <div className="flex items-center gap-2">
          <span
            className="cursor-pointer hover:text-indigo-800 transition-colors"
            onClick={() => handleCopyId(transaction.transactionId)}
            title="Click to copy full ID"
          >
            {formatTransactionId(transaction.transactionId)}
          </span>
          <button
            type="button"
            onClick={() => handleCopyId(transaction.transactionId)}
            className="text-slate-400 hover:text-indigo-600 transition-colors relative group"
            aria-label={`Copy transaction ID ${transaction.transactionId}`}
          >
            {copiedId === transaction.transactionId ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copiedId === transaction.transactionId && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-sm z-10">
                Copied!
              </span>
            )}
          </button>
        </div>
      </td>

      <td className="min-w-[190px] px-4 py-4">
        <div className="flex items-center gap-3">
          <BeneficiaryAvatar name={transaction.beneficiaryName || ''} />

          <p className="text-sm font-medium text-slate-900">
            {transaction.beneficiaryName}
          </p>
        </div>
      </td>

      <td className="min-w-[230px] px-4 py-4">
        <p className="whitespace-nowrap text-sm font-medium text-slate-900">
          <span className="text-slate-500">
            A/c: {transaction.accountNumber ? `•••• ${transaction.accountNumber.slice(-4)}` : 'N/A'}
          </span>
        </p>

        <p className="mt-1 text-xs text-slate-500">
          IFSC: {transaction.ifscCode}
        </p>
      </td>

      <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-900">
        {formatIndianCurrency(transaction.amount)}
      </td>

      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
        {formatPayoutDateTime(transaction.createdAt)}
      </td>

      <td className="whitespace-nowrap px-4 py-4">
        <PayoutStatusBadge status={transaction.payoutStatus} />
      </td>

      <td className="px-4 py-4 text-center">
        <button
          type="button"
          onClick={() => onViewDetails(transaction.transactionId)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label={`View payout ${transaction.transactionId}`}
        >
          <Eye className="h-4 w-4" />
        </button>
      </td>
    </tr>
  )
}