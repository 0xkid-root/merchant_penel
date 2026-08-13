'use client'

import type { SinglePayoutTransaction } from '../types/single-payout.types'

import SinglePayoutRow from './single-payout-row'

interface SinglePayoutTableProps {
  transactions: SinglePayoutTransaction[]
  onViewDetails: (payoutId: number) => void
}

export default function SinglePayoutTable({
  transactions,
  onViewDetails,
}: SinglePayoutTableProps) {
  return (
    <div className="min-w-0 overflow-x-auto">
      <table className="w-full min-w-[1080px] border-collapse">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Payout ID
            </th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Beneficiary
            </th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Bank Account
            </th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Amount
            </th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Created At
            </th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>

            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <SinglePayoutRow
                key={transaction.transactionId || transaction.id}
                transaction={transaction}
                onViewDetails={onViewDetails}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-16 text-center text-sm text-slate-500"
              >
                No single payouts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}