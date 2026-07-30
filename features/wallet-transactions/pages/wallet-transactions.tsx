'use client'

import { useState } from 'react'
import { useWalletTransactions } from '../hooks/useWalletTransactions'
import PageHeader from '@/components/layout/page-header'

import { TransactionSummary } from '../components/transaction-summary'
import { TransactionFilters } from '../components/transaction-filters'
import { TransactionTable } from '../components/transaction-table'
import TransactionHeaderActions from '../components/transaction-header-actions'

export default function WalletTransactionsPage() {
  const [page, setPage] = useState(0)

  const [filters, setFilters] = useState({
    search: '',
    transactionType: 'ALL',
  })

  const { data, isLoading, isError } = useWalletTransactions(
    page,
    10,
    filters.transactionType === 'ALL'
      ? undefined
      : (filters.transactionType as 'CREDIT' | 'DEBIT'),
    filters.search || undefined
  )

  return (
    <div className="min-w-0 space-y-6 p-4 sm:space-y-7 sm:p-6 lg:p-8">
      <PageHeader
        title="Wallet Transactions"
        subtitle="View all credits, debits and adjustments in your wallet."
        actions={<TransactionHeaderActions />}
      />

      <TransactionSummary />

      <TransactionFilters
        filters={filters}
        setFilters={setFilters}
        setPage={setPage}
      />

      <TransactionTable
        transactions={data?.data?.content || []}
        pagination={data?.data}
        loading={isLoading}
        error={isError}
        page={page}
        onPageChange={setPage}
      />
    </div>
  )
}