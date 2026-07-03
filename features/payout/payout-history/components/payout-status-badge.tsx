'use client'

import type { PayoutStatus } from '../types/payout-history.types'

interface PayoutStatusBadgeProps {
    status: PayoutStatus
}

const STATUS_CONFIG: Record<
    PayoutStatus,
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
}

export default function PayoutStatusBadge({
    status,
}: PayoutStatusBadgeProps) {
    const config = STATUS_CONFIG[status]

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${config.className}`}>
            {config.label}
        </span>
    )
}