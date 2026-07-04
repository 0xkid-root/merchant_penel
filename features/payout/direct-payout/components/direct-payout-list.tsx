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
import DirectPayoutTable from './direct-payout-table'
import DirectPayoutDetailsModal from './direct-payout-details-modal'

import {
    formatIndianCurrency,
    getDirectPayoutStatusLabel,
    getDirectPayoutStatusStyles,
} from '../utils/direct-payout.utils'


import PageHeader from '@/components/layout/page-header'

import { DIRECT_PAYOUTS } from '../data/direct-payout-data'

import type { DirectPayoutItem, DirectPayoutStatus, } from '../types/direct-payout.types'

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
    const [statusFilter, setStatusFilter] = useState<'all' | DirectPayoutStatus>('all')

    const [selectedPayout, setSelectedPayout] = useState<DirectPayoutItem | null>(null)
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


    const filteredPayouts = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase()

        return DIRECT_PAYOUTS.filter((payout) => {
            const matchesSearch =
                normalizedSearch === '' ||
                payout.payoutId.toLowerCase().includes(normalizedSearch) ||
                payout.accountHolderName.toLowerCase().includes(normalizedSearch) ||
                payout.bankName.toLowerCase().includes(normalizedSearch) ||
                payout.maskedAccountNumber.toLowerCase().includes(normalizedSearch) ||
                payout.ifscCode.toLowerCase().includes(normalizedSearch)

            const matchesStatus = statusFilter === 'all' || payout.status === statusFilter
            return matchesSearch && matchesStatus
        })
    }, [search, statusFilter])

    const hasActiveFilters = search.trim() !== '' || statusFilter !== 'all'

    const clearFilters = () => {
        setSearch('')
        setStatusFilter('all')
    }

    return (
        <div className="min-h-full bg-slate-50 px-4 py-5 lg:px-6">
            <div className="mx-auto max-w-[1440px]">
                <PageHeader
                    title="Direct Payout"
                    subtitle="Create and manage payouts made directly to bank accounts."
                    actions={
                        <Link
                            href="/payout/direct/create"
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700">
                            <Plus className="h-4 w-4" />
                            Direct Payout
                        </Link>
                    }
                />

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <div className="border-b border-slate-200 px-5 py-5 lg:px-6">
                        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                            <div>
                                <h2 className="text-base font-semibold text-slate-900">
                                    Direct Payout Transactions
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    View and track all manually created bank account payouts.
                                </p>
                            </div>

                            <p className="text-sm font-medium text-slate-500">
                                Showing {filteredPayouts.length} payout
                                {filteredPayouts.length !== 1 ? 's' : ''}
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
                                    placeholder="Search payout ID, account holder, bank..."
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
                                                event.target.value as 'all' | DirectPayoutStatus,
                                            )
                                        }
                                        className="h-11 w-full appearance-none rounded-xl border border-slate-300 bg-white py-0 pl-10 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:w-44"
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

                    {filteredPayouts.length === 0 ? (
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
                        <DirectPayoutTable
                            payouts={filteredPayouts}
                            copiedPayoutId={copiedPayoutId}
                            onViewDetails={setSelectedPayout}
                            onCopyPayoutId={handleCopyPayoutId}
                        />
                    )}
                </div>
                <DirectPayoutDetailsModal
                    payout={selectedPayout}
                    onClose={() => setSelectedPayout(null)}
                />
            </div>
        </div>
    )
}