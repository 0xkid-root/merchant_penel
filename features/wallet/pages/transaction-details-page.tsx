'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useWalletLedgerDetails } from '../hooks/useWalletLedger'
import { formatCurrency } from '../utils/formatCurrency'
import { formatTransactionType } from '../utils/formatTransactionType'
import { formatDateTime } from '../utils/formatDate'
import TransactionStatusBadge from '../components/transaction-status-badge'

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
    return (
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse" />
          <div className="space-y-2">
            <div className="h-6 w-48 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-64 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-slate-200 rounded-xl animate-pulse shadow-sm" />
          <div className="h-64 bg-slate-200 rounded-xl animate-pulse shadow-sm" />
          <div className="h-48 bg-slate-200 rounded-xl animate-pulse shadow-sm" />
          <div className="h-48 bg-slate-200 rounded-xl animate-pulse shadow-sm" />
        </div>
      </div>
    )
  }

  if (isError || !data?.data) {
    return (
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
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
  const amountPrefix = isCredit ? '+' : '-'
  const amountColor = isCredit ? 'text-green-600' : 'text-red-600'
  const formattedAmount = `${amountPrefix}${formatCurrency(transaction.amount)}`
  const difference = transaction.closingBalance - transaction.openingBalance

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors self-start sm:self-auto"
          title="Go Back"
        >
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transaction Details</h1>
          <p className="text-sm text-slate-500 mt-1">View complete transaction information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Transaction Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Transaction Information</h2>
          <div className="space-y-4">
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
              value={formatTransactionType(transaction.referenceType)} 
            />
            <InfoRow 
              label="Transaction Type" 
              value={formatTransactionType(transaction.transactionType)} 
            />
            <div className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
              <span className="text-sm text-slate-500">Status</span>
              <TransactionStatusBadge status="Success" />
            </div>
            <InfoRow 
              label="Date & Time" 
              value={formatDateTime(transaction.createdAt)} 
            />
            {transaction.createdBy && (
              <InfoRow 
                label="Created By" 
                value={transaction.createdBy} 
              />
            )}
          </div>
        </div>

        {/* Card 2: Financial Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Financial Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-sm text-slate-500">Amount</span>
              <span className={`text-base font-semibold ${amountColor}`}>
                {formattedAmount}
              </span>
            </div>
            <InfoRow 
              label="Opening Balance" 
              value={formatCurrency(transaction.openingBalance)} 
            />
            <InfoRow 
              label="Closing Balance" 
              value={formatCurrency(transaction.closingBalance)} 
            />
            <InfoRow 
              label="Difference" 
              value={formatCurrency(Math.abs(difference))} 
              valueClass={difference >= 0 ? 'text-green-600' : 'text-red-600'}
            />
          </div>
        </div>

        {/* Card 3: Merchant Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Merchant Information</h2>
          <div className="space-y-4">
            <InfoRow 
              label="Merchant Name" 
              value={transaction.merchantName} 
            />
            <InfoRow 
              label="Merchant ID" 
              value={transaction.merchantId.toString()} 
              copyable
              onCopy={() => handleCopy(transaction.merchantId.toString(), 'merchantId')}
              isCopied={copiedId === 'merchantId'}
            />
            <InfoRow 
              label="Wallet Code" 
              value={transaction.walletCode} 
              copyable
              onCopy={() => handleCopy(transaction.walletCode, 'walletCode')}
              isCopied={copiedId === 'walletCode'}
            />
          </div>
        </div>

        {/* Card 4: Remarks */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Remarks</h2>
          <div className="bg-slate-50 rounded-xl p-5 min-h-[120px] border border-slate-100">
            <p className="text-sm text-slate-700 whitespace-pre-wrap break-words leading-relaxed">
              {transaction.remarks || 'No remarks provided for this transaction.'}
            </p>
          </div>
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
  isCopied,
  valueClass = "text-slate-900"
}: { 
  label: string, 
  value: string, 
  copyable?: boolean, 
  onCopy?: () => void, 
  isCopied?: boolean,
  valueClass?: string
}) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-slate-50 last:border-0">
      <span className="text-sm text-slate-500 font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`text-sm font-medium ${valueClass}`}>{value || 'N/A'}</span>
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
