'use client'

import { X } from 'lucide-react'

import type { DirectPayoutItem } from '../types/direct-payout.types'

import {
  formatIndianCurrency,
  getDirectPayoutStatusLabel,
  getDirectPayoutStatusStyles,
} from '../utils/direct-payout.utils'

interface DirectPayoutDetailsModalProps {
  payout: DirectPayoutItem | null
  onClose: () => void
}

export default function DirectPayoutDetailsModal({
  payout,
  onClose,
}: DirectPayoutDetailsModalProps) {
  if (!payout) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-slate-950/40 p-4 sm:items-center sm:justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="direct-payout-details-title"
    >
      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
              Direct Payout Details
            </p>

            <h3
              id="direct-payout-details-title"
              className="mt-1 text-lg font-bold text-slate-900"
            >
              {payout.payoutId}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close direct payout details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 px-6 py-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Account Holder
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {payout.accountHolderName}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Payout Status
              </p>

              <div className="mt-1">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getDirectPayoutStatusStyles(
                    payout.status,
                  )}`}
                >
                  {getDirectPayoutStatusLabel(payout.status)}
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Bank Name
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {payout.bankName}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Bank Account
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {payout.maskedAccountNumber}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                IFSC Code
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {payout.ifscCode}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Created At
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {payout.createdAt}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Payout Amount
              </p>

              <p className="mt-1 text-sm font-bold text-slate-900">
                {formatIndianCurrency(payout.amount)}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Total Debit
              </p>

              <p className="mt-1 text-sm font-bold text-indigo-600">
                {formatIndianCurrency(payout.totalDebit)}
              </p>
            </div>
          </div>

          {payout.remarks ? (
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">
                Remarks
              </p>

              <p className="mt-1 text-sm text-slate-700">
                {payout.remarks}
              </p>
            </div>
          ) : null}
        </div>

        <div className="flex justify-end border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}