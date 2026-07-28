'use client'

import { WalletLedger } from '../types/walletLedger.types'
import TransactionStatusBadge from './transaction-status-badge'

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
  const isCredit = transaction.transactionType === 'CREDIT'
  const amountPrefix = isCredit ? '+₹' : '-₹'
  const amountColor = isCredit ? 'text-green-600' : 'text-red-600'
  const formattedAmount = `${amountPrefix}${transaction.amount}`

  // TODO: Actual status will come from backend later
  const status = 'Success'

  return (
    <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50">
      <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-indigo-600 sm:px-6 sm:py-5">
        {transaction.referenceId}
      </td>

      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-700 sm:px-6 sm:py-5">
        {transaction.referenceType}
      </td>

      <td
        className={`whitespace-nowrap px-4 py-4 text-sm font-semibold sm:px-6 sm:py-5 ${amountColor}`}
      >
        {formattedAmount}
      </td>

      <td className="whitespace-nowrap px-4 py-4 sm:px-6 sm:py-5">
        <TransactionStatusBadge status={status} />
      </td>

      <td className="min-w-[220px] px-4 py-4 text-sm text-slate-600 sm:px-6 sm:py-5">
        {transaction.remarks}
      </td>

      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500 sm:px-6 sm:py-5">
        {formatDateTime(transaction.createdAt)}
      </td>

      <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-900 sm:px-6 sm:py-5">
        ₹{transaction.closingBalance}
      </td>
    </tr>
  )
}