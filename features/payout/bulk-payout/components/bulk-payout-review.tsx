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

import type { BulkPayoutFormValues, BulkPayoutRecord, } from '../types/bulk-payout.types'

interface BulkPayoutReviewProps {
    fileName: string
    records: BulkPayoutRecord[]
    onBack: () => void
    onContinue: () => void
}

function formatIndianCurrency(amount: number) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount)
}

export default function BulkPayoutReview({
    fileName,
    records,
    onBack,
    onContinue,
}: BulkPayoutReviewProps) {
    const totalAmount = records.reduce(
        (total, record) => total + Number(record.amount || 0),
        0,
    )

    return (
        <div className="mx-auto max-w-5xl">
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
                            {records.length} valid records
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
                            title={fileName}
                            className="mt-3 truncate text-sm font-semibold text-slate-900"
                        >
                            {fileName}
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
                            {records.length}
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
                            {formatIndianCurrency(totalAmount)}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Amount to be debited from wallet
                        </p>
                    </div>
                </div>

                <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900">
                                Beneficiary payout summary
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Review all valid payout records included in this batch.
                            </p>
                        </div>

                        <span className="hidden text-sm font-medium text-slate-500 sm:block">
                            {records.length} records
                        </span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[950px] border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Beneficiary
                                </th>

                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Account Details
                                </th>

                                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Amount
                                </th>

                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Remarks
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-200 bg-white">
                            {records.map((record) => (
                                <tr key={record.id} className="transition hover:bg-slate-50/70">
                                    <td className="px-5 py-4">
                                        <p className="text-sm font-semibold text-slate-900">
                                            {record.beneficiaryName}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4">
                                        <p className="font-mono text-sm font-medium text-slate-900">
                                            {record.accountNumber}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                            IFSC: {record.ifscCode}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4 text-right">
                                        <p className="text-sm font-bold text-slate-900">
                                            {formatIndianCurrency(record.amount)}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4">
                                        <p className="max-w-[260px] truncate text-sm text-slate-600">
                                            {record.remarks || '—'}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                        <tfoot>
                            <tr className="border-t border-slate-200 bg-slate-50">
                                <td
                                    colSpan={2}
                                    className="px-5 py-4 text-right text-sm font-semibold text-slate-700"
                                >
                                    Total payout amount
                                </td>

                                <td className="px-5 py-4 text-right text-base font-bold text-indigo-700">
                                    {formatIndianCurrency(totalAmount)}
                                </td>

                                <td className="px-5 py-4" />
                            </tr>
                        </tfoot>
                    </table>
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