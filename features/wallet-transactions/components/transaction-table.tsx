'use client'

import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from 'lucide-react'

import { transactions } from '../data/wallet-transactions'

interface TransactionTableProps {
  currentPage: number
  setCurrentPage: (page: number) => void
}

export function TransactionTable({
  currentPage,
  setCurrentPage,
}: TransactionTableProps) {
  const pages = [1, 2, 3, 4, 5]

  const getStatusClassName = (status: string) => {
    switch (status) {
      case 'Success':
        return 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
      case 'Pending':
        return 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20'
      case 'Failed':
        return 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <section className="min-w-0">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-[1120px] w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  TXN ID
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Type
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Mode
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Amount
                </th>

          

                <th className="min-w-[220px] px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Remarks
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date & time
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx, index) => (
                <tr
                  key={`${tx.id}-${index}`}
                  className="border-b border-slate-100 transition-colors hover:bg-slate-50 last:border-b-0"
                >
                  <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-indigo-600">
                    {tx.id}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                          tx.icon === 'down' ? 'bg-green-100' : 'bg-red-100'
                        }`}
                      >
                        {tx.icon === 'down' ? (
                          <ArrowDown className="h-3.5 w-3.5 text-green-600" />
                        ) : (
                          <ArrowUp className="h-3.5 w-3.5 text-red-600" />
                        )}
                      </div>

                      <span className="text-sm font-medium text-slate-900">
                        {tx.type}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-indigo-600">
                    {tx.mode}
                  </td>

                  <td
                    className={`whitespace-nowrap px-4 py-4 text-sm font-semibold ${
                      tx.amount.includes('+')
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {tx.amount}
                  </td>


                  <td className="min-w-[220px] px-4 py-4 text-sm text-slate-600">
                    {tx.remarks}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                    {tx.date}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    <span
                      className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-semibold ${getStatusClassName(
                        tx.status,
                      )}`}
                    >
                      {tx.status}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <button
                      type="button"
                      aria-label={`Actions for ${tx.id}`}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Showing <span className="font-medium text-slate-700">1–10</span> of{' '}
          <span className="font-medium text-slate-700">80</span> transactions
        </p>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            aria-label="Previous page"
            disabled={currentPage === 1}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {pages.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition ${
                page === currentPage
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            aria-label="Next page"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}