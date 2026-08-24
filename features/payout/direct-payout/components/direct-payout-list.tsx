'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ChevronDown,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { toast } from 'sonner'

import PageHeader from '@/components/layout/page-header'

import DirectPayoutTable from './direct-payout-table'
import DirectPayoutDetailsModal from './direct-payout-details-modal'

import { useDirectPayoutList } from '../hooks/useDirectPayoutList'

import type {
  DirectPayoutTransaction,
  DirectPayoutStatus,
} from '../types/direct-payout.types'

const STATUS_OPTIONS: Array<{
  value: 'all' | DirectPayoutStatus
  label: string
}> = [
  { value: 'all', label: 'All Status' },
  { value: 'success', label: 'Success' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
]

export default function DirectPayoutList() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<
    'all' | string
  >('all')
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)

  // Reset to first page when search or status filters change
  useEffect(() => {
    setPage(0)
  }, [search, statusFilter])

  const { data: payoutsData, isLoading, isError } = useDirectPayoutList({
    page,
    size,
    search: search.trim() !== '' ? search.trim() : undefined,
    status: statusFilter !== 'all' ? statusFilter.toUpperCase() : undefined
  })

  const payouts = payoutsData?.content || []

  const [selectedPayout, setSelectedPayout] =
    useState<DirectPayoutTransaction | null>(null)

  const [copiedPayoutId, setCopiedPayoutId] = useState<string | null>(null)

  const handleCopyPayoutId = async (
    event: React.MouseEvent<HTMLButtonElement>,
    payoutId: string,
  ) => {
    event.stopPropagation()

    try {
      await navigator.clipboard.writeText(payoutId)

      setCopiedPayoutId(payoutId)
      toast.success('Payout ID copied to clipboard')

      window.setTimeout(() => {
        setCopiedPayoutId(null)
      }, 1800)
    } catch {
      toast.error('Unable to copy payout ID')
    }
  }

  const filteredPayouts = payouts

  const hasActiveFilters = search.trim() !== '' || statusFilter !== 'all'

  const clearFilters = () => {
    setSearch('')
    setStatusFilter('all')
  }

  return (
    <div className="min-w-0 space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Direct Payout"
        subtitle="Create and manage payouts made directly to bank accounts."
        actions={
          <Link
            href="/payout/direct/create"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Direct Payout
          </Link>
        }
      />

      <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-4 py-5 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Direct Payout Transactions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View and track all manually created bank account payouts.
              </p>
            </div>

            <p className="text-sm font-medium text-slate-500">
              Showing {payoutsData?.totalElements || 0} payout
              {payoutsData?.totalElements !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="border-b border-slate-200 bg-slate-50/60 px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search payout ID, account holder, bank..."
                className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative w-full sm:w-44">
                <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value,
                    )
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-slate-300 bg-white py-0 pl-10 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:w-auto"
                >
                  <X className="h-4 w-4" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
            <h3 className="mt-4 text-base font-semibold text-slate-900">
              Loading payouts...
            </h3>
          </div>
        ) : isError ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center text-red-500">
             Failed to load payouts.
          </div>
        ) : filteredPayouts.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
              <Filter className="h-5 w-5 text-slate-400" />
            </div>

            <h3 className="mt-4 text-base font-semibold text-slate-900">
              No direct payouts found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          <>
            <DirectPayoutTable
              payouts={filteredPayouts}
              copiedPayoutId={copiedPayoutId}
              onViewDetails={setSelectedPayout}
              onCopyPayoutId={handleCopyPayoutId}
            />
            {payoutsData && payoutsData.totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 sm:px-6">
                 <div className="flex flex-1 justify-between sm:hidden">
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={page === 0}
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page >= payoutsData.totalPages - 1}
                      className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{page * size + 1}</span> to <span className="font-medium">{Math.min((page + 1) * size, payoutsData.totalElements)}</span> of{' '}
                        <span className="font-medium">{payoutsData.totalElements}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                          onClick={() => setPage(page - 1)}
                          disabled={page === 0}
                          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                        >
                          <span className="sr-only">Previous</span>
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setPage(page + 1)}
                          disabled={page >= payoutsData.totalPages - 1}
                          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                        >
                          <span className="sr-only">Next</span>
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  </div>
              </div>
            )}
          </>
        )}
      </section>

      <DirectPayoutDetailsModal
        payout={selectedPayout}
        onClose={() => setSelectedPayout(null)}
      />
    </div>
  )
}