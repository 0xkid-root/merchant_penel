'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock3,
    IndianRupee,
    MoreVertical,
    Plus,
    Search,
    SlidersHorizontal,
    XCircle,
} from 'lucide-react'

import { PrimaryButton } from '@/components/buttons/primary-button'

import PayoutWalletBalance from '../../components/payout-wallet-balance'

import {
    formatIndianCurrency,
    formatPayoutDateTime,
    SINGLE_PAYOUT_TRANSACTIONS,
    SINGLE_PAYOUT_WALLET_BALANCE,
} from '../data/single-payout-data'

import type {
    PayoutStatus,
    SinglePayoutTransaction,
} from '../types/single-payout.types'

const STATUS_CONFIG: Record<
    PayoutStatus,
    {
        label: string
        className: string
        icon: typeof CheckCircle2
    }
> = {
    success: {
        label: 'Success',
        className: 'bg-green-100 text-green-600',
        icon: CheckCircle2,
    },
    pending: {
        label: 'Pending',
        className: 'bg-amber-100 text-amber-600',
        icon: Clock3,
    },
    processing: {
        label: 'Processing',
        className: 'bg-blue-100 text-blue-600',
        icon: Clock3,
    },
    failed: {
        label: 'Failed',
        className: 'bg-red-100 text-red-600',
        icon: XCircle,
    },
}

function PayoutStatusBadge({ status }: { status: PayoutStatus }) {
    const config = STATUS_CONFIG[status]

    return (
        <span
            className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${config.className}`}
        >
            {config.label}
        </span>
    )
}

function BeneficiaryAvatar({ name }: { name: string }) {
    const initials = name
        .split(' ')
        .slice(0, 2)
        .map((word) => word[0])
        .join('')
        .toUpperCase()

    return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-600">
            {initials}
        </div>
    )
}

function PayoutRow({
    transaction,
    onViewDetails,
}: {
    transaction: SinglePayoutTransaction
    onViewDetails: (payoutId: string) => void
}) {
    return (
        <tr className="border-b border-slate-200 transition hover:bg-slate-50">
            <td className="px-4 py-3 text-sm font-medium text-indigo-600">
                {transaction.payoutId}
            </td>

            <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                    <BeneficiaryAvatar name={transaction.beneficiaryName} />

                    <p className="text-sm font-medium text-slate-900">
                        {transaction.beneficiaryName}
                    </p>
                </div>
            </td>

            <td className="px-4 py-3">
                <p className="text-sm font-medium text-slate-900">
                    {transaction.bankName}{' '}
                    <span className="text-slate-500">
                        •••• {transaction.maskedAccountNumber.slice(-4)}
                    </span>
                </p>

                <p className="mt-1 text-xs text-slate-500">
                    IFSC: {transaction.ifscCode}
                </p>
            </td>

            <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                {formatIndianCurrency(transaction.amount)}
            </td>

            <td className="px-4 py-3 text-sm text-slate-600">
                {formatPayoutDateTime(transaction.createdAt)}
            </td>

            <td className="px-4 py-3">
                <PayoutStatusBadge status={transaction.status} />
            </td>

            <td className="px-4 py-3 text-center">
                <button
                    type="button"
                    //   onClick={() => onViewDetails(transaction.payoutId)}
                    className="rounded-lg p-2 transition hover:bg-slate-100"
                    aria-label={`View ${transaction.payoutId}`}
                >
                    <MoreVertical className="h-4 w-4 text-slate-500" />
                </button>
            </td>
        </tr>
    )
}

export default function SinglePayoutList() {
    const router = useRouter()

    const [searchValue, setSearchValue] = useState('')
    const [statusFilter, setStatusFilter] = useState<'all' | PayoutStatus>(
        'all',
    )
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

    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900">
                        Single Payout
                    </h1>

                    <p className="mt-2 text-base text-slate-500">
                        Send money to your saved beneficiaries securely.
                    </p>
                </div>

                <PrimaryButton onClick={handleCreatePayout}>
                    <Plus className="h-4 w-4" />
                    Single Payout
                </PrimaryButton>
            </div>

            <PayoutWalletBalance
                balance={SINGLE_PAYOUT_WALLET_BALANCE}
                className="w-full"
                onAddFunds={() => router.push('/add-funds')}
            />
            <div className="rounded-xl border border-slate-200 bg-white">
                <div className="border-b border-slate-200 px-6 py-5">
                    <h2 className="text-base font-semibold text-slate-900">
                        Recent Single Payouts
                    </h2>
                </div>

                <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="relative w-full lg:max-w-md">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                        <input
                            type="search"
                            value={searchValue}
                            onChange={(event) => {
                                setSearchValue(event.target.value)
                                setCurrentPage(1)
                            }}
                            placeholder="Search by payout ID, beneficiary, account number..."
                            className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <select
                            value={statusFilter}
                            onChange={(event) => {
                                setStatusFilter(event.target.value as 'all' | PayoutStatus)
                                setCurrentPage(1)
                            }}
                            className="h-11 min-w-36 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                        >
                            <option value="all">All Status</option>
                            <option value="success">Success</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="failed">Failed</option>
                        </select>

                        <button
                            type="button"
                            className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-300 text-slate-600 transition hover:bg-slate-50"
                            aria-label="More filters"
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1100px] border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Payout ID
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Beneficiary
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Bank Account
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Amount
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Created At
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((transaction) => (
                                    <PayoutRow
                                        key={transaction.payoutId}
                                        transaction={transaction}
                                        onViewDetails={handleViewDetails}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-4 py-16 text-center text-sm text-slate-500"
                                    >
                                        No single payouts found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col gap-4 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-500">
                        Showing {filteredTransactions.length} of{' '}
                        {SINGLE_PAYOUT_TRANSACTIONS.length} payouts
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>

                        {[1, 2, 3].map((page) => (
                            <button
                                key={page}
                                type="button"
                                onClick={() => setCurrentPage(page)}
                                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${page === currentPage
                                    ? 'border border-indigo-200 bg-indigo-50 text-indigo-600'
                                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            type="button"
                            onClick={() => setCurrentPage((page) => page + 1)}
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}