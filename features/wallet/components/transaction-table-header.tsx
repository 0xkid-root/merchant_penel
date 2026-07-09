'use client'

import { ChevronDown, Download } from 'lucide-react'

export default function TransactionTableHeader() {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <h3 className="text-xl font-semibold leading-7 text-slate-900 sm:text-2xl">
        Recent Transactions </h3>
      <div className="grid w-full grid-cols-[minmax(0,1fr)_48px] gap-3 sm:flex sm:w-auto sm:items-center">
        <button
          type="button"
          className="flex h-12 min-w-0 items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:justify-center"
        >
          <span className="truncate">All Transactions</span>
          <ChevronDown className="h-4 w-4 shrink-0" />
        </button>

        <button
          type="button"
          aria-label="Export transactions"
          title="Export transactions"
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto sm:gap-2 sm:px-4"
        >
          <Download className="h-4 w-4 shrink-0" />

          <span className="hidden sm:inline">Export</span>
        </button>
      </div>
    </div>

  )
}
