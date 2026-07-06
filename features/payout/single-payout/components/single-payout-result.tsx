'use client'

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Copy,
  ExternalLink,
  FileText,
  IndianRupee,
  Landmark,
  RotateCcw,
  XCircle,
} from 'lucide-react'

import { PrimaryButton } from '@/components/buttons/primary-button'
import { SecondaryButton } from '@/components/buttons/secondary-button'

import {
  formatIndianCurrency,
  formatPayoutDateTime,
} from '../data/single-payout-data'

import type {
  SinglePayoutBeneficiary,
  SinglePayoutResult,
} from '../types/single-payout.types'

interface SinglePayoutResultProps {
  result: SinglePayoutResult
  beneficiary: SinglePayoutBeneficiary
  amount: number
  remarks: string
  charges: number
  totalDebit: number
  onViewDetails: () => void
  onMakeAnotherPayout: () => void
  onBackToHistory: () => void
}

const RESULT_CONFIG = {
  success: {
    title: 'Payout Submitted Successfully',
    description:
      'Your payout request has been submitted successfully and will be processed shortly.',
    icon: CheckCircle2,
    iconWrapperClass: 'bg-emerald-100',
    iconClass: 'text-emerald-600',
    statusClass: 'bg-emerald-100 text-emerald-700',
    borderClass: 'border-emerald-200',
    backgroundClass: 'bg-emerald-50',
    statusLabel: 'Success',
  },
  pending: {
    title: 'Payout Is Being Processed',
    description:
      'Your payout request has been submitted and is currently being processed.',
    icon: Clock3,
    iconWrapperClass: 'bg-amber-100',
    iconClass: 'text-amber-600',
    statusClass: 'bg-amber-100 text-amber-700',
    borderClass: 'border-amber-200',
    backgroundClass: 'bg-amber-50',
    statusLabel: 'Processing',
  },
  failed: {
    title: 'Payout Could Not Be Completed',
    description:
      'Your payout request could not be completed. Please review the details and try again.',
    icon: XCircle,
    iconWrapperClass: 'bg-red-100',
    iconClass: 'text-red-600',
    statusClass: 'bg-red-100 text-red-700',
    borderClass: 'border-red-200',
    backgroundClass: 'bg-red-50',
    statusLabel: 'Failed',
  },
} as const

export default function SinglePayoutResult({
  result,
  beneficiary,
  amount,
  remarks,
  charges,
  totalDebit,
  onViewDetails,
  onMakeAnotherPayout,
  onBackToHistory,
}: SinglePayoutResultProps) {

  const config = RESULT_CONFIG[result.status as keyof typeof RESULT_CONFIG] || RESULT_CONFIG.success
  const StatusIcon = config.icon

  const handleCopyReference = async () => {
    if (!result.payoutId) return

    try {
      await navigator.clipboard.writeText(result.payoutId)
    } catch {
      // Clipboard permission can fail in some browsers.
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="overflow-hidden rounded-2xl border border-slate-150 bg-white">
        <div className={`${config.backgroundClass} border-b ${config.borderClass} px-4 p-2`}>
          <div className="flex flex-col items-center text-center">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl ${config.iconWrapperClass}`}
            >
              <StatusIcon className={`h-8 w-8 ${config.iconClass}`} />
            </div>

            <span
              className={`mt-5 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.statusClass}`}
            >
              {config.statusLabel}
            </span>

            <h1 className="mt-4 text-2xl font-bold text-slate-900">
              {config.title}
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
              {result.message || config.description}
            </p>
          </div>
        </div>

        <div className="space-y-6 p-6">
          {result.status !== 'failed' && (
            <div className=" p-3">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Payout Reference ID
                  </p>

                  <p className="mt-1 break-all text-sm font-bold tracking-wide text-slate-900">
                    {result.payoutId || 'Will be generated shortly'}
                  </p>
                </div>

                {result.payoutId && (
                  <button
                    type="button"
                    onClick={handleCopyReference}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </button>
                )}
              </div>

              {result.createdAt && (
                <p className="mt-4 border-t border-slate-200 pt-4 text-xs text-slate-500">
                  Submitted on {formatPayoutDateTime(result.createdAt)}
                </p>
              )}
            </div>
          )}

          {result.status === 'failed' && result.failureReason && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
              <p className="text-sm font-semibold text-red-900">
                Reason for failure
              </p>

              <p className="mt-2 text-sm leading-6 text-red-700">
                {result.failureReason}
              </p>
            </div>
          )}

          <div className='border-t border-slate-200'>
            <div className="mb-4 flex items-center gap-2 mt-4">
              <Landmark className="h-4 w-4 text-indigo-600" />

              <h2 className="text-sm font-semibold text-slate-900">
                Payout Details
              </h2>
            </div>

            <div className="overflow-hidden">
              <div className="grid grid-cols-1 gap-5 border-b border-slate-150 bg-white p-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Beneficiary Name
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {beneficiary.beneficiaryName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Bank Name
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {beneficiary.bankName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Account Number
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {beneficiary.maskedAccountNumber}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500">
                    IFSC Code
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {beneficiary.ifscCode}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-slate-150 bg-white px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                    <IndianRupee className="h-4 w-4 text-indigo-600" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Payout Amount
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Amount sent to beneficiary
                    </p>
                  </div>
                </div>

                <p className="text-base font-bold text-slate-900">
                  {formatIndianCurrency(amount)}
                </p>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Payout Charges
                  </p>
                </div>

                <p className="text-sm font-semibold text-slate-900">
                  {formatIndianCurrency(charges)}
                </p>
              </div>

              <div className="flex items-center justify-between  px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-indigo-900">
                    Total Wallet Debit
                  </p>

                  <p className="mt-0.5 text-xs text-indigo-600">
                    Total amount deducted from your wallet
                  </p>
                </div>

                <p className="text-lg font-bold text-indigo-700">
                  {formatIndianCurrency(totalDebit)}
                </p>
              </div>
            </div>
          </div>

          {remarks && (
            <div className="border-t border-slate-200 pt-4">
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-indigo-600" />

                <h2 className="text-sm font-semibold text-slate-900">
                  Remarks
                </h2>
              </div>

              <div className="rounded-xl px-5 py-4">
                <p className="text-sm leading-6 text-slate-700">{remarks}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <SecondaryButton onClick={onBackToHistory}>
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to Payout History
            </SecondaryButton>

            <div className="flex flex-col gap-3 sm:flex-row">
              <SecondaryButton onClick={onViewDetails}>
                <ExternalLink className="h-4 w-4" />
                View Payout Details
              </SecondaryButton>

              <PrimaryButton onClick={onMakeAnotherPayout}>
                <RotateCcw className="h-4 w-4" />
                Make Another Payout
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}