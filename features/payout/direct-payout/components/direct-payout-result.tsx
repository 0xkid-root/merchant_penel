// features/payout/direct-payout/components/direct-payout-result.tsx

'use client'

import Link from 'next/link'
import {
  CheckCircle2,
  Copy,
  FilePlus2,
  List,
  Landmark,
} from 'lucide-react'
import { toast } from 'sonner'

import type { DirectPayoutFormValues } from './direct-payout-create-page'
import { formatIndianCurrency } from '../utils/direct-payout.utils'

interface DirectPayoutResultProps {
  values: DirectPayoutFormValues
  payoutId: string
  onCreateAnother: () => void
}

export default function DirectPayoutResult({
  values,
  payoutId,
  onCreateAnother,
}: DirectPayoutResultProps) {
  const handleCopyPayoutId = async () => {
    try {
      await navigator.clipboard.writeText(payoutId)
      toast.success('Payout ID copied to clipboard')
    } catch {
      toast.error('Unable to copy payout ID')
    }
  }

  const amount = Number(values.amount)

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="px-5 py-8 text-center lg:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-9 w-9 text-emerald-600" />
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-900">
          Direct Payout Submitted Successfully
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          Your direct payout request has been submitted. You can track its
          status from the Direct Payout list.
        </p>

        <div className="mx-auto mt-6 max-w-md rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Payout Amount
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {formatIndianCurrency(amount)}
          </p>
        </div>
      </div>

      <div className="border-y border-slate-200 bg-slate-50/60 px-5 py-5 lg:px-6">
        <div className="mx-auto max-w-xl">
          <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Payout Reference ID
              </p>

              <p className="mt-1 text-sm font-bold text-slate-900">
                {payoutId}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyPayoutId}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-indigo-600"
              aria-label="Copy payout ID"
              title="Copy payout ID"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium text-slate-500">
                Account Holder
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {values.accountHolderName}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium text-slate-500">
                Bank Account
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                XXXXXX{values.accountNumber.slice(-4)}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium text-slate-500">
                Bank Name
              </p>

              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                <Landmark className="h-4 w-4 text-slate-400" />
                {values.bankName}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium text-slate-500">
                IFSC Code
              </p>

              <p className="mt-1 text-sm font-semibold uppercase text-slate-900">
                {values.ifscCode}
              </p>
            </div>
          </div>

          {values.remarks ? (
            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium text-slate-500">Remarks</p>

              <p className="mt-1 text-sm text-slate-700">
                {values.remarks}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:justify-end lg:px-6">
        <Link
          href="/payout/direct"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <List className="h-4 w-4" />
          View Direct Payouts
        </Link>

        <button
          type="button"
          onClick={onCreateAnother}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <FilePlus2 className="h-4 w-4" />
          Create Another Payout
        </button>
      </div>
    </div>
  )
}