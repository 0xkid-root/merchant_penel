'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SinglePayoutPaginationProps {
  currentPage: number
  totalItems: number
  totalPayouts: number
  onPageChange: (page: number) => void
}

export default function SinglePayoutPagination({
  currentPage,
  totalItems,
  totalPayouts,
  onPageChange,
}: SinglePayoutPaginationProps) {
  const pages = [1, 2, 3]

  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p className="text-sm text-slate-500">
        Showing {totalItems} of {totalPayouts} payouts
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-medium transition ${
              page === currentPage
                ? 'bg-indigo-600 text-white'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}