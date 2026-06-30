'use client'

import { Download, ChevronDown } from 'lucide-react'

export default function TransactionTableHeader() {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

      <h3 className="text-xl font-semibold text-slate-900">
        Recent Transactions
      </h3>

      <div className="flex items-center gap-3">

        <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
          <span>All Transactions</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
          <Download className="h-4 w-4" />
          Export
        </button>

      </div>

    </div>
  )
}