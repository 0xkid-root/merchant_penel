'use client'

import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react'

interface PayoutFailedCardProps {
  message?: string
  onTryAgain?: () => void
  onBackToHistory?: () => void
}

export default function PayoutFailedCard({
  message = 'We could not process this payout. No amount has been debited from your wallet.',
  onTryAgain,
  onBackToHistory,
}: PayoutFailedCardProps) {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <AlertCircle className="h-9 w-9 text-red-600" />
      </div>

      <h1 className="mt-5 text-2xl font-bold text-slate-900">
        Payout Failed
      </h1>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {message}
      </p>

      <div className="mt-7 rounded-xl border border-red-100 bg-red-50 p-4 text-left">
        <p className="text-sm font-semibold text-red-700">
          What you can do
        </p>

        <p className="mt-1 text-sm leading-6 text-red-600">
          Check beneficiary bank details, wallet balance, and try again. If the
          issue continues, contact support.
        </p>
      </div>

      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onTryAgain}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>

        <button
          type="button"
          onClick={onBackToHistory}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Payout History
        </button>
      </div>
    </div>
  )
}