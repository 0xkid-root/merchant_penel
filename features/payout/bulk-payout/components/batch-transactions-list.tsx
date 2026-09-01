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
        <div className="space-y-6 bg-slate-50 p-4 sm:p-6">
            {transactions.map((txn) => (
                <div key={txn.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <div className="p-6 sm:p-8">
                        {/* Top Summary Area */}
                        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                            <CopyableDetailItem label="Transaction ID" value={txn.transactionId} />
                            <div className="flex flex-col gap-1">
                                <dt className="text-sm font-medium text-slate-500">Payout Status</dt>
                                <dd className="text-sm font-semibold break-all">
                                    <span
                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyles(
                                            txn.payoutStatus,
                                        )}`}
                                    >
                                        {getStatusLabel(txn.payoutStatus)}
                                    </span>
                                </dd>
                            </div>
                            <DetailItem label="Amount" value={formatCurrency(txn.amount)} />
                            <DetailItem label="Payment Mode" value={txn.paymentMode} />
                        </div>

                        <hr className="my-8 border-slate-200" />

                        {/* Transaction Details */}
                        <div>
                            <h3 className="mb-6 text-base font-semibold text-slate-900">Transaction Details</h3>
                            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                                <CopyableDetailItem label="UTR Number" value={txn.utrNumber} />
                                <DetailItem label="Payout Type" value={txn.payoutType} />
                                <DetailItem label="Created At" value={formatDateTime(txn.createdAt)} />
                            </div>
                        </div>

                        <hr className="my-8 border-slate-200" />

                        {/* Beneficiary / Bank Details */}
                        <div>
                            <h3 className="mb-6 text-base font-semibold text-slate-900">Beneficiary / Bank Details</h3>
                            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                                <DetailItem label="Beneficiary Name" value={txn.beneficiaryName} />
                                <DetailItem label="Merchant Name" value={txn.merchantName} />
                                <CopyableDetailItem label="Account Number" value={txn.accountNumber} />
                                <CopyableDetailItem label="IFSC Code" value={txn.ifscCode} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
