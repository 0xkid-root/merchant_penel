'use client'

import {
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    FileSpreadsheet,
    RefreshCw,
} from 'lucide-react'

import { PrimaryButton } from '@/components/buttons/primary-button'
import { SecondaryButton } from '@/components/buttons/secondary-button'
import { formatCurrency } from '@/lib/utils/formatCurrency'

import type { BulkPayoutPreviewResponse } from '../types/bulk-payout.types'

interface BulkPayoutValidationProps {
    preview: BulkPayoutPreviewResponse | null
    walletBalance: number
    onBack: () => void
    onContinue: () => void
    onReupload: () => void
    error?: string | null
}

export default function BulkPayoutValidation({
    preview,
    walletBalance,
    onBack,
    onContinue,
    onReupload,
    error,
}: BulkPayoutValidationProps) {
    if (!preview) return null

    const isSufficientBalance = walletBalance >= preview.totalAmount

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
                        <div>
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                                    <FileSpreadsheet className="h-4 w-4 text-indigo-600" />
                                </div>

                                <div>
                                    <h2 className="text-base font-semibold text-slate-900">
                                        Validate Payout Records
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Review uploaded records before submitting the bulk payout.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onReupload}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Upload Another File
                        </button>
                    </div>
                </div>

                <div className="border-b border-slate-200 bg-slate-50/70 px-5 py-4 sm:px-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Uploaded file
                    </p>

                    <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                        {preview.fileName}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-3">
                    <div className="bg-white px-5 py-5 sm:px-6">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Total Records
                        </p>

                        <p className="mt-2 text-2xl font-bold text-slate-900">
                            {preview.totalTransactions}
                        </p>
                    </div>

                    <div className="bg-white px-5 py-5 sm:px-6">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Total Beneficiaries
                        </p>

                        <p className="mt-2 text-2xl font-bold text-slate-900">
                            {preview.totalBeneficiaries}
                        </p>
                    </div>

                    <div className="bg-white px-5 py-5 sm:px-6">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Available Balance
                        </p>

                        <p className={`mt-2 text-2xl font-bold ${isSufficientBalance ? 'text-slate-900' : 'text-red-600'}`}>
                            {formatCurrency(walletBalance)}
                        </p>
                    </div>
                </div>

                <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900">
                                Valid payout amount
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Only valid beneficiary records will be included in this batch.
                            </p>
                        </div>

                        <p className="text-xl font-bold text-slate-900">
                            {formatCurrency(preview.totalAmount)}
                        </p>
                    </div>

                </div>

                {!isSufficientBalance ? (
                    <div className="border-b border-red-100 bg-red-50 px-5 py-4 sm:px-6">
                        <div className="flex gap-3">
                            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

                            <div>
                                <p className="text-sm font-semibold text-red-900">
                                    Insufficient Wallet Balance
                                </p>

                                <p className="mt-1 text-sm leading-6 text-red-700">
                                    You do not have enough funds in your wallet to process this bulk payout. Please add funds to your wallet and try again.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="border-b border-emerald-100 bg-emerald-50 px-5 py-4 sm:px-6">
                        <div className="flex gap-3">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                            <div>
                                <p className="text-sm font-semibold text-emerald-900">
                                    Sufficient Balance Available
                                </p>

                                <p className="mt-1 text-sm leading-6 text-emerald-700">
                                    Your payout file is ready for review and submission.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <SecondaryButton onClick={onBack}>
                        <ArrowLeft className="h-4 w-4" />
                        Back to Upload
                    </SecondaryButton>

                    <PrimaryButton
                        onClick={onContinue}
                        disabled={!isSufficientBalance}
                    >
                        Continue to Review
                        <ArrowRight className="h-4 w-4" />
                    </PrimaryButton>
                </div>
            </div>
        </div>
    )
}