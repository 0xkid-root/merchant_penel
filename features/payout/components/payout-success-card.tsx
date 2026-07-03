'use client'

import { CheckCircle2, FileText, Plus, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PayoutSuccessCardProps {
  payoutId: string
  amount: number
  beneficiaryName: string
  onMakeAnotherPayout?: () => void
  onBackToHistory?: () => void
}

export default function PayoutSuccessCard({
  payoutId,
  amount,
  beneficiaryName,
  onMakeAnotherPayout,
  onBackToHistory,
}: PayoutSuccessCardProps) {
  const router = useRouter()

  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount)

  const handleViewDetails = () => {
    router.push(`/payouts/${payoutId}`)
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
        <CheckCircle2 className="h-9 w-9 text-emerald-600" />
      </div>

      <h1 className="mt-5 text-2xl font-bold text-slate-900">
        Payout Successful
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        Your payout has been submitted successfully.
      </p>

      <div className="mt-7 rounded-xl border border-slate-200 bg-slate-50 p-5 text-left">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <span className="text-sm text-slate-500">Beneficiary</span>
          <span className="text-sm font-semibold text-slate-900">
            {beneficiaryName}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-slate-200 py-4">
          <span className="text-sm text-slate-500">Amount</span>
          <span className="text-base font-bold text-slate-900">
            {formattedAmount}
          </span>
        </div>

        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-slate-500">Payout ID</span>
          <span className="font-mono text-sm font-semibold text-indigo-600">
            {payoutId}
          </span>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={handleViewDetails}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <FileText className="h-4 w-4" />
          View Details
        </button>

        <button
          type="button"
          onClick={onMakeAnotherPayout}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Another Payout
        </button>

        <button
          type="button"
          onClick={onBackToHistory}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Payout History
        </button>
      </div>
    </div>
  )
}