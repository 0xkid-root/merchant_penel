'use client'

import type { PayoutStatus } from '../types/payout-history.types'

interface PayoutStatusBadgeProps {
    status: PayoutStatus
}

const STATUS_CONFIG: Record<
    string,
    {
        label: string
        className: string
    }
> = {
    success: {
        label: 'Success',
        className: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    },
    pending: {
        label: 'Pending',
        className: 'bg-amber-50 text-amber-700 ring-amber-100',
    },
    failed: {
        label: 'Failed',
        className: 'bg-red-50 text-red-700 ring-red-100',
    },
    processing: {
        label: 'Processing',
        className: 'bg-indigo-50 text-indigo-700 ring-indigo-100',
    },
    rejected: {
        label: 'Rejected',
        className: 'bg-rose-50 text-rose-700 ring-rose-100',
    },
}

export default function PayoutStatusBadge({
    status,
}: PayoutStatusBadgeProps) {
    const normalizedStatus = status?.toLowerCase() || 'pending'
    const config = STATUS_CONFIG[normalizedStatus] || STATUS_CONFIG.pending

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${config.className}`}>
            {config.label}
        </span>
    )
}