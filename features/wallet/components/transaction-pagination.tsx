'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function TransactionPagination() {
  const pages = [1, 2, 3, 4]

  return (
    <div className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p className="text-sm text-slate-500">
        Showing <span className="font-medium text-slate-700">1–5</span> of{' '}
        <span className="font-medium text-slate-700">24</span> transactions
      </p>

      <div className="flex items-center gap-2 self-start sm:self-auto">
        <button
          type="button"
          aria-label="Previous page"
          disabled
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition-colors disabled:cursor-not-allowed disabled:bg-slate-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            aria-label={`Page ${page}`}
            className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition-colors ${
              page === 1
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
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}