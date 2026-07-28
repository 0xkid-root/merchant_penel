'use client'

import { useState } from 'react'

import { useWalletLedger } from '../hooks/useWalletLedger'
import TransactionPagination from './transaction-pagination'
import TransactionSearch from './transaction-search'
import TransactionTable from './transaction-table'
import TransactionTableHeader from './transaction-table-header'

export function WalletTransactionsTable() {
  const [page, setPage] = useState(0)
  const size = 10
  const { data, isLoading, isError } = useWalletLedger(page, size)

  const transactions = data?.data?.content || []
  const pagination = data?.data

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="min-w-0">
        <TransactionTableHeader />
      </div>

      <div className="min-w-0 border-t border-slate-100">
        <TransactionSearch />
      </div>

      <div className="min-w-0 overflow-x-auto">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">Loading transactions...</div>
        ) : isError ? (
          <div className="p-8 text-center text-red-500">Failed to load transactions.</div>
        ) : transactions.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No transactions found.</div>
        ) : (
          <TransactionTable transactions={transactions} />
        )}
      </div>

      <div className="min-w-0 border-t border-slate-100">
        <TransactionPagination
          currentPage={page}
          totalPages={pagination?.totalPages || 1}
          totalElements={pagination?.totalElements || 0}
          pageSize={size}
          onPageChange={setPage}
        />
      </div>
    </section>
  )
}