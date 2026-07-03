'use client'

import { useMemo, useState } from 'react'
import { PAYOUT_HISTORY_DATA } from '../data/payout-history-data'
import type {PayoutHistoryItem, PayoutStatus,PayoutType,} from '../types/payout-history.types'

type StatusFilter = 'all' | PayoutStatus
type TypeFilter = 'all' | PayoutType

export function usePayoutHistory() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [selectedPayout, setSelectedPayout] = useState<PayoutHistoryItem | null>(null)

  const payouts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return PAYOUT_HISTORY_DATA.filter((payout) => {
      const matchesSearch =
        !normalizedSearch ||
        payout.payoutId.toLowerCase().includes(normalizedSearch) ||
        payout.beneficiaryName.toLowerCase().includes(normalizedSearch) ||
        payout.accountHolderName.toLowerCase().includes(normalizedSearch) ||
        payout.maskedAccountNumber.toLowerCase().includes(normalizedSearch)

      const matchesStatus =statusFilter === 'all' || payout.status === statusFilter
      const matchesType =typeFilter === 'all' || payout.payoutType === typeFilter
      return matchesSearch && matchesStatus && matchesType

    })
  }, [search, statusFilter, typeFilter])

  return {
    payouts,
    search,
    statusFilter,
    typeFilter,
    selectedPayout,

    setSearch,
    setStatusFilter,
    setTypeFilter,
    setSelectedPayout,
  }
}