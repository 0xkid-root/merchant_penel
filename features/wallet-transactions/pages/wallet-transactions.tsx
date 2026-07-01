'use client'

import { useState } from 'react'

import PageHeader from '@/components/layout/page-header'

import {TransactionSummary} from '../components/transaction-summary'
import {TransactionFilters} from '../components/transaction-filters'
import {TransactionTable} from '../components/transaction-table'
import TransactionHeaderActions from '../components/transaction-header-actions'

export default function WalletTransactionsPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const [filters, setFilters] = useState({
    search: '',
    type: 'All Types',
    mode: 'All Modes',
    status: 'All Status',
    dateRange: {
      from: '01/06/2025',
      to: '18/06/2025',
    },
  })

  return (
    <div className="space-y-6 p-6">

      <PageHeader
        title="Wallet Transactions"
        subtitle="View all credits, debits and adjustments in your wallet."
        actions={<TransactionHeaderActions />}
      />

      <TransactionSummary />

      <TransactionFilters
        filters={filters}
        setFilters={setFilters}
      />

      <TransactionTable
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

    </div>
  )
}