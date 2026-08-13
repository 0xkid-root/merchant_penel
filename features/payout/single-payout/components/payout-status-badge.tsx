'use client'

import { CheckCircle2, Clock3, XCircle } from 'lucide-react'

import type { PayoutStatus } from '../types/single-payout.types'

const STATUS_CONFIG: Record<
  PayoutStatus,
  {
    label: string
    className: string
    icon: typeof CheckCircle2
  }
> = {
  SUCCESS: {
    label: 'Success',
    className: 'bg-green-100 text-green-700',
    icon: CheckCircle2,
  },
  PENDING: {
    label: 'Pending',
    className: 'bg-amber-100 text-amber-700',
    icon: Clock3,
  },
  PROCESSING: {
    label: 'Processing',
    className: 'bg-blue-100 text-blue-700',
    icon: Clock3,
  },
  FAILED: {
    label: 'Failed',
    className: 'bg-red-100 text-red-700',
    icon: XCircle,
  },
  REJECTED: {
    label: 'Rejected',
    className: 'bg-red-100 text-red-700',
    icon: XCircle,
  },
}

interface PayoutStatusBadgeProps {
  status: PayoutStatus
}

export default function PayoutStatusBadge({
  status,
}: PayoutStatusBadgeProps) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING
  const Icon = config.icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-semibold ${config.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  )
}