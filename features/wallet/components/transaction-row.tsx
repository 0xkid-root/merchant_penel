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

      <td className="px-6 py-5 text-sm font-semibold text-indigo-600">
        {transaction.id}
      </td>

      <td className="px-6 py-5 text-sm font-medium text-slate-700">
        {transaction.type}
      </td>

      <td className={`px-6 py-5 text-sm font-semibold ${transaction.amountColor}`}>
        {transaction.amount}
      </td>

      <td className="px-6 py-5">
        <TransactionStatusBadge
          status={transaction.status}
        />
      </td>

      <td className="px-6 py-5 text-sm text-slate-600">
        {transaction.remarks}
      </td>

      <td className="px-6 py-5 text-sm text-slate-500">
        {transaction.date}
      </td>

      <td className="px-6 py-5 text-sm font-semibold text-slate-900">
        {transaction.balance}
      </td>

    </tr>
  )
}