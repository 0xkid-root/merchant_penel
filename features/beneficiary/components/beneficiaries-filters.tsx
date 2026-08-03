'use client'

import { Search, RotateCcw } from 'lucide-react'

interface Props {
  search: string
  setSearch: (value: string) => void
  status: string
  setStatus: (value: string) => void
  onReset: () => void
}

export default function BeneficiariesFilters({
  search,
  setSearch,
  status,
  setStatus,
  onReset,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex h-11 items-center rounded-xl border border-slate-300 px-4 transition focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-100">
            <Search className="mr-3 h-4 w-4 shrink-0 text-slate-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search beneficiary..."
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
        >
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>

        <button
          type="button"
          onClick={onReset}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>
    </div>
  )
}