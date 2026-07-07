'use client'

import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  FileSpreadsheet,
  Plus,
} from 'lucide-react'
import { toast } from 'sonner'

import { PrimaryButton } from '@/components/buttons/primary-button'
import { SecondaryButton } from '@/components/buttons/secondary-button'

interface BulkPayoutResultProps {
  batchId: string
  fileName: string
  totalRecords: number
  totalAmount: number
  onCreateAnother: () => void
  onBackToHistory: () => void
}

function formatIndianCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export default function BulkPayoutResult({
  batchId,
  fileName,
  totalRecords,
  totalAmount,
  onCreateAnother,
  onBackToHistory,
}: BulkPayoutResultProps) {
  const handleCopyBatchId = async () => {
    try {
      await navigator.clipboard.writeText(batchId)
      toast.success('Batch ID copied to clipboard')
    } catch {
      toast.error('Unable to copy batch ID')
    }
  }

  return (
    <div className="mx-auto max-w-3xl py-4 text-center sm:py-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
        <CheckCircle2 className="h-9 w-9 text-emerald-600" />
      </div>

      <p className="mt-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
        Submitted Successfully
      </p>

      <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
        Bulk Payout Submitted Successfully
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
        Your bulk payout batch has been submitted successfully and is ready for processing.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white text-left">
        <div className="bg-slate-50 px-5 py-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Batch Summary
          </p>
        </div>

        <div className="divide-y divide-slate-100 px-5 sm:px-6">
          <div className="flex items-center justify-between gap-5 py-4">
            <span className="text-sm text-slate-500">Uploaded File</span>

            <div className="flex min-w-0 items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 shrink-0 text-indigo-600" />

              <span
                title={fileName}
                className="max-w-[220px] truncate text-right text-sm font-semibold text-slate-900 sm:max-w-[320px]"
              >
                {fileName}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-5 py-4">
            <span className="text-sm text-slate-500">Total Beneficiaries</span>

            <span className="text-lg font-bold text-slate-900">
              {totalRecords}
            </span>
          </div>

          <div className="flex items-center justify-between gap-5 py-4">
            <span className="text-sm text-slate-500">Total Payout Amount</span>

            <span className="text-lg font-bold text-slate-900">
              {formatIndianCurrency(totalAmount)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-5 py-4">
            <span className="text-sm text-slate-500">Batch Reference ID</span>

            <div className="flex items-center gap-1">
              <span className="font-mono text-sm font-semibold text-indigo-600">
                {batchId}
              </span>

              <button
                type="button"
                onClick={handleCopyBatchId}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600"
                aria-label="Copy batch ID"
                title="Copy batch ID"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <PrimaryButton onClick={onCreateAnother}>
          <Plus className="h-4 w-4" />
          Create Another Batch
        </PrimaryButton>

        <SecondaryButton onClick={onBackToHistory}>
          <ArrowLeft className="h-4 w-4" />
          Bulk Payout History
        </SecondaryButton>
      </div>
    </div>
  )
}