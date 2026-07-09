'use client'

import { Transaction } from '../types/transaction'
import TransactionStatusBadge from './transaction-status-badge'

interface Props {
  transaction: Transaction
}

export default function TransactionRow({
  transaction,
}: Props) {
  return (
    <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50">
      <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-indigo-600 sm:px-6 sm:py-5">
        {transaction.id}
      </td>

      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-700 sm:px-6 sm:py-5">
        {transaction.type}
      </td>

      <td
        className={`whitespace-nowrap px-4 py-4 text-sm font-semibold sm:px-6 sm:py-5 ${transaction.amountColor}`}
      >
        {transaction.amount}
      </td>

      <td className="whitespace-nowrap px-4 py-4 sm:px-6 sm:py-5">
        <TransactionStatusBadge status={transaction.status} />
      </td>

      <td className="min-w-[220px] px-4 py-4 text-sm text-slate-600 sm:px-6 sm:py-5">
        {transaction.remarks}
      </td>

      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500 sm:px-6 sm:py-5">
        {transaction.date}
      </td>

      <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-900 sm:px-6 sm:py-5">
        {transaction.balance}
      </td>
    </tr>
  )
}