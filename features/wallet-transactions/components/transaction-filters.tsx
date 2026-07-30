'use client'

import { RotateCcw, Search } from 'lucide-react'

interface TransactionFiltersProps {
  filters: {
    search: string
    transactionType: string
  }
  setFilters: (filters: any) => void
  setPage: (page: number) => void
}

export function TransactionFilters({
  filters,
  setFilters,
  setPage,
}: TransactionFiltersProps) {
  const handleReset = () => {
    setFilters({
      search: '',
      transactionType: 'ALL',
    })
    setPage(0)
  }

  
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left Side: Search */}
        <div className="w-full sm:w-80">
          <div className="flex h-10 items-center rounded-xl border border-slate-300 px-3 transition focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100">
            <Search className="mr-2 h-4 w-4 shrink-0 text-slate-500" />
            <input
              type="text"
              placeholder="Search transaction ID..."
              value={filters.search}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  search: e.target.value,
                })
                setPage(0)
              }}
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Right Side: Filters & Reset */}
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <select
            value={filters.transactionType}
            onChange={(e) => {
              setFilters({
                ...filters,
                transactionType: e.target.value,
              })
              setPage(0)
            }}
            className="h-10 w-full sm:w-48 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="ALL">All Transactions</option>
            <option value="CREDIT">Credits</option>
            <option value="DEBIT">Debits</option>
          </select>

          <button
            type="button"
            onClick={handleReset}
            className="flex h-10 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>
    </section>
  )
}