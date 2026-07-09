'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import PayoutWalletBalance from '../../components/payout-wallet-balance'

import {
  SINGLE_PAYOUT_TRANSACTIONS,
  SINGLE_PAYOUT_WALLET_BALANCE,
} from '../data/single-payout-data'

import type { PayoutStatus } from '../types/single-payout.types'

import SinglePayoutFilters from './single-payout-filters'
import SinglePayoutHeader from './single-payout-header'
import SinglePayoutPagination from './single-payout-pagination'
import SinglePayoutTable from './single-payout-table'

export default function SinglePayoutList() {
  const router = useRouter()

  const [searchValue, setSearchValue] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | PayoutStatus>('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredTransactions = useMemo(() => {
    const query = searchValue.trim().toLowerCase()

    return SINGLE_PAYOUT_TRANSACTIONS.filter((transaction) => {
      const matchesSearch =
        query.length === 0 ||
        transaction.payoutId.toLowerCase().includes(query) ||
        transaction.beneficiaryName.toLowerCase().includes(query) ||
        transaction.bankName.toLowerCase().includes(query) ||
        transaction.maskedAccountNumber.toLowerCase().includes(query)

      const matchesStatus =
        statusFilter === 'all' || transaction.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [searchValue, statusFilter])

  const handleCreatePayout = () => {
    router.push('/payout/single/create')
  }

  const handleViewDetails = (payoutId: string) => {
    router.push(`/payouts/${payoutId}`)
  }

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    setCurrentPage(1)
  }

  const handleStatusChange = (value: 'all' | PayoutStatus) => {
    setStatusFilter(value)
    setCurrentPage(1)
  }

  return (
    <div className="min-w-0 space-y-6 p-4 sm:p-6 lg:p-8">
      <SinglePayoutHeader onCreatePayout={handleCreatePayout} />

      <PayoutWalletBalance
        balance={SINGLE_PAYOUT_WALLET_BALANCE}
        className="w-full"
        onAddFunds={() => router.push('/add-funds')}
      />

      <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
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

        <SinglePayoutTable
          transactions={filteredTransactions}
          onViewDetails={handleViewDetails}
        />

        <SinglePayoutPagination
          currentPage={currentPage}
          totalItems={filteredTransactions.length}
          totalPayouts={SINGLE_PAYOUT_TRANSACTIONS.length}
          onPageChange={setCurrentPage}
        />
      </section>
    </div>
  )
}