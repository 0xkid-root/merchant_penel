'use client'
import { Check, Copy, Eye, FileSpreadsheet } from 'lucide-react'
import Link from 'next/link'
import type { BulkPayoutSummary, BulkPayoutStatus, } from '../types/bulk-payout.types'

interface BulkPayoutTableProps {
    batches: BulkPayoutSummary[]
    copiedBatchId: string | null
    onViewDetails: (batch: BulkPayoutSummary) => void
    onCopyBatchId: (
        event: React.MouseEvent<HTMLButtonElement>,
        batchId: string,
    ) => void
}

import { formatCurrency } from '@/lib/utils/formatCurrency'
import { formatDate } from '@/lib/utils/dateFormatter'

function getShortBatchId(batchId: string) {
    if (batchId.length <= 12) return batchId

    return `${batchId.slice(0, 5)}...${batchId.slice(-4)}`
}


function getStatusLabel(status: BulkPayoutStatus) {
    if (status === 'SUCCESS') return 'Success'
    if (status === 'PROCESSING') return 'Processing'
    if (status === 'PENDING') return 'Pending'
    return 'Failed'
}



function getStatusStyles(status: BulkPayoutStatus) {
    if (status === 'SUCCESS') {
        return 'border border-emerald-200 bg-emerald-50 text-emerald-700'
    }

    if (status === 'PROCESSING') {
        return 'border border-amber-200 bg-amber-50 text-amber-700'
    }

    if (status === 'PENDING') {
        return 'border border-orange-200 bg-orange-50 text-orange-700'
    }

    return 'border border-red-200 bg-red-50 text-red-700'
}



export default function BulkPayoutTable({
    batches,
    copiedBatchId,
    onViewDetails,
    onCopyBatchId,
}: BulkPayoutTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse">
                <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Batch ID
                        </th>

                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            File Name
                        </th>

                        <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Records
                        </th>

                        <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Total Amount
                        </th>

                        <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Beneficiaries
                        </th>

                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Status
                        </th>

                        <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white">
                    {batches.map((batch) => {
                        const isCopied = copiedBatchId === batch.bulkReferenceId

                        return (
                            <tr
                                key={batch.id || batch.bulkPayoutId}
                                className="transition hover:bg-slate-50/80"
                            >
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => onViewDetails(batch)}
                                            title={batch.bulkReferenceId}
                                            className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline"
                                        >
                                            {getShortBatchId(batch.bulkReferenceId)}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={(event) => onCopyBatchId(event, batch.bulkReferenceId)}
                                            aria-label={`Copy ${batch.bulkReferenceId}`}
                                            title={isCopied ? 'Copied' : 'Copy batch ID'}
                                            className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600"
                                        >
                                            {isCopied ? (
                                                <Check className="h-3.5 w-3.5 text-emerald-600" />
                                            ) : (
                                                <Copy className="h-3.5 w-3.5" />
                                            )}
                                        </button>
                                    </div>
                                </td>

                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
                                            <FileSpreadsheet className="h-4 w-4 text-indigo-600" />
                                        </div>

                                        <div className="min-w-0">
                                            <p
                                                title={batch.fileName}
                                                className="max-w-[260px] truncate text-sm font-semibold text-slate-900"
                                            >
                                                {batch.fileName}
                                            </p>

                                            <p className="mt-0.5 text-xs text-slate-500">
                                                {formatDate(batch.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-5 py-4 text-center">
                                    <p className="text-sm font-bold text-slate-900">
                                        {batch.totalTransactions}
                                    </p>
                                </td>

                                <td className="px-5 py-4 text-right">
                                    <p className="text-sm font-bold text-slate-900">
                                        {formatCurrency(batch.totalAmount)}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Total batch amount
                                    </p>
                                </td>

                                <td className="px-5 py-4 text-right">
                                    <p className="text-sm font-bold text-slate-900">
                                        {batch.totalBeneficiaries}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Total beneficiaries
                                    </p>
                                </td>


                                <td className="px-5 py-4">
                                    <span
                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyles(
                                            batch.status,
                                        )}`}
                                    >
                                        {getStatusLabel(batch.status)}
                                    </span>
                                </td>

                                <td className="px-5 py-4 text-right">
                                    <Link
                                        href={`/payout/bulk/${batch.id || batch.bulkPayoutId}`}
                                        title="View batch details"
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}