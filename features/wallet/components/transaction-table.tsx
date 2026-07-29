'use client'

import { WalletLedger } from '../types/walletLedger.types'
import TransactionRow from './transaction-row'

interface Props {
  transactions: WalletLedger[]
}

export default function TransactionTable({
  transactions,
}: Props) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[980px] w-full border-collapse">
        <thead>
          <tr className="border-y border-slate-200 bg-slate-50">
            <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
              TXN ID
            </th>

            <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
              TYPE
            </th>

            <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
              AMOUNT
            </th>

            <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
              STATUS
            </th>

            <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
              REMARKS
            </th>

            <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
              DATE &amp; TIME
            </th>

            <th className="whitespace-nowrap px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
              ACTION
            </th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}