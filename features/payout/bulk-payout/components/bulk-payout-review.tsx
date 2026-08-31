'use client'

import {
    AlertCircle,
    ArrowLeft,
    CheckCircle2,
    FileSpreadsheet,
    IndianRupee,
    Landmark,
    ShieldCheck,
} from 'lucide-react'

import { PrimaryButton } from '@/components/buttons/primary-button'
import { SecondaryButton } from '@/components/buttons/secondary-button'
import { formatCurrency } from '@/lib/utils/formatCurrency'

import type { BulkPayoutPreviewResponse } from '../types/bulk-payout.types'

interface BulkPayoutReviewProps {
    preview: BulkPayoutPreviewResponse | null
    onBack: () => void
    onContinue: () => void
    error?: string | null
}

export default function BulkPayoutReview({
    preview,
    onBack,
    onContinue,
    error,
}: BulkPayoutReviewProps) {
    if (!preview) return null

    return (
        <div className="mx-auto max-w-5xl space-y-6">
            {error ? (
                <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                    <div className="flex gap-3">
                        <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                        <p className="text-sm font-medium text-red-800">{error}</p>
                    </div>
                </div>
            ) : null}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                                <ShieldCheck className="h-5 w-5 text-indigo-600" />
                            </div>

                            <div>
                                <h2 className="text-base font-semibold text-slate-900">
                                    Review Bulk Payout
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Confirm the payout summary before OTP verification.
                                </p>
                            </div>
                        </div>

                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {preview.totalTransactions} valid records
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-px bg-slate-200 md:grid-cols-3">
                    <div className="bg-white px-5 py-5 sm:px-6">
                        <div className="flex items-center gap-2">
                            <FileSpreadsheet className="h-4 w-4 text-indigo-600" />

                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Uploaded File
                            </p>
                        </div>

                        <p
                            title={preview.fileName}
                            className="mt-3 truncate text-sm font-semibold text-slate-900"
                        >
                            {preview.fileName}
                        </p>
                    </div>

                    <div className="bg-white px-5 py-5 sm:px-6">
                        <div className="flex items-center gap-2">
                            <Landmark className="h-4 w-4 text-indigo-600" />

                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Beneficiaries
                            </p>
                        </div>

                        <p className="mt-3 text-2xl font-bold text-slate-900">
                            {preview.totalBeneficiaries}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Valid beneficiary records
                        </p>
                    </div>

                    <div className="bg-white px-5 py-5 sm:px-6">
                        <div className="flex items-center gap-2">
                            <IndianRupee className="h-4 w-4 text-indigo-600" />

                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Total Payout Amount
                            </p>
                        </div>

                        <p className="mt-3 text-2xl font-bold text-slate-900">
                            {formatCurrency(preview.totalAmount)}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Amount to be debited from wallet
                        </p>
                    </div>
                </div>



                <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <SecondaryButton onClick={onBack}>
                        <ArrowLeft className="h-4 w-4" />
                        Back to Validation
                    </SecondaryButton>

                    <PrimaryButton onClick={onContinue}>
                        Confirm and Continue
                        <ShieldCheck className="h-4 w-4" />
                    </PrimaryButton>
                </div>
            </div>
        </div>
    )
}