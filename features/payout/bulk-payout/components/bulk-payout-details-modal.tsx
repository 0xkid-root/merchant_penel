'use client'

import {
  CheckCircle2,
  Clock3,
  Download,
  FileSpreadsheet,
  IndianRupee,
  X,
  XCircle,
} from 'lucide-react'

import { SecondaryButton } from '@/components/buttons/secondary-button'

import type { BulkPayoutSummary } from '../types/bulk-payout.types'

import { getStatusConfig } from '../utils/bulk-payout-utils'

interface BulkPayoutDetailsModalProps {
  batch: BulkPayoutSummary | null
  onClose: () => void
}

import { formatCurrency } from '@/lib/utils/formatCurrency'



export default function BulkPayoutDetailsModal({
  batch,
  onClose,
}: BulkPayoutDetailsModalProps) {
  if (!batch) return null

  const statusConfig = getStatusConfig(batch.status)
  const StatusIcon = statusConfig.icon

  const handleDownloadReport = () => {
    // API download integration will be added later.
    console.log('Download bulk payout report:', batch.bulkReferenceId)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-slate-950/40 p-0 backdrop-blur-[1px] sm:items-center sm:justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bulk-payout-details-title"
      onMouseDown={onClose}
    >
      <div
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:max-w-2xl sm:rounded-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Bulk payout batch
            </p>

            <h2
              id="bulk-payout-details-title"
              className="mt-1 text-lg font-bold text-slate-900"
            >
              Batch Details
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close batch details"
            title="Close"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 p-4 sm:p-4">
          <div
            className={`rounded-2xl border p-4 ${statusConfig.panelClass}`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  <StatusIcon className={`h-5 w-5 ${statusConfig.iconClass}`} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {batch.fileName}
                  </p>

                  <p className="mt-1 font-mono text-xs font-medium text-slate-500">
                    {batch.bulkReferenceId}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Created on {batch.createdAt}
                  </p>
                </div>
              </div>

              <span
                className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${statusConfig.badgeClass}`}
              >
                {statusConfig.label}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                  <FileSpreadsheet className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Total Records
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {batch.totalTransactions}
                  </p>
                </div>
                
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                  <IndianRupee className="h-5 w-5 text-indigo-600" />
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Total Amount
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {formatCurrency(batch.totalAmount)}
                  </p>
                </div>
              </div>
            </div>
          </div>



          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <SecondaryButton onClick={onClose}>
              Close
            </SecondaryButton>

            <SecondaryButton onClick={handleDownloadReport}>
              <Download className="h-4 w-4" />
              Download Report
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}