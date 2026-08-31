import { CheckCircle2, Clock3, XCircle } from 'lucide-react'

import { BulkPayoutStatus } from '../types/bulk-payout.types'



export function getStatusConfig(status: BulkPayoutStatus) {
  if (status === 'SUCCESS') {
    return {
      label: 'Success',
      icon: CheckCircle2,
      iconClass: 'text-emerald-600',
      badgeClass: 'border border-emerald-200 bg-emerald-50 text-emerald-700',
      panelClass: 'border-emerald-100 bg-emerald-50/60',
    }
  }

  if (status === 'PROCESSING') {
    return {
      label: 'Processing',
      icon: Clock3,
      iconClass: 'text-amber-600',
      badgeClass: 'border border-amber-200 bg-amber-50 text-amber-700',
      panelClass: 'border-amber-100 bg-amber-50/60',
    }
  }

  if (status === 'PENDING') {
    return {
      label: 'Pending',
      icon: Clock3,
      iconClass: 'text-orange-600',
      badgeClass: 'border border-orange-200 bg-orange-50 text-orange-700',
      panelClass: 'border-orange-100 bg-orange-50/60',
    }
  }

  return {
    label: 'Failed',
    icon: XCircle,
    iconClass: 'text-red-600',
    badgeClass: 'border border-red-200 bg-red-50 text-red-700',
    panelClass: 'border-red-100 bg-red-50/60',
  }
}