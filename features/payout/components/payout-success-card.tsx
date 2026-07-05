'use client'

import {
ArrowLeft,
CheckCircle2,
Copy,
FileText,
Plus,
} from 'lucide-react'
import { toast } from 'sonner'

interface PayoutSuccessCardProps {
title?: string
description?: string
payoutId: string
amount: number
recipientLabel?: string
recipientName: string
onViewDetails?: () => void
onMakeAnotherPayout?: () => void
onBackToHistory?: () => void
}

export default function PayoutSuccessCard({
title = 'Payout Successful',
description = 'Your payout has been submitted successfully.',
payoutId,
amount,
recipientLabel = 'Beneficiary',
recipientName,
onViewDetails,
onMakeAnotherPayout,
onBackToHistory,
}: PayoutSuccessCardProps) {
const formattedAmount = new Intl.NumberFormat('en-IN', {
style: 'currency',
currency: 'INR',
minimumFractionDigits: 2,
maximumFractionDigits: 2,
}).format(amount)

const handleCopyPayoutId = async () => {
try {
await navigator.clipboard.writeText(payoutId)
toast.success('Payout ID copied to clipboard')
} catch {
toast.error('Unable to copy payout ID')
}
}

return ( <div className="mx-auto max-w-3xl py-4 text-center sm:py-8"> <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100"> <CheckCircle2 className="h-9 w-9 text-emerald-600" /> </div>

  <p className="mt-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
    Success
  </p>

  <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
    {title}
  </h1>

  <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
    {description}
  </p>

  <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white text-left">
    <div className="bg-slate-50 px-5 py-4 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Payout summary
      </p>
    </div>

    <div className="divide-y divide-slate-100 px-5 sm:px-6">
      <div className="flex items-center justify-between gap-5 py-4">
        <span className="text-sm text-slate-500">
          {recipientLabel}
        </span>

        <span className="max-w-[65%] truncate text-right text-sm font-semibold text-slate-900">
          {recipientName}
        </span>
      </div>

      <div className="flex items-center justify-between gap-5 py-4">
        <span className="text-sm text-slate-500">Amount</span>

        <span className="text-lg font-bold text-slate-900">
          {formattedAmount}
        </span>
      </div>

      <div className="flex items-center justify-between gap-5 py-4">
        <span className="text-sm text-slate-500">
          Payout reference ID
        </span>

        <div className="flex items-center gap-1">
          <span className="font-mono text-sm font-semibold text-indigo-600">
            {payoutId}
          </span>

          <button
            type="button"
            onClick={handleCopyPayoutId}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600"
            aria-label="Copy payout ID"
            title="Copy payout ID"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
    {onMakeAnotherPayout ? (
      <button
        type="button"
        onClick={onMakeAnotherPayout}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        <Plus className="h-4 w-4" />
        Create Another Payout
      </button>
    ) : null}

    {onBackToHistory ? (
      <button
        type="button"
        onClick={onBackToHistory}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        <ArrowLeft className="h-4 w-4" />
        Payout History
      </button>
    ) : null}

    {onViewDetails ? (
      <button
        type="button"
        onClick={onViewDetails}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        <FileText className="h-4 w-4" />
        View Details
      </button>
    ) : null}
  </div>
</div>


)
}
