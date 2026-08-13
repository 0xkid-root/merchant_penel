'use client'

import { Search, SlidersHorizontal } from 'lucide-react'

import type { PayoutStatus } from '../types/single-payout.types'

interface SinglePayoutFiltersProps {
  searchValue: string
  statusFilter: 'all' | PayoutStatus
  onSearchChange: (value: string) => void
  onStatusChange: (value: 'all' | PayoutStatus) => void
  onMoreFilters?: () => void
}

export default function SinglePayoutFilters({
  searchValue,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onMoreFilters,
}: SinglePayoutFiltersProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          type="search"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search payout ID, beneficiary or account..."
          className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      <div className="flex w-full gap-3 sm:w-auto">
        <select
          value={statusFilter}
          onChange={(event) =>
            onStatusChange(event.target.value as 'all' | PayoutStatus)
          }
          className="h-11 min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:min-w-40"
        >
          <option value="SUCCESS">Success</option>
          <option value="PENDING">Pending</option>
          <option value="PROCESSING">Processing</option>
          <option value="FAILED">Failed</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <button
          type="button"
          onClick={onMoreFilters}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-slate-50"
          aria-label="More payout filters"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}