'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import PayoutWalletBalance from '../../components/payout-wallet-balance'

import { SINGLE_PAYOUT_WALLET_BALANCE } from '../data/single-payout-data'
import { useSinglePayoutList } from '../hooks/useSinglePayoutList'

import type { PayoutStatus } from '../types/single-payout.types'

import SinglePayoutFilters from './single-payout-filters'
import { Plus } from 'lucide-react'
import { PrimaryButton } from '@/components/buttons/primary-button'
import PageHeader from '@/components/layout/page-header'
import SinglePayoutTable from './single-payout-table'
import Pagination from '@/components/common/pagination/Pagination'
import { SinglePayoutTableSkeleton } from './single-payout-table-skeleton'

export default function SinglePayoutList() {
  const router = useRouter()

  const [searchValue, setSearchValue] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | PayoutStatus>('all')
  const [page, setPage] = useState(0)

  const apiStatus = statusFilter === 'all' ? undefined : statusFilter

  const { data: payoutListResponse, isLoading } = useSinglePayoutList({ 
    page, 
    size: 10,
    search: searchValue,
    status: apiStatus
  })

  const handleCreatePayout = () => {
    router.push('/payout/single/create')
  }

  const handleViewDetails = (payoutId: number) => {
    router.push(`/payout/single/${payoutId}`)
  }

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    setPage(0)
  }

  const handleStatusChange = (value: 'all' | PayoutStatus) => {
    setStatusFilter(value)
    setPage(0)
  }

  return (
    <div className="min-w-0 space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Single Payout"
        subtitle="Send money to your saved beneficiaries securely."
        actions={
          <PrimaryButton
            onClick={handleCreatePayout}
            className="h-11 w-full justify-center sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Single Payout
          </PrimaryButton>
        }
      />

      <PayoutWalletBalance
        balance={SINGLE_PAYOUT_WALLET_BALANCE}
        className="w-full"
        onAddFunds={() => router.push('/add-funds')}
      />

      <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-4 py-5 sm:px-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Single Payouts
          </h2>
        </div>

        <SinglePayoutFilters
          searchValue={searchValue}
          statusFilter={statusFilter}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onMoreFilters={() => console.log('Open more filters')}
        />

        {isLoading ? (
          <SinglePayoutTableSkeleton />
        ) : (
          <SinglePayoutTable
            transactions={payoutListResponse?.content ?? []}
            onViewDetails={handleViewDetails}
          />
        )}

        {payoutListResponse && (
          <Pagination
            page={payoutListResponse.number}
            totalPages={payoutListResponse.totalPages}
            totalElements={payoutListResponse.totalElements}
            pageSize={payoutListResponse.size}
            onPageChange={setPage}
            itemName="payouts"
          />
        )}
      </section>
    </div>
  )
}