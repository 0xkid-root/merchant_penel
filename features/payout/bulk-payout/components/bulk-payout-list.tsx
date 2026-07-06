'use client'

import { useMemo, useState } from 'react'
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
import BulkPayoutDetailsModal from './bulk-payout-details-modal'

import BulkPayoutTable from './direct-payout-table'
import { BULK_PAYOUT_BATCHES } from '../data/bulk-payout-data'

import type {
  BulkPayoutBatch,
  BulkPayoutStatus,
} from '../types/bulk-payout.types'

const STATUS_OPTIONS: Array<{
  value: 'all' | BulkPayoutStatus
  label: string
}> = [
  { value: 'all', label: 'All Status' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'PARTIALLY_FAILED', label: 'Partial Failed' },
  { value: 'FAILED', label: 'Failed' },
]

export default function BulkPayoutList() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | BulkPayoutStatus>(
    'all',
  )

  const [selectedBatch, setSelectedBatch] =
    useState<BulkPayoutBatch | null>(null)

  const [copiedBatchId, setCopiedBatchId] = useState<string | null>(null)

  const filteredBatches = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return BULK_PAYOUT_BATCHES.filter((batch) => {
      const matchesSearch =
        normalizedSearch === '' ||
        batch.id.toLowerCase().includes(normalizedSearch) ||
        batch.fileName.toLowerCase().includes(normalizedSearch)

      const matchesStatus = statusFilter === 'all' || batch.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter])

  const hasActiveFilters = search.trim() !== '' || statusFilter !== 'all'

  const clearFilters = () => {
    setSearch('')
    setStatusFilter('all')
  }

  const handleCopyBatchId = async (
    event: React.MouseEvent<HTMLButtonElement>,
    batchId: string,
  ) => {
    event.stopPropagation()

    try {
      await navigator.clipboard.writeText(batchId)

      setCopiedBatchId(batchId)
      toast.success('Batch ID copied to clipboard')

      window.setTimeout(() => {
        setCopiedBatchId(null)
      }, 1800)
    } catch {
      toast.error('Unable to copy batch ID')
    }
  }

  return (
    <div className="min-h-full bg-slate-50 px-4 py-5 lg:px-6">
      <div className="mx-auto max-w-[1440px]">
        <PageHeader
          title="Bulk Payout"
          subtitle="Upload, manage, and track payout batches for multiple beneficiaries."
          actions={
            <Link
              href="/payout/bulk/create"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              Create Bulk Payout
            </Link>
          }
        />

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-5 lg:px-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Bulk Payout Batches
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View and track uploaded bulk payout files.
                </p>
              </div>

              <p className="text-sm font-medium text-slate-500">
                Showing {filteredBatches.length} batch
                {filteredBatches.length !== 1 ? 'es' : ''}
              </p>
            </div>
          </div>

          <div className="border-b border-slate-200 bg-slate-50/60 px-5 py-4 lg:px-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search batch ID or file name..."
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

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(
                        event.target.value as 'all' | BulkPayoutStatus,
                      )
                    }
                    className="h-11 w-full appearance-none rounded-xl border border-slate-300 bg-white py-0 pl-10 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:w-48"
                  >
                    {STATUS_OPTIONS.map((option) => (
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

          {filteredBatches.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                <Filter className="h-5 w-5 text-slate-400" />
              </div>

              <h3 className="mt-4 text-base font-semibold text-slate-900">
                No bulk payout batches found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or status filter.
              </p>
            </div>
          ) : (
            <BulkPayoutTable
              batches={filteredBatches}
              copiedBatchId={copiedBatchId}
              onViewDetails={setSelectedBatch}
              onCopyBatchId={handleCopyBatchId}
            />
          )}
        </div>

        <BulkPayoutDetailsModal
          batch={selectedBatch}
          onClose={() => setSelectedBatch(null)}
        /> 
        
        {/* Modal will be connected in the next step */}
        {selectedBatch ? null : null}
      </div>
    </div>
  )
}