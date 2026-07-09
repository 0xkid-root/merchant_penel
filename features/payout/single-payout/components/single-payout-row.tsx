'use client'

import { MoreVertical } from 'lucide-react'

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
  return (
    <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50">
      <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-indigo-600">
        {transaction.payoutId}
      </td>

      <td className="min-w-[190px] px-4 py-4">
        <div className="flex items-center gap-3">
          <BeneficiaryAvatar name={transaction.beneficiaryName} />

          <p className="text-sm font-medium text-slate-900">
            {transaction.beneficiaryName}
          </p>
        </div>
      </td>

      <td className="min-w-[230px] px-4 py-4">
        <p className="whitespace-nowrap text-sm font-medium text-slate-900">
          {transaction.bankName}{' '}
          <span className="text-slate-500">
            •••• {transaction.maskedAccountNumber.slice(-4)}
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
        <PayoutStatusBadge status={transaction.status} />
      </td>

      <td className="px-4 py-4 text-center">
        <button
          type="button"
          onClick={() => onViewDetails(transaction.payoutId)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label={`View payout ${transaction.payoutId}`}
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </td>
    </tr>
  )
}