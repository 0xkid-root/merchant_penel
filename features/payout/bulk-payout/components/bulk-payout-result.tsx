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
import { formatCurrency } from '@/lib/utils/formatCurrency'

import type { BulkPayoutPreviewResponse, BulkPayoutResultData } from '../types/bulk-payout.types'
import { AlertCircle } from 'lucide-react'

interface BulkPayoutResultProps {
  result: BulkPayoutResultData | null
  preview: BulkPayoutPreviewResponse | null
  onCreateAnother: () => void
  onBackToHistory: () => void
}
export default function BulkPayoutResult({
  result,
  preview,
  onCreateAnother,
  onBackToHistory,
}: BulkPayoutResultProps) {
  const handleCopyBatchId = async () => {
    if (!result?.bulkReferenceId) return
    try {
      await navigator.clipboard.writeText(result.bulkReferenceId)
      toast.success('Batch ID copied to clipboard')
    } catch {
      toast.error('Unable to copy batch ID')
    }
  }

  if (!result || !preview) return null

  const isSuccess = result.status === 'SUCCESS' || result.status === 'PROCESSING' || result.status === 'PENDING'

  return (
    <div className="mx-auto max-w-3xl py-4 text-center sm:py-8">
      <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${isSuccess ? 'bg-emerald-100' : 'bg-red-100'}`}>
        {isSuccess ? (
          <CheckCircle2 className="h-9 w-9 text-emerald-600" />
        ) : (
          <AlertCircle className="h-9 w-9 text-red-600" />
        )}
      </div>

      <p className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${isSuccess ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
        {isSuccess ? 'Submitted Successfully' : 'Submission Failed'}
      </p>

      <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
        {isSuccess ? 'Bulk Payout Submitted Successfully' : 'Bulk Payout Failed'}
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
        {result.message}
      </p>

      {!isSuccess && result.failureReason && (
        <p className="mx-auto mt-2 max-w-xl text-sm font-semibold text-red-600">
          Reason: {result.failureReason}
        </p>
      )}

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
                title={preview.fileName}
                className="max-w-[220px] truncate text-right text-sm font-semibold text-slate-900 sm:max-w-[320px]"
              >
                {preview.fileName}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-5 py-4">
            <span className="text-sm text-slate-500">Total Beneficiaries</span>

            <span className="text-lg font-bold text-slate-900">
              {result.totalTransactions}
            </span>
          </div>

          <div className="flex items-center justify-between gap-5 py-4">
            <span className="text-sm text-slate-500">Total Payout Amount</span>

            <span className="text-lg font-bold text-slate-900">
              {formatCurrency(preview.totalAmount)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-5 py-4">
            <span className="text-sm text-slate-500">Batch Reference ID</span>

            <div className="flex items-center gap-1">
              <span className="font-mono text-sm font-semibold text-indigo-600">
                {result.bulkReferenceId}
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