'use client'

import { TRANSACTIONS } from '../data/transaction-data'

import TransactionTableHeader from './transaction-table-header'
import TransactionSearch from './transaction-search'
import TransactionTable from './transaction-table'
import TransactionPagination from './transaction-pagination'

export function WalletTransactionsTable() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <TransactionTableHeader />

      <TransactionSearch />

      <TransactionTable
        transactions={TRANSACTIONS}
      />

      <TransactionPagination />

    </div>
  )
}