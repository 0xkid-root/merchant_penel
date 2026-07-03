import type { PayoutType } from '../types/payout-history.types'

export function getShortPayoutId(payoutId: string) {
  if (payoutId.length <= 10) return payoutId

  const firstPart = payoutId.slice(0, 3)
  const lastPart = payoutId.slice(-3)

  return `${firstPart}...${lastPart}`
}

export function getPayoutTypeLabel(type: PayoutType) {
  if (type === 'single') return 'Single'
  if (type === 'direct') return 'Direct'
  return 'Bulk'
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
}