import type { DirectPayoutStatus } from '../types/direct-payout.types'

export function formatIndianCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function getDirectPayoutStatusLabel(status: DirectPayoutStatus) {
  if (status === 'success') return 'Success'
  if (status === 'pending') return 'Pending'
  return 'Failed'
}

export function getDirectPayoutStatusStyles(status: DirectPayoutStatus) {
  if (status === 'success') {
    return 'border border-emerald-200 bg-emerald-50 text-emerald-700'
  }

  if (status === 'pending') {
    return 'border border-amber-200 bg-amber-50 text-amber-700'
  }

  return 'border border-red-200 bg-red-50 text-red-700'
}