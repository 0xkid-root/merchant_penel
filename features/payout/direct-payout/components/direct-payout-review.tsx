'use client'

import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  FileText,
  IndianRupee,
  Landmark,
  UserRound,
} from 'lucide-react'

import type { DirectPayoutFormValues } from './direct-payout-create-page'

import { formatIndianCurrency } from '../utils/direct-payout.utils'

interface DirectPayoutReviewProps {
  values: DirectPayoutFormValues
  onBack: () => void
  onContinue: () => void
}

function maskAccountNumber(accountNumber: string) {
  if (accountNumber.length <= 4) return accountNumber

  return `XXXXXX${accountNumber.slice(-4)}`
}

export default function DirectPayoutReview({
  values,
  onBack,
  onContinue,
}: DirectPayoutReviewProps) {
  const amount = Number(values.amount)

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-5 lg:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
            <CheckCircle2 className="h-5 w-5 text-indigo-600" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Review Direct Payout
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Confirm bank account and payout details before OTP verification.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 px-5 py-6 lg:px-6">
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                Total payout amount
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {formatIndianCurrency(amount)}
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
              <IndianRupee className="h-5 w-5 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
            <UserRound className="h-4 w-4 text-slate-500" />

            <h3 className="text-sm font-semibold text-slate-900">
              Account Holder Details
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
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
                {maskAccountNumber(values.accountNumber)}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
            <Landmark className="h-4 w-4 text-slate-500" />

            <h3 className="text-sm font-semibold text-slate-900">
              Bank Details
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Bank Name
              </p>

              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                <Building2 className="h-4 w-4 text-slate-400" />
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
                Direct Payout
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
            <FileText className="h-4 w-4 text-slate-500" />

            <h3 className="text-sm font-semibold text-slate-900">
              Payout Information
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Payout Amount
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                {formatIndianCurrency(amount)}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Remarks
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {values.remarks || 'No remarks added'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" />

          <p className="text-sm leading-6 text-amber-800">
            Please verify the account number, IFSC code, and amount carefully.
            After OTP verification, this payout request will be submitted.
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Edit Details
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Continue to OTP Verification
        </button>
      </div>
    </div>
  )
}