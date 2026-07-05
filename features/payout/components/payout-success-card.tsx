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

  return (<div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8"> <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100"> <CheckCircle2 className="h-9 w-9 text-emerald-600" /> </div>


    <h1 className="mt-5 text-2xl font-bold text-slate-900">
      {title}
    </h1>

    <p className="mt-2 text-sm text-slate-500">
      {description}
    </p>

    <div className="mt-7 rounded-xl border border-slate-200 bg-slate-50 p-5 text-left">
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <span className="text-sm text-slate-500">
          {recipientLabel}
        </span>

        <span className="max-w-[65%] truncate text-right text-sm font-semibold text-slate-900">
          {recipientName}
        </span>
      </div>

      <div className="flex items-center justify-between border-b border-slate-200 py-4">
        <span className="text-sm text-slate-500">Amount</span>

        <span className="text-base font-bold text-slate-900">
          {formattedAmount}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 pt-4">
        <span className="text-sm text-slate-500">Payout ID</span>

        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-semibold text-indigo-600">
            {payoutId}
          </span>

          <button
            type="button"
            onClick={handleCopyPayoutId}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-indigo-600"
            aria-label="Copy payout ID"
            title="Copy payout ID"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
      {onViewDetails ? (
        <button
          type="button"
          onClick={onViewDetails}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <FileText className="h-4 w-4" />
          View Details
        </button>
      ) : null}

      {onMakeAnotherPayout ? (
        <button
          type="button"
          onClick={onMakeAnotherPayout}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Another Payout
        </button>
      ) : null}

      {onBackToHistory ? (
        <button
          type="button"
          onClick={onBackToHistory}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Payout History
        </button>
      ) : null}
    </div>
  </div>


  )
}
