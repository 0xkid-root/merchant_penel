'use client'

import { Search, RotateCcw } from 'lucide-react'

interface Props {
  search: string
  setSearch: (value: string) => void

  status: string
  setStatus: (value: string) => void

  bank: string
  setBank: (value: string) => void

  fromDate: string
  setFromDate: (value: string) => void

  toDate: string
  setToDate: (value: string) => void

  onReset: () => void
}

export default function BeneficiariesFilters({
  search,
  setSearch,
  status,
  setStatus,
  bank,
  setBank,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  onReset,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">

        {/* Search */}

        <div className="lg:col-span-2">

          <div className="flex items-center rounded-xl border border-slate-300 px-4 py-3 focus-within:border-indigo-600">

            <Search className="mr-2 h-4 w-4 text-slate-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search beneficiary..."
              className="w-full bg-transparent text-sm outline-none"
            />

          </div>

        </div>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-indigo-600 focus:outline-none"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Blocked">Blocked</option>
        </select>

        {/* Bank */}

        <select
          value={bank}
          onChange={(e) => setBank(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-indigo-600 focus:outline-none"
        >
          <option value="All">All Banks</option>
          <option value="SBI">State Bank of India</option>
          <option value="HDFC">HDFC Bank</option>
          <option value="ICICI">ICICI Bank</option>
          <option value="Axis">Axis Bank</option>
        </select>

        {/* Date Range */}

        <div className="flex items-center rounded-xl border border-slate-300 px-3">

          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full bg-transparent py-3 text-sm outline-none"
          />

          <span className="mx-2 text-slate-400">
            —
          </span>

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full bg-transparent py-3 text-sm outline-none"
          />

        </div>

        {/* Reset */}

        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium transition hover:bg-slate-50"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>

      </div>

    </div>
  )
}
