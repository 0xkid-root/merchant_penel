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
  success: {
    label: 'Success',
    className: 'bg-green-100 text-green-700',
    icon: CheckCircle2,
  },
  pending: {
    label: 'Pending',
    className: 'bg-amber-100 text-amber-700',
    icon: Clock3,
  },
  processing: {
    label: 'Processing',
    className: 'bg-blue-100 text-blue-700',
    icon: Clock3,
  },
  failed: {
    label: 'Failed',
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
  const config = STATUS_CONFIG[status]
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