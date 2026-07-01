'use client'

import { ArrowDown, ArrowUp, MoreVertical } from 'lucide-react'
import { transactions } from '../data/wallet-transactions'

interface TransactionTableProps {
  currentPage: number
  setCurrentPage: (page: number) => void
}

export function TransactionTable({
  currentPage,
  setCurrentPage,
}: TransactionTableProps) {
    
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success':
        return '#16a34a'
      case 'Pending':
        return '#d97706'
      case 'Failed':
        return '#dc2626'
      default:
        return '#6b7280'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'Success':
        return '#dcfce7'
      case 'Pending':
        return '#fef3c7'
      case 'Failed':
        return '#fee2e2'
      default:
        return '#f3f4f6'
    }
  }

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                TXN ID
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                TYPE
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                MODE
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                AMOUNT
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                BALANCE AFTER
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                REMARKS
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                DATE & TIME
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                STATUS
              </th>

              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                ACTION
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx, idx) => (
              <tr
                key={idx}
                className="border-b border-slate-200 transition hover:bg-slate-50"
              >
                <td className="px-4 py-3 text-sm font-medium text-indigo-600">
                  {tx.id}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full ${
                        tx.icon === 'down'
                          ? 'bg-green-100'
                          : 'bg-red-100'
                      }`}
                    >
                      {tx.icon === 'down' ? (
                        <ArrowDown className="h-3.5 w-3.5 text-green-600" />
                      ) : (
                        <ArrowUp className="h-3.5 w-3.5 text-red-600" />
                      )}
                    </div>

                    <span className="text-sm text-slate-900">
                      {tx.type}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 text-sm font-medium text-indigo-600">
                  {tx.mode}
                </td>

                <td
                  className={`px-4 py-3 text-sm font-semibold ${
                    tx.amount.includes('+')
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {tx.amount}
                </td>

                <td className="px-4 py-3 text-sm text-slate-900">
                  {tx.balance}
                </td>

                <td className="px-4 py-3 text-sm text-slate-600">
                  {tx.remarks}
                </td>

                <td className="px-4 py-3 text-sm text-slate-600">
                  {tx.date}
                </td>

                <td className="px-4 py-3">
                  <span
                    className="inline-block rounded-md px-2 py-1 text-xs font-semibold"
                    style={{
                      color: getStatusColor(tx.status),
                      backgroundColor: getStatusBg(tx.status),
                    }}
                  >
                    {tx.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <button className="rounded-lg p-2 transition hover:bg-slate-100">
                    <MoreVertical className="h-4 w-4 text-slate-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing 1 to 10 of 80 transactions
        </p>

        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 hover:bg-slate-50">
            ←
          </button>

          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                page === currentPage
                  ? 'bg-indigo-600 text-white'
                  : 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 hover:bg-slate-50">
            →
          </button>
        </div>
      </div>
    </div>
  )
}