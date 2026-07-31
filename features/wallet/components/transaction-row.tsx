'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Copy, Check, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { WalletLedger } from '../types/walletLedger.types'
import TransactionStatusBadge from './transaction-status-badge'
import { formatTransactionId } from '@/lib/utils/maskTransactionId'
import { formatTransactionType } from '@/lib/utils/formatTransactionType'
import { formatCurrency } from '@/lib/utils/formatCurrency'

interface Props {
  transaction: WalletLedger
}

function formatDateTime(dateStr: string) {
  if (!dateStr) return 'N/A'
  const d = new Date(dateStr)
  
  const day = d.getDate().toString().padStart(2, '0')
  const month = d.toLocaleString('en-US', { month: 'short' })
  const year = d.getFullYear()
  
  let hours = d.getHours()
  const minutes = d.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  
  hours = hours % 12
  hours = hours ? hours : 12
  const strHours = hours.toString().padStart(2, '0')
  
  return `${day} ${month} ${year}, ${strHours}:${minutes} ${ampm}`
}

export default function TransactionRow({
  transaction,
}: Props) {
  const router = useRouter()
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const isCredit = transaction.transactionType === 'CREDIT'
  const amountPrefix = isCredit ? '+' : '-'
  const amountColor = isCredit ? 'text-green-600' : 'text-red-600'
  const formattedAmount = `${amountPrefix}${formatCurrency(transaction.amount)}`

  const status = transaction.status || 'UNKNOWN'

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id)
    setCopiedId(id)
    toast.success('Transaction ID successfully copied!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50">
      <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-indigo-600 sm:px-6 sm:py-5">
        <div className="flex items-center gap-2">
          <span 
            className="cursor-pointer hover:text-indigo-800 transition-colors"
            onClick={() => handleCopyId(transaction.referenceId)}
            title="Click to copy full ID"
          >
            {formatTransactionId(transaction.referenceId)}
          </span>
          <button 
            onClick={() => handleCopyId(transaction.referenceId)}
            className="text-slate-400 hover:text-indigo-600 transition-colors relative group"
            title="Copy ID"
          >
            {copiedId === transaction.referenceId ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copiedId === transaction.referenceId && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-sm z-10">
                Copied!
              </span>
            )}
          </button>
        </div>
      </td>

      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-700 sm:px-6 sm:py-5">
        {formatTransactionType(transaction.referenceType)}
      </td>

      <td
        className={`whitespace-nowrap px-4 py-4 text-sm font-semibold sm:px-6 sm:py-5 ${amountColor}`}
      >
        {formattedAmount}
      </td>

      <td className="whitespace-nowrap px-4 py-4 sm:px-6 sm:py-5">
        <TransactionStatusBadge status={status} />
      </td>

      <td className="min-w-[220px] max-w-[220px] px-4 py-4 text-sm text-slate-600 sm:px-6 sm:py-5">
        <div 
          className="line-clamp-2 cursor-default" 
          title={transaction.remarks}
        >
          {transaction.remarks}
        </div>
      </td>

      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500 sm:px-6 sm:py-5">
        {formatDateTime(transaction.createdAt)}
      </td>

      <td className="whitespace-nowrap px-4 py-4 text-center sm:px-6 sm:py-5">
        <button 
          onClick={() => router.push(`/wallet/transactions/${transaction.id}`)}
          className="text-slate-400 hover:text-indigo-600 transition-colors"
          title="View Details"
        >
          <Eye className="mx-auto h-5 w-5 cursor-pointer" />
        </button>
      </td>
    </tr>
  )
}