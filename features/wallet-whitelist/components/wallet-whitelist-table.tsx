'use client'

import { useMemo, useState } from 'react'
import {
  CheckCircle2,
  Clock3,
  Filter,
  Search,
  SlidersHorizontal,
  X,
  XCircle,
  Eye,
} from 'lucide-react'
import Link from 'next/link'

import { SecondaryButton } from '@/components/buttons/secondary-button'
import Pagination from '@/components/common/pagination/Pagination'
import { useWalletWhitelistList } from '../hooks/useWalletWhitelistList'
import WalletWhitelistTableSkeleton from './wallet-whitelist-table-skeleton'
import { WalletWhitelistStatus } from '../types/wallet-whitelist.types'

export default function WalletWhitelistTable() {
  const [page, setPage] = useState(0)
  const size = 10
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'Approved' | 'Pending' | 'Rejected'>('all')

  const { data, isLoading, isFetching, isError } = useWalletWhitelistList({
    page,
    size,
  })

  const rawData = data?.data.content ?? []

  const filteredData = useMemo(() => {
    const query = search.trim().toLowerCase()

    return rawData.filter((item) => {
      const matchesSearch =
        query.length === 0 ||
        item.bankName.toLowerCase().includes(query) ||
        item.verifiedAccountName.toLowerCase().includes(query) ||
        item.accountNumber.toLowerCase().includes(query) ||
        item.ifscCode.toLowerCase().includes(query)

      const matchesStatus =
        statusFilter === 'all' || item.status.toUpperCase() === statusFilter.toUpperCase()

      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter, rawData])

  const hasActiveFilters = search.trim() !== '' || statusFilter !== 'all'

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(0)
  }

  const handleStatusChange = (value: 'all' | 'Approved' | 'Pending' | 'Rejected') => {
    setStatusFilter(value)
    setPage(0)
  }

  const handleClearFilters = () => {
    setSearch('')
    setStatusFilter('all')
    setPage(0)
  }

  const getStatusBadge = (status: WalletWhitelistStatus) => {
    if (status === 'APPROVED') {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Approved
        </span>
      )
    }

    if (status === 'PENDING') {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
          <Clock3 className="h-3.5 w-3.5" />
          Pending
        </span>
      )
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
        <XCircle className="h-3.5 w-3.5" />
        Rejected
      </span>
    )
  }

  if (isLoading || isFetching) {
    return <WalletWhitelistTableSkeleton />
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
        <p className="text-sm font-medium text-slate-500">Failed to load wallet whitelist.</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-5 lg:px-6">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Whitelisted Bank Accounts
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View and manage bank accounts approved for wallet transactions.
            </p>
          </div>

          <p className="text-sm font-medium text-slate-500">
            Showing {data?.data.totalElements ?? 0} account
            {data?.data.totalElements !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-slate-50/60 px-5 py-4 lg:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search bank, account holder, IFSC..."
              className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

            {search ? (
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <select
                value={statusFilter}
                onChange={(event) =>
                  handleStatusChange(
                    event.target.value as 'all' | 'Approved' | 'Pending' | 'Rejected',
                  )
                }
                className="h-11 w-full appearance-none rounded-xl border border-slate-300 bg-white py-0 pl-10 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:w-44"
              >
                <option value="all">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {hasActiveFilters ? (
              <SecondaryButton onClick={handleClearFilters}>
                <X className="h-4 w-4" />
                Clear
              </SecondaryButton>
            ) : (
              <SecondaryButton>
                <Filter className="h-4 w-4" />
                Filter
              </SecondaryButton>
            )}
          </div>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
            <Filter className="h-5 w-5 text-slate-400" />
          </div>

          <h3 className="mt-4 text-base font-semibold text-slate-900">
            No bank accounts found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try changing your search or status filter.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Bank Name
                </th>

                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Verified Account Name
                </th>

                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Account Number
                </th>

                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  IFSC
                </th>

                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="whitespace-nowrap px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredData.map((bank) => (
                <tr
                  key={bank.id}
                  className="transition hover:bg-slate-50/80"
                >
                  <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-900">
                    {bank.bankName}
                  </td>

                  <td className="px-5 py-4">
                    <p className="max-w-[220px] truncate text-sm font-medium text-slate-900">
                      {bank.verifiedAccountName}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-700">
                    {bank.accountNumber}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-indigo-600">
                    {bank.ifscCode}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    {getStatusBadge(bank.status)}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <Link
                      href={`/wallet-whitelist/${bank.id}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
                      aria-label={`View ${bank.verifiedAccountName}`}
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="border-t border-slate-200">
        <Pagination
          page={page}
          totalPages={data?.data.totalPages ?? 0}
          totalElements={data?.data.totalElements ?? 0}
          pageSize={size}
          itemName="bank accounts"
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}