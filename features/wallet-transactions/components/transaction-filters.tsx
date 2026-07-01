'use client'

import { Search, RotateCcw } from 'lucide-react'

interface TransactionFiltersProps {
  filters: any
  setFilters: any
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
    })
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">

        {/* Search */}
        <div className="lg:col-span-2">
          <div className="flex h-11 items-center rounded-xl border border-slate-300 px-4 focus-within:border-indigo-600">

            <Search className="mr-3 h-4 w-4 text-slate-500" />

            <input
              type="text"
              placeholder="Search Transaction ID..."
              value={filters.search}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  search: e.target.value,
                })
              }
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />

          </div>
        </div>

        {/* Transaction Type */}
        <select
          value={filters.type}
          onChange={(e) =>
            setFilters({
              ...filters,
              type: e.target.value,
            })
          }
          className="h-11 rounded-xl border border-slate-300 px-4 text-sm outline-none focus:border-indigo-600"
        >
          <option>All Types</option>
          <option>Add Funds</option>
          <option>Withdrawal</option>
          <option>Adjustment</option>
          <option>Fees</option>
        </select>

        {/* Payment Mode */}
        <select
          value={filters.mode}
          onChange={(e) =>
            setFilters({
              ...filters,
              mode: e.target.value,
            })
          }
          className="h-11 rounded-xl border border-slate-300 px-4 text-sm outline-none focus:border-indigo-600"
        >
          <option>All Modes</option>
          <option>NEFT</option>
          <option>RTGS</option>
          <option>IMPS</option>
        </select>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) =>
            setFilters({
              ...filters,
              status: e.target.value,
            })
          }
          className="h-11 rounded-xl border border-slate-300 px-4 text-sm outline-none focus:border-indigo-600"
        >
          <option>All Status</option>
          <option>Success</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>

      </div>
    

    </div>
  )
}