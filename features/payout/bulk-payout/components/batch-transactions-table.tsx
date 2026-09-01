import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { formatCurrency } from '@/lib/utils/formatCurrency'
import { formatDateTime } from '@/lib/utils/formatDate'
import type { BulkPayoutTransaction } from '../types/bulk-payout.types'

interface BatchTransactionsListProps {
    transactions: BulkPayoutTransaction[]
}

function getStatusStyles(status: string) {
    if (status === 'SUCCESS') return 'border border-emerald-200 bg-emerald-50 text-emerald-700'
    if (status === 'PROCESSING') return 'border border-amber-200 bg-amber-50 text-amber-700'
    if (status === 'PENDING') return 'border border-orange-200 bg-orange-50 text-orange-700'
    return 'border border-red-200 bg-red-50 text-red-700'
}

function getStatusLabel(status: string) {
    if (status === 'SUCCESS') return 'Success'
    if (status === 'PROCESSING') return 'Processing'
    if (status === 'PENDING') return 'Pending'
    return 'Failed'
}

function DetailItem({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1">
            <dt className="text-sm font-medium text-slate-500">{label}</dt>
            <dd className="text-sm font-semibold text-slate-900 break-all">
                {value === null || value === undefined || value === '' ? '—' : value}
            </dd>
        </div>
    )
}

function CopyableDetailItem({ label, value }: { label: string; value: string | null | undefined }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        if (!value) return
        try {
            await navigator.clipboard.writeText(value)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            // no toast
        }
    }

    const isEmpty = value === null || value === undefined || value === ''

    return (
        <div className="flex flex-col gap-1">
            <dt className="text-sm font-medium text-slate-500">{label}</dt>
            <dd className="text-sm font-semibold text-slate-900 break-all flex items-center gap-2">
                <span>{isEmpty ? '—' : value}</span>
                {!isEmpty && (
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="text-slate-400 hover:text-indigo-600 transition-colors"
                        aria-label={`Copy ${label}`}
                    >
                        {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                    </button>
                )}
            </dd>
        </div>
    )
}

export default function BatchTransactionsList({ transactions }: BatchTransactionsListProps) {
    return (
        <div className="space-y-4 bg-slate-50 p-4">
            {transactions.map((txn) => (
                <div key={txn.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <div className="p-4 sm:p-5">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            <CopyableDetailItem label="Transaction ID" value={txn.transactionId} />

                            <div className="flex flex-col gap-1">
                                <dt className="text-sm font-medium text-slate-500">Status</dt>
                                <dd className="text-sm font-semibold break-all">
                                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${getStatusStyles(txn.payoutStatus)}`}>
                                        {getStatusLabel(txn.payoutStatus)}
                                    </span>
                                </dd>
                            </div>

                            <DetailItem label="Amount" value={formatCurrency(txn.amount)} />
                            <DetailItem label="Beneficiary" value={txn.beneficiaryName} />
                            <CopyableDetailItem label="Account No" value={txn.accountNumber} />

                            <CopyableDetailItem label="IFSC" value={txn.ifscCode} />
                            <DetailItem label="Mode" value={txn.paymentMode} />
                            <CopyableDetailItem label="UTR Number" value={txn.utrNumber} />
                            <DetailItem label="Created At" value={formatDateTime(txn.createdAt)} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
