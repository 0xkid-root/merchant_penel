'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Plus,
  Filter,
} from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


import PageHeader from '@/components/layout/page-header'
import Pagination from '@/components/common/pagination/Pagination'
import BulkPayoutDetailsModal from './bulk-payout-details-modal'
import PayoutWalletBalance from '../../components/payout-wallet-balance'
import { useWalletBalance } from '@/features/wallet/hooks/useWalletBalance'

import BulkPayoutTable from './bulk-payout-table'
import { BulkPayoutTableSkeleton } from './bulk-payout-table-skeleton'
import { useBulkPayoutList } from '../hook/useBulkPayoutList'

import type { BulkPayoutSummary } from '../types/bulk-payout.types'

export default function BulkPayoutList() {
  const router = useRouter()

  const [page, setPage] = useState(0)

  const { data: balance = 0 } = useWalletBalance()

  const { data, isLoading, isError } = useBulkPayoutList({
    page,
    size: 10,
  })

  const [selectedBatch, setSelectedBatch] = useState<BulkPayoutSummary | null>(null)

  const [copiedBatchId, setCopiedBatchId] = useState<string | null>(null)

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
      <div className="mx-auto max-w-[1440px] space-y-6">
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

        <PayoutWalletBalance
          balance={balance}
          className="w-full"
          onAddFunds={() => router.push('/add-funds')}
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
                {data?.totalElements || 0} Total Batches
              </p>
            </div>
          </div>

          {isLoading ? (
            <BulkPayoutTableSkeleton />
          ) : isError ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                Failed to load batches
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Please try again later.
              </p>
            </div>
          ) : !data?.content.length ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                <Filter className="h-5 w-5 text-slate-400" />
              </div>

              <h3 className="mt-4 text-base font-semibold text-slate-900">
                No bulk payout batches found
              </h3>
            </div>
          ) : (
            <>
              <BulkPayoutTable
                batches={data.content}
                copiedBatchId={copiedBatchId}
                onViewDetails={setSelectedBatch}
                onCopyBatchId={handleCopyBatchId}
              />
              <div className="border-t border-slate-200">
                <Pagination
                  page={data.number}
                  totalPages={data.totalPages}
                  totalElements={data.totalElements}
                  pageSize={data.size}
                  onPageChange={setPage}
                  itemName="batches"
                />
              </div>
            </>
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