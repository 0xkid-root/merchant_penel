'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
    Building2,
    Check,
    ChevronDown,
    Copy,
    Eye,
    Filter,
    Plus,
    Search,
    SlidersHorizontal,
    X,
} from 'lucide-react'
import { toast } from 'sonner'


import PageHeader from '@/components/layout/page-header'

import { DIRECT_PAYOUTS } from '../data/direct-payout-data'

import type {
    DirectPayoutItem,
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

function formatIndianCurrency(amount: number) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount)
}

function getStatusStyles(status: DirectPayoutStatus) {
    if (status === 'success') {
        return 'border border-emerald-200 bg-emerald-50 text-emerald-700'
    }

    if (status === 'pending') {
        return 'border border-amber-200 bg-amber-50 text-amber-700'
    }

    return 'border border-red-200 bg-red-50 text-red-700'
}

function getStatusLabel(status: DirectPayoutStatus) {
    if (status === 'success') return 'Success'
    if (status === 'pending') return 'Pending'
    return 'Failed'
}

function getInitials(name: string) {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word.charAt(0))
        .join('')
        .toUpperCase()
}

export default function DirectPayoutList() {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState<
        'all' | DirectPayoutStatus
    >('all')

    const [selectedPayout, setSelectedPayout] = useState<DirectPayoutItem | null>(null)
    const [copiedPayoutId, setCopiedPayoutId] = useState<string | null>(null)


    function getShortPayoutId(payoutId: string) {
        if (payoutId.length <= 10) return payoutId

        const firstPart = payoutId.slice(0, 3)
        const lastPart = payoutId.slice(-3)

        return `${firstPart}...${lastPart}`
    }

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

    const isCopied = copiedPayoutId === selectedPayout?.payoutId || false


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

            const matchesStatus =
                statusFilter === 'all' || payout.status === statusFilter

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
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
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
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1100px] border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50">
                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Payout ID
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Account Holder
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Bank Account
                                        </th>

                                        <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Amount
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Created At
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Status
                                        </th>

                                        <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-200 bg-white">
                                    {filteredPayouts.map((payout) => (
                                        <tr
                                            key={payout.id}
                                            className="transition hover:bg-slate-50/80"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedPayout(payout)}
                                                        className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700 hover:underline"
                                                        title={payout.payoutId}
                                                    >
                                                        {getShortPayoutId(payout.payoutId)}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={(event) =>
                                                            handleCopyPayoutId(event, payout.payoutId)
                                                        }
                                                        aria-label={`Copy ${payout.payoutId}`}
                                                        title={isCopied ? 'Copied' : 'Copy payout ID'}
                                                        className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600"
                                                    >
                                                        {isCopied ? (
                                                            <Check className="h-3.5 w-3.5 text-green-600" />
                                                        ) : (
                                                            <Copy className="h-3.5 w-3.5" />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                                                        {getInitials(payout.accountHolderName)}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p
                                                            title={payout.accountHolderName}
                                                            className="max-w-[230px] truncate text-sm font-semibold text-slate-900"
                                                        >
                                                            {payout.accountHolderName}
                                                        </p>

                                                        <p className="mt-0.5 text-xs text-slate-500">
                                                            Direct bank transfer
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="flex items-center gap-1.5 text-sm font-medium text-slate-900">
                                                    <Building2 className="h-4 w-4 shrink-0 text-slate-400" />
                                                    {payout.bankName}
                                                    <span className="text-slate-400">
                                                        {payout.maskedAccountNumber}
                                                    </span>
                                                </p>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    IFSC: {payout.ifscCode}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4 text-right">
                                                <p className="text-sm font-bold text-slate-900">
                                                    {formatIndianCurrency(payout.amount)}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    Debit: {formatIndianCurrency(payout.totalDebit)}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4 text-sm text-slate-600">
                                                {payout.createdAt}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyles(
                                                        payout.status,
                                                    )}`}
                                                >
                                                    {getStatusLabel(payout.status)}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedPayout(payout)}
                                                    aria-label={`View details for ${payout.payoutId}`}
                                                    title="View payout details"
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {selectedPayout ? (
                    <div className="fixed inset-0 z-50 flex items-end bg-slate-950/40 p-4 sm:items-center sm:justify-center">
                        <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                                        Direct Payout Details
                                    </p>

                                    <h3 className="mt-1 text-lg font-bold text-slate-900">
                                        {selectedPayout.payoutId}
                                    </h3>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSelectedPayout(null)}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                    aria-label="Close direct payout details"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="space-y-5 px-6 py-5">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <p className="text-xs font-medium text-slate-500">
                                            Account Holder
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-slate-900">
                                            {selectedPayout.accountHolderName}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-slate-500">
                                            Payout Status
                                        </p>

                                        <div className="mt-1">
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyles(
                                                    selectedPayout.status,
                                                )}`}
                                            >
                                                {getStatusLabel(selectedPayout.status)}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-slate-500">
                                            Bank Name
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-slate-900">
                                            {selectedPayout.bankName}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-slate-500">
                                            Bank Account
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-slate-900">
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
                                            Created At
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-slate-900">
                                            {selectedPayout.createdAt}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-slate-500">
                                            Payout Amount
                                        </p>

                                        <p className="mt-1 text-sm font-bold text-slate-900">
                                            {formatIndianCurrency(selectedPayout.amount)}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-slate-500">
                                            Total Debit
                                        </p>

                                        <p className="mt-1 text-sm font-bold text-indigo-600">
                                            {formatIndianCurrency(selectedPayout.totalDebit)}
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