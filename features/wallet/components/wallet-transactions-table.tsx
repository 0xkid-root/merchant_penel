'use client'

import { TRANSACTIONS } from '../data/transaction-data'

import TransactionPagination from './transaction-pagination'
import TransactionSearch from './transaction-search'
import TransactionTable from './transaction-table'
import TransactionTableHeader from './transaction-table-header'

export function WalletTransactionsTable() {
  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="min-w-0">
        <TransactionTableHeader />
      </div>

      <div className="min-w-0 border-t border-slate-100">
        <TransactionSearch />
      </div>

      <div className="min-w-0 overflow-x-auto">
        <TransactionTable transactions={TRANSACTIONS} />
      </div>

      <div className="min-w-0 border-t border-slate-100">
        <TransactionPagination />
      </div>
    </section>
  )
}