'use client'

import { useMemo } from 'react'
import {
  ChevronDown,
  Filter,
  History,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'

import  PayoutHistoryTable  from '../components/payout-history-table'

import { usePayoutHistory } from '../hooks/use-payout-history'

import type {
  PayoutStatus,
  PayoutType,
} from '../types/payout-history.types'

const PAYOUT_TYPE_OPTIONS: Array<{
  value: 'all' | PayoutType
  label: string
}> = [
  { value: 'all', label: 'All Types' },
  { value: 'single', label: 'Single Payout' },
  { value: 'direct', label: 'Direct Payout' },
  { value: 'bulk', label: 'Bulk Payout' },
]

const PAYOUT_STATUS_OPTIONS: Array<{
  value: 'all' | PayoutStatus
  label: string
}> = [
  { value: 'all', label: 'All Status' },
  { value: 'success', label: 'Success' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
]

export default function PayoutHistoryPage() {
  const {
    payouts,
    search,
    statusFilter,
    typeFilter,
    selectedPayout,
    setSearch,
    setStatusFilter,
    setTypeFilter,
    setSelectedPayout,
  } = usePayoutHistory()

  const hasActiveFilters =
    search.trim() !== '' ||
    statusFilter !== 'all' ||
    typeFilter !== 'all'

  const summaryText = useMemo(() => {
    if (payouts.length === 1) {
      return 'Showing 1 payout'
    }

    return `Showing ${payouts.length} payouts`
  }, [payouts.length])

  const clearFilters = () => {
    setSearch('')
    setStatusFilter('all')
    setTypeFilter('all')
  }

  return (
    <div className="min-h-full bg-slate-50 px-4 py-5 lg:px-6">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100">
                <History className="h-5 w-5 text-indigo-600" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Payout History
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  View and track all single, direct, and bulk payout
                  transactions.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-medium text-slate-500">
              Total Transactions
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {payouts.length}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-5 lg:px-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  All Payout Transactions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Search and filter payout records by type or status.
                </p>
              </div>

              <p className="text-sm font-medium text-slate-500">
                {summaryText}
              </p>
            </div>
          </div>

          <div className="border-b border-slate-200 bg-slate-50/60 px-5 py-4 lg:px-6">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="relative w-full xl:max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search payout ID, beneficiary, account number..."
                  className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />

                {search ? (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : null}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative">
                  <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <select
                    value={typeFilter}
                    onChange={(event) =>
                      setTypeFilter(
                        event.target.value as 'all' | PayoutType,
                      )
                    }
                    className="h-11 w-full appearance-none rounded-xl border border-slate-300 bg-white py-0 pl-10 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:w-44"
                  >
                    {PAYOUT_TYPE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>

                <div className="relative">
                  <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(
                        event.target.value as 'all' | PayoutStatus,
                      )
                    }
                    className="h-11 w-full appearance-none rounded-xl border border-slate-300 bg-white py-0 pl-10 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:w-40"
                  >
                    {PAYOUT_STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>

                {hasActiveFilters ? (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                    Clear
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          <PayoutHistoryTable
            payouts={payouts}
            onViewDetails={(payout:any) => setSelectedPayout(payout)}
          />
        </div>

        {selectedPayout ? (
          <div className="fixed inset-0 z-50 flex items-end bg-slate-950/40 p-4 sm:items-center sm:justify-center">
            <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                    Payout Details
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-slate-900">
                    {selectedPayout.payoutId}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPayout(null)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Close payout details"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-5 px-6 py-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Beneficiary
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {selectedPayout.beneficiaryName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Payout Type
                    </p>

                    <p className="mt-1 text-sm font-semibold capitalize text-slate-900">
                      {selectedPayout.payoutType} payout
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Bank Account
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {selectedPayout.bankName}{' '}
                      {selectedPayout.maskedAccountNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      IFSC Code
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {selectedPayout.ifscCode}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Payout Amount
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      ₹{selectedPayout.amount.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Total Debit
                    </p>

                    <p className="mt-1 text-sm font-bold text-indigo-600">
                      ₹{selectedPayout.totalDebit.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                {selectedPayout.remarks ? (
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-medium text-slate-500">
                      Remarks
                    </p>

                    <p className="mt-1 text-sm text-slate-700">
                      {selectedPayout.remarks}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="flex justify-end border-t border-slate-200 px-6 py-4">
                <button
                  type="button"
                  onClick={() => setSelectedPayout(null)}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}