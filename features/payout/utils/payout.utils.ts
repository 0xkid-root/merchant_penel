
export function getPayoutStatusLabel(status: string) {
  const s = status?.toLowerCase()
  if (s === 'success') return 'Success'
  if (s === 'pending') return 'Pending'
  return 'Failed'
}

export function getPayoutStatusStyles(status: string) {
  const s = status?.toLowerCase()
  if (s === 'success') {
    return 'border border-emerald-200 bg-emerald-50 text-emerald-700'
  }

  if (s === 'pending') {
    return 'border border-amber-200 bg-amber-50 text-amber-700'
  }

  return 'border border-red-200 bg-red-50 text-red-700'
}

export function maskAccountNumber(accountNumber: string) {
  if (!accountNumber || accountNumber.length < 4) return accountNumber
  return `XXXX-XXXX-${accountNumber.slice(-4)}`
}


