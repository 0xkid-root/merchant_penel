'use client'

import { useState } from 'react'

import { WalletLedger } from '../types/walletLedger.types'
import Pagination from '../../../components/common/pagination/Pagination'
import { useWalletLedger } from '../hooks/useWalletLedger'
import TransactionSearch from './transaction-search'
import TransactionTable from './transaction-table'
import TransactionTableHeader from './transaction-table-header'
import { useDebounce } from '@/hooks/use-debounce'

interface WalletTransactionsTableProps {
  recentTransactions?: WalletLedger[]
}

export function WalletTransactionsTable({ recentTransactions }: WalletTransactionsTableProps) {
  const isDashboardMode = !!recentTransactions

  const [page, setPage] = useState(0)
  const [transactionType, setTransactionType] = useState<'CREDIT' | 'DEBIT' | undefined>(undefined)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 400)

  const size = 10
  const { data, isLoading, isError } = useWalletLedger(
    page,
    size,
    transactionType,
    debouncedSearchTerm,
    !isDashboardMode
  )

  const transactions = isDashboardMode ? recentTransactions : (data?.data?.content || [])
  const pagination = isDashboardMode ? null : data?.data

  const showLoading = !isDashboardMode && isLoading
  const showError = !isDashboardMode && isError

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="min-w-0">
        <TransactionTableHeader
          selectedTransactionType={transactionType}
          onTransactionTypeChange={(type) => {
            if (!isDashboardMode) {
              setTransactionType(type)
              setPage(0)
            }
          }}
        />
      </div>

      {!isDashboardMode && (
        <div className="min-w-0 border-t border-slate-100">
          <TransactionSearch
            value={searchTerm}
            onChange={(val) => {
              setSearchTerm(val)
              setPage(0)
            }}
          />
        </div>
      )}

      <div className="min-w-0 overflow-x-auto">
        {showLoading ? (
          <div className="p-8 text-center text-slate-500">Loading transactions...</div>
        ) : showError ? (
          <div className="p-8 text-center text-red-500">Failed to load transactions.</div>
        ) : transactions.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No transactions found.</div>
        ) : (
          <TransactionTable transactions={transactions} />
        )}
      </div>

      {!isDashboardMode && (
        <div className="min-w-0 border-t border-slate-100">
          <Pagination
            page={page}
            totalPages={pagination?.totalPages || 1}
            totalElements={pagination?.totalElements || 0}
            pageSize={size}
            onPageChange={setPage}
            itemName="transactions"
          />
        </div>
      )}
    </section>
  )
}