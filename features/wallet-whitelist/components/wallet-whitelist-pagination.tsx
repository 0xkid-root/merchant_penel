'use client'

import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function WalletWhitelistPagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="flex items-center gap-2">

      {/* Previous */}

      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Pages */}

      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition ${
              currentPage === page
                ? 'bg-indigo-600 text-white'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {page}
          </button>
        )
      })}

      {/* Next */}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

    </div>
  )
}