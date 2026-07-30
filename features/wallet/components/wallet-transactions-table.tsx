'use client'

import { WalletLedger } from '../types/walletLedger.types'
import TransactionTable from './transaction-table'
import TransactionTableHeader from './transaction-table-header'

interface WalletTransactionsTableProps {
  transactions: WalletLedger[]
}

export function WalletTransactionsTable({ transactions }: WalletTransactionsTableProps) {
  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="min-w-0">
        <TransactionTableHeader />
      </div>

      <div className="min-w-0 overflow-x-auto">
        {transactions.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No transactions found.</div>
        ) : (
          <TransactionTable transactions={transactions} />
        )}
      </div>
    </section>
  )
}