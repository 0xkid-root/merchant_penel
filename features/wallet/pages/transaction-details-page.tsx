'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Copy, Check, ArrowDown, ArrowUp, Calendar, Tag, FileText, Info, MessageSquare, Headphones, ArrowRight } from 'lucide-react'
import { useState, ReactNode } from 'react'
import { toast } from 'sonner'
import { useWalletLedgerDetails } from '../hooks/useWalletLedger'
import { formatCurrency } from '../utils/formatCurrency'
import { formatTransactionType } from '../utils/formatTransactionType'
import { formatDateTime } from '../utils/formatDate'
import TransactionStatusBadge from '../components/transaction-status-badge'
import TransactionDetailsSkeleton from '../components/transaction-details-skeleton'

export default function TransactionDetailsPage({ ledgerId }: { ledgerId: string }) {
  const router = useRouter()
  const { data, isLoading, isError } = useWalletLedgerDetails(Number(ledgerId))
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    toast.success('Copied successfully!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (isLoading) {
    return <TransactionDetailsSkeleton />
  }

  if (isError || !data?.data) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Transaction Not Found</h2>
          <p className="text-slate-500 mb-6">The transaction details could not be loaded or do not exist.</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const transaction = data.data
  const isCredit = transaction.transactionType === 'CREDIT'
  const isDebit = transaction.transactionType === 'DEBIT'

  const amountPrefix = isCredit ? '+' : '-'
  const amountColor = isCredit ? 'text-green-600' : 'text-red-600'
  const bgIconColor = isCredit ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
  const badgeColor = isCredit ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
  const formattedAmount = `${amountPrefix}${formatCurrency(transaction.amount)}`

  const formattedDateTimeStr = formatDateTime(transaction.createdAt)
  const [datePart, timePart] = formattedDateTimeStr.split(', ')

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => router.back()}
          className="flex items-center text-indigo-600 text-sm font-semibold mb-6 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Wallet Transactions
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Transaction Details</h1>
        <p className="text-sm text-slate-500 mt-1">View complete transaction information</p>
      </div>

      <div className="bg-white rounded-xl  border border-slate-200 p-6 sm:p-8">
        {/* Top Summary Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">

          {/* Amount Section */}
          <div className="flex flex-col items-center justify-center flex-1">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${bgIconColor}`}>
              {isCredit ? <ArrowUp className="w-6 h-6" /> : <ArrowDown className="w-6 h-6" />}
            </div>
            <div className={`px-4 py-1 rounded-full text-xs font-bold mb-3 ${badgeColor}`}>
              {formatTransactionType(transaction.transactionType)}
            </div>
            <div className={`text-3xl font-extrabold mb-2 ${amountColor}`}>
              {formattedAmount}
            </div>
            <div className="text-sm font-bold text-slate-800 mb-3">
              {formatTransactionType(transaction.referenceType)}
            </div>
            <TransactionStatusBadge status="Success" />
          </div>

          <div className="hidden md:block w-px h-40 bg-slate-100"></div>

          {/* Date & Time Section */}
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mb-3">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-xs font-medium text-slate-400 mb-2">Date & Time</div>
            <div className="text-sm font-bold text-slate-800 mb-1">{datePart}</div>
            <div className="text-sm font-bold text-slate-800">{timePart}</div>
          </div>

          <div className="hidden md:block w-px h-40 bg-slate-100"></div>

          {/* Reference ID Section */}
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mb-3">
              <Tag className="w-5 h-5" />
            </div>
            <div className="text-xs font-medium text-slate-400 mb-2">Reference ID</div>
            <div className="text-sm font-bold text-slate-800 mb-3">{transaction.referenceId}</div>
            <button
              onClick={() => handleCopy(transaction.referenceId, 'topRefId')}
              className="text-slate-400 hover:text-indigo-600 transition-colors p-1"
            >
              {copiedId === 'topRefId' ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          <div className="hidden md:block w-px h-40 bg-slate-100"></div>

          {/* Ledger Code Section */}
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <div className="text-xs font-medium text-slate-400 mb-2">Ledger Code</div>
            <div className="text-sm font-bold text-slate-800 mb-3">{transaction.ledgerCode}</div>
            <button
              onClick={() => handleCopy(transaction.ledgerCode, 'topLedgerCode')}
              className="text-slate-400 hover:text-indigo-600 transition-colors p-1"
            >
              {copiedId === 'topLedgerCode' ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

        </div>

        <hr className="border-slate-200 my-8" />

        {/* Transaction Information Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
              <Info className="w-4 h-4 text-indigo-600" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Transaction Information</h2>
          </div>

          <div className="space-y-1">
            <InfoRow
              label="Transaction ID"
              value={transaction.referenceId || transaction.id.toString()}
              copyable
              onCopy={() => handleCopy(transaction.referenceId || transaction.id.toString(), 'txnId')}
              isCopied={copiedId === 'txnId'}
            />
            <InfoRow
              label="Ledger Code"
              value={transaction.ledgerCode}
              copyable
              onCopy={() => handleCopy(transaction.ledgerCode, 'ledgerCode')}
              isCopied={copiedId === 'ledgerCode'}
            />
            <InfoRow
              label="Reference ID"
              value={transaction.referenceId}
              copyable
              onCopy={() => handleCopy(transaction.referenceId, 'refId')}
              isCopied={copiedId === 'refId'}
            />
            <InfoRow
              label="Reference Type"
              value={
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full">
                  {formatTransactionType(transaction.referenceType)}
                </span>
              }
            />
            <InfoRow
              label="Transaction Type"
              value={
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${badgeColor}`}>
                  {formatTransactionType(transaction.transactionType)}
                </span>
              }
            />
            <InfoRow
              label="Status"
              value={<TransactionStatusBadge status="Success" />}
            />
            <InfoRow
              label="Created By"
              value={transaction.createdBy}
            />
            <InfoRow
              label="Created At"
              value={formattedDateTimeStr}
            />
          </div>
        </div>

        <hr className="border-slate-200 my-8" />

        {/* Remarks Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Remarks</h2>
          </div>
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 min-h-[100px]">
            <p className="text-sm font-medium text-slate-700 whitespace-pre-wrap leading-relaxed">
              {transaction.remarks || 'No remarks provided for this transaction.'}
            </p>
          </div>
        </div>

        <hr className="border-slate-200 my-8" />

        {/* Need Help Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Need Help?</h3>
              <p className="text-xs font-medium text-slate-500 mt-1">If you have any questions regarding this transaction, please contact our support team.</p>
            </div>
          </div>
          <button className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-indigo-600 text-sm font-bold hover:bg-slate-50 transition-colors">
            Contact Support <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  )
}

function InfoRow({
  label,
  value,
  copyable,
  onCopy,
  isCopied
}: {
  label: string,
  value: ReactNode,
  copyable?: boolean,
  onCopy?: () => void,
  isCopied?: boolean
}) {
  return (
    <div className="flex justify-between items-center py-4 border-b border-slate-100 last:border-0">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <div className="flex items-center gap-2">
        <div className="text-sm font-bold text-slate-800">{value || 'N/A'}</div>
        {copyable && onCopy && (
          <button
            onClick={onCopy}
            className="text-slate-400 hover:text-indigo-600 transition-colors p-1"
            title="Copy"
          >
            {isCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  )
}
