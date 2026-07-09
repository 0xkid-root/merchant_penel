'use client'

import { RotateCcw, Search } from 'lucide-react'

interface TransactionFiltersProps {
  filters: {
    search: string
    type: string
    mode: string
    status: string
    dateRange?: {
      from: string
      to: string
    }
  }
  setFilters: (filters: any) => void
}

export function TransactionFilters({
  filters,
  setFilters,
}: TransactionFiltersProps) {
  const handleReset = () => {
    setFilters({
      search: '',
      type: 'All Types',
      mode: 'All Modes',
      status: 'All Status',
      dateRange: {
        from: '01/06/2025',
        to: '18/06/2025',
      },
    })
  }

  const selectClassName =
    'h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100'

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="flex h-12 items-center rounded-xl border border-slate-300 px-4 transition focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100">
            <Search className="mr-3 h-4 w-4 shrink-0 text-slate-500" />

            <input
              type="text"
              placeholder="Search transaction ID..."
              value={filters.search}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  search: e.target.value,
                })
              }
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <select
          value={filters.type}
          onChange={(e) =>
            setFilters({
              ...filters,
              type: e.target.value,
            })
          }
          className={selectClassName}
        >
          <option>All Types</option>
          <option>Add Funds</option>
          <option>Withdrawal</option>
          <option>Adjustment</option>
          <option>Fees</option>
        </select>

        <select
          value={filters.mode}
          onChange={(e) =>
            setFilters({
              ...filters,
              mode: e.target.value,
            })
          }
          className={selectClassName}
        >
          <option>All Modes</option>
          <option>NEFT</option>
          <option>RTGS</option>
          <option>IMPS</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) =>
            setFilters({
              ...filters,
              status: e.target.value,
            })
          }
          className={selectClassName}
        >
          <option>All Status</option>
          <option>Success</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>

        <button
          type="button"
          onClick={handleReset}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>
    </section>
  )
}