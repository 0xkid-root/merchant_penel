'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  currentPage?: number
  totalPages?: number
  totalElements?: number
  pageSize?: number
  onPageChange?: (page: number) => void
}

export default function TransactionPagination({
  currentPage = 0,
  totalPages = 1,
  totalElements = 0,
  pageSize = 10,
  onPageChange,
}: Props) {
  const pages = Array.from({ length: Math.min(totalPages, 4) }, (_, i) => i + 1)
  
  const startItem = totalElements === 0 ? 0 : currentPage * pageSize + 1
  const endItem = Math.min((currentPage + 1) * pageSize, totalElements)

  return (
    <div className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p className="text-sm text-slate-500">
        Showing <span className="font-medium text-slate-700">{startItem}–{endItem}</span> of{' '}
        <span className="font-medium text-slate-700">{totalElements}</span> transactions
      </p>

      <div className="flex items-center gap-2 self-start sm:self-auto">
        <button
          type="button"
          aria-label="Previous page"
          disabled={currentPage === 0}
          onClick={() => onPageChange?.(currentPage - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition-colors disabled:cursor-not-allowed disabled:bg-slate-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            aria-label={`Page ${page}`}
            onClick={() => onPageChange?.(page - 1)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition-colors ${
              page - 1 === currentPage
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
          disabled={currentPage >= totalPages - 1 || totalPages === 0}
          onClick={() => onPageChange?.(currentPage + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400 disabled:bg-slate-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}