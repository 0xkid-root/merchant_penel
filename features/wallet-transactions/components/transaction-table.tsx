'use client'

import {
  ArrowDown,
  ArrowUp,
  Eye,
  Copy,
} from 'lucide-react'
import { toast } from 'sonner'

import { WalletTransaction } from '../types/walletTransactions.types'
import Pagination from '@/components/common/pagination/Pagination'
import { PaginationResponse } from '@/lib/types/pagination'
import { formatTransactionId } from '@/lib/utils/maskTransactionId'
import { formatTransactionType } from '@/lib/utils/formatTransactionType'

import { TransactionTableSkeleton } from './transaction-table-skeleton'

interface TransactionTableProps {
  transactions: WalletTransaction[]
  pagination?: PaginationResponse<WalletTransaction>
  loading: boolean
  error: boolean
  page: number
  onPageChange: (page: number) => void
}

export function TransactionTable({
  transactions,
  pagination,
  loading,
  error,
  page,
  onPageChange,
}: TransactionTableProps) {
  
  const handleView = (id: number) => {
    // Navigation to be implemented in a later phase
  }

  if (loading) {
    return <TransactionTableSkeleton />
  }

  if (error) {
    return (
      <section className="min-w-0">
        <div className="flex h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white">
          <p className="text-sm font-medium text-red-500">Failed to load transactions.</p>
        </div>
      </section>
    )
  }

  if (!transactions || transactions.length === 0) {
    return (
      <section className="min-w-0">
        <div className="flex h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white">
          <p className="text-sm font-medium text-slate-500">No transactions found.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="min-w-0">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-[1120px] w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  TXN ID
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Type
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Reference Type
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Amount
                </th>

                <th className="min-w-[220px] px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Remarks
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date & time
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-slate-100 transition-colors hover:bg-slate-50 last:border-b-0"
                >
                  <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-indigo-600">
                    <div className="flex items-center gap-2">
                      <span>{formatTransactionId(tx.referenceId)}</span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(tx.referenceId)
                          toast.success('txn id successfully copy')
                        }}
                        className="text-slate-400 transition hover:text-indigo-600"
                        title="Copy TXN ID"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                          tx.transactionType === 'CREDIT' ? 'bg-green-100' : 'bg-red-100'
                        }`}
                      >
                        {tx.transactionType === 'CREDIT' ? (
                          <ArrowDown className="h-3.5 w-3.5 text-green-600" />
                        ) : (
                          <ArrowUp className="h-3.5 w-3.5 text-red-600" />
                        )}
                      </div>

                      <span className="text-sm font-medium text-slate-900 capitalize">
                        {tx.transactionType.toLowerCase()}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-indigo-600">
                    {formatTransactionType(tx.referenceType)}
                  </td>

                  <td
                    className={`whitespace-nowrap px-4 py-4 text-sm font-semibold ${
                      tx.transactionType === 'CREDIT'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {tx.transactionType === 'CREDIT' ? '+' : '-'}₹{tx.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>

                  <td
                    className="max-w-[220px] truncate px-4 py-4 text-sm text-slate-600"
                    title={tx.remarks}
                  >
                    {tx.remarks || '-'}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                    {new Date(tx.createdAt).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>

                  <td className="px-4 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleView(tx.id)}
                      className="inline-flex rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {pagination && (
        <div className="mt-4">
          <Pagination
            page={page}
            totalPages={pagination.totalPages}
            totalElements={pagination.totalElements}
            pageSize={10}
            onPageChange={onPageChange}
            itemName="transactions"
          />
        </div>
      )}
    </section>
  )
}