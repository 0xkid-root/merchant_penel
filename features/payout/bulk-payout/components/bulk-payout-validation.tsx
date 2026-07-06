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
import type { BulkPayoutFormValues } from './bulk-payout-create-page'


import { BulkPayoutValidationRecord } from '../types/bulk-payout.types'

interface BulkPayoutValidationProps {
    values: BulkPayoutFormValues
    fileName: string
    records: BulkPayoutValidationRecord[]
    onBack: () => void
    onContinue: (validRecords: BulkPayoutValidationRecord[]) => void
    onReupload: () => void
}

function formatIndianCurrency(amount: number) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount)
}

export default function BulkPayoutValidation({
    values,
    fileName,
    records,
    onBack,
    onContinue,
    onReupload,
}: BulkPayoutValidationProps) {
    
    const validRecords = records.filter((record) => record.status === 'valid')
    const invalidRecords = records.filter((record) => record.status === 'invalid')

    const totalAmount = validRecords.reduce(
        (total, record) => total + Number(record.amount || 0),
        0,
    )

    const hasInvalidRecords = invalidRecords.length > 0

    return (
        <div className="mx-auto max-w-5xl">
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
                        {fileName}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-3">
                    <div className="bg-white px-5 py-5 sm:px-6">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Total Records
                        </p>

                        <p className="mt-2 text-2xl font-bold text-slate-900">
                            {records.length}
                        </p>
                    </div>

                    <div className="bg-white px-5 py-5 sm:px-6">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />

                            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                Valid Records
                            </p>
                        </div>

                        <p className="mt-2 text-2xl font-bold text-emerald-600">
                            {validRecords.length}
                        </p>
                    </div>

                    <div className="bg-white px-5 py-5 sm:px-6">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-600" />

                            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                Invalid Records
                            </p>
                        </div>

                        <p className="mt-2 text-2xl font-bold text-red-600">
                            {invalidRecords.length}
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
                            {formatIndianCurrency(totalAmount)}
                        </p>
                    </div>
                </div>

                {hasInvalidRecords ? (
                    <div className="border-b border-red-100 bg-red-50 px-5 py-4 sm:px-6">
                        <div className="flex gap-3">
                            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

                            <div>
                                <p className="text-sm font-semibold text-red-900">
                                    Some records need attention
                                </p>

                                <p className="mt-1 text-sm leading-6 text-red-700">
                                    Invalid records will not be included in the payout batch. You
                                    can continue with valid records or upload a corrected file.
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
                                    All records are valid
                                </p>

                                <p className="mt-1 text-sm leading-6 text-emerald-700">
                                    Your payout file is ready for review and submission.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

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

                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Validation Status
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-200 bg-white">
                            {records.map((record) => {
                                const isValid = record.status === 'valid'

                                return (
                                    <tr key={record.id} className="hover:bg-slate-50/70">
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
                                            <p className="max-w-[220px] truncate text-sm text-slate-600">
                                                {record.remarks || '—'}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            {isValid ? (
                                                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                                    Valid
                                                </span>
                                            ) : (
                                                <div>
                                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                                                        <AlertCircle className="h-3.5 w-3.5" />
                                                        Invalid
                                                    </span>

                                                    {record.errorMessage ? (
                                                        <p className="mt-1.5 max-w-[220px] text-xs text-red-600">
                                                            {record.errorMessage}
                                                        </p>
                                                    ) : null}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <SecondaryButton onClick={onBack}>
                        <ArrowLeft className="h-4 w-4" />
                        Back to Upload
                    </SecondaryButton>

                    <PrimaryButton
                        onClick={() => onContinue(validRecords)}
                        disabled={validRecords.length === 0}
                    >
                        Continue to Review
                        <ArrowRight className="h-4 w-4" />
                    </PrimaryButton>
                </div>
            </div>
        </div>
    )
}