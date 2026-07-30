'use client'

import { useState, useRef } from 'react'
import { useWalletTransactions } from '../hooks/useWalletTransactions'
import { useWalletStatement } from '../hooks/useWalletStatement'
import PageHeader from '@/components/layout/page-header'

import { TransactionSummary } from '../components/transaction-summary'
import { TransactionFilters } from '../components/transaction-filters'
import { TransactionTable } from '../components/transaction-table'
import TransactionHeaderActions from '../components/transaction-header-actions'
import { WalletTransactionsPageSkeleton } from '../components/wallet-transactions-page-skeleton'

export default function WalletTransactionsPage() {
  const [page, setPage] = useState(0)

  const [filters, setFilters] = useState({
    search: '',
    transactionType: 'ALL',
  })

  const {
    data: transactionsResponse,
    isLoading: isLoadingTransactions,
    isFetching: isFetchingTransactions,
    isError: isErrorTransactions,
  } = useWalletTransactions(
    page,
    10,
    filters.transactionType === 'ALL'
      ? undefined
      : (filters.transactionType as 'CREDIT' | 'DEBIT'),
    filters.search || undefined
  )

  const {
    data: statementResponse,
    isLoading: isLoadingStatement,
  } = useWalletStatement()

  const hasLoadedInitialData = useRef(false)

  if (transactionsResponse || statementResponse) {
    hasLoadedInitialData.current = true
  }

  if (!hasLoadedInitialData.current && (isLoadingTransactions || isLoadingStatement)) {
    return <WalletTransactionsPageSkeleton />
  }

  return (
    <div className="min-w-0 space-y-6 p-4 sm:space-y-7 sm:p-6 lg:p-8">
      <PageHeader
        title="Wallet Transactions"
        subtitle="View all credits, debits and adjustments in your wallet."
        actions={<TransactionHeaderActions />}
      />

      <TransactionSummary summary={statementResponse?.data} />

      <TransactionFilters
        filters={filters}
        setFilters={setFilters}
        setPage={setPage}
      />

      <TransactionTable
        transactions={transactionsResponse?.data?.content || []}
        pagination={transactionsResponse?.data}
        loading={isFetchingTransactions}
        error={isErrorTransactions}
        page={page}
        onPageChange={setPage}
      />
    </div>
  )
}