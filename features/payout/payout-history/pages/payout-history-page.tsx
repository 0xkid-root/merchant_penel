'use client'

import { useState } from 'react'
import {
  ChevronDown,
  Filter,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import PageHeader from '@/components/layout/page-header'
import Pagination from '@/components/common/pagination/Pagination'

import PayoutHistoryTable from '../components/payout-history-table'
import { usePayoutHistoryList } from '../hooks/usePayoutHistoryList'
import type { PayoutHistoryTransaction } from '../types/payout-history.types'
import { formatCurrency } from '@/lib/utils/formatCurrency'



export default function PayoutHistoryPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)

  const [selectedPayout, setSelectedPayout] = useState<PayoutHistoryTransaction | null>(null)

  const { data: historyData, isLoading, isError } = usePayoutHistoryList({
    page,
    size,
    search: search.trim() !== '' ? search.trim() : undefined,
    status: statusFilter !== 'ALL' ? statusFilter : undefined,
    payoutType: typeFilter !== 'ALL' ? typeFilter : undefined,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
  })

  const transactions = historyData?.content || []

  const hasActiveFilters =
    search.trim() !== '' ||
    statusFilter !== 'ALL' ||
    typeFilter !== 'ALL' ||
    fromDate !== '' ||
    toDate !== ''

  const clearFilters = () => {
    setSearch('')
    setStatusFilter('ALL')
    setTypeFilter('ALL')
    setFromDate('')
    setToDate('')
  }

  return (
    <div className="min-h-full bg-slate-50 px-4 py-5 lg:px-6">
      <div className="mx-auto max-w-[1440px]">

        <PageHeader
          title="Payout History"
          subtitle="View and track all single, direct, and bulk payout transactions."
          
        />
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
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
                Showing {historyData?.totalElements || 0} transaction
                {historyData?.totalElements !== 1 ? 's' : ''}
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
                      setTypeFilter(event.target.value)
                    }
                    className="h-11 w-full appearance-none rounded-xl border border-slate-300 bg-white py-0 pl-10 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:w-44"
                  >
                    <option value="ALL">All Types</option>
                    <option value="SINGLE">Single Payout</option>
                    <option value="DIRECT">Direct Payout</option>
                    <option value="BULK">Bulk Payout</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>

                <div className="relative">
                  <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(event.target.value)
                    }
                    className="h-11 w-full appearance-none rounded-xl border border-slate-300 bg-white py-0 pl-10 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:w-40"
                  >
                    <option value="ALL">All Status</option>
                    <option value="SUCCESS">Success</option>
                    <option value="PENDING">Pending</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="FAILED">Failed</option>
                    <option value="REJECTED">Rejected</option>
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

          {isLoading ? (
            <div className="flex min-h-64 items-center justify-center">Loading transactions...</div>
          ) : isError ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center text-red-500">
              Failed to load transactions.
            </div>
          ) : transactions.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                No transactions found
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <>
              <PayoutHistoryTable
                transactions={transactions}
                copiedPayoutId={null}
                onCopyPayoutId={() => {}}
              />
              
              {/* Pagination Controls */}
              {historyData && historyData.totalPages > 1 && (
                <Pagination
                  page={page}
                  totalPages={historyData.totalPages}
                  totalElements={historyData.totalElements}
                  pageSize={size}
                  onPageChange={setPage}
                  itemName="transactions"
                />
              )}
            </>
          )}
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
                    {selectedPayout.transactionId}
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
                      {selectedPayout.accountNumber}
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
                      {formatCurrency(selectedPayout.amount)}
                    </p>
                  </div>
                </div>
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