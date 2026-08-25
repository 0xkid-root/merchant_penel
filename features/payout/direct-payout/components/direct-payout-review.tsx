'use client'

import {
  ArrowLeft,
  ArrowRight,
  Landmark,
  UserRound,
  WalletCards,
} from 'lucide-react'

import type { DirectPayoutFormData } from '../schema/direct-payout.schema'
import { formatCurrency } from '@/lib/utils/formatCurrency'

interface DirectPayoutReviewProps {
  values: DirectPayoutFormData
  onBack: () => void
  onContinue: () => void
}

export default function DirectPayoutReview({
  values,
  onBack,
  onContinue,
}: DirectPayoutReviewProps) {
  const amount = Number(values.amount)

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-7">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
            <WalletCards className="h-5 w-5 text-indigo-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Review Direct Payout
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Confirm bank account and payout details before OTP verification.
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 bg-indigo-50/60 px-5 py-5 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
            Total Payout Amount
          </p>

          <div className="mt-2 flex items-center justify-between gap-4">
            <p className="text-3xl font-bold text-slate-900">
              {formatCurrency(amount)}
            </p>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
              <span className="text-xl font-bold text-indigo-600">₹</span>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-200">
          <section className="px-5 py-6 sm:px-6">
            <div className="flex items-center gap-2">
              <UserRound className="h-4 w-4 text-indigo-600" />

              <h3 className="text-sm font-bold text-slate-900">
                Account Holder Details
              </h3>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Account Holder Name
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {values.accountHolderName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Account Number
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  XXXXXX{values.accountNumber.slice(-4)}
                </p>
              </div>
            </div>
          </section>

          <section className="px-5 py-6 sm:px-6">
            <div className="flex items-center gap-2">
              <Landmark className="h-4 w-4 text-indigo-600" />

              <h3 className="text-sm font-bold text-slate-900">
                Bank Details
              </h3>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Bank Name
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {values.bankName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Branch Name
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {values.branchName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  IFSC Code
                </p>

                <p className="mt-1 text-sm font-semibold uppercase text-slate-900">
                  {values.ifscCode}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Payout Type
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  Direct Bank Transfer
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Payment Mode
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {values.paymentMode}
                </p>
              </div>
            </div>
          </section>

          {values.remarks ? (
            <section className="px-5 py-4 sm:px-6">
              <h3 className="text-sm font-bold text-slate-900">
                Remarks
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {values.remarks}
              </p>
            </section>
          ) : null}
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50/60 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Edit
          </button>

          <button
            type="button"
            onClick={onContinue}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Continue to OTP
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>


  )
}
