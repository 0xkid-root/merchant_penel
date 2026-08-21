export const SINGLE_PAYOUT_MIN_AMOUNT = 100
export const SINGLE_PAYOUT_MAX_AMOUNT = 500000
export const SINGLE_PAYOUT_CHARGES = 0 // Assuming 0 for now, or fetch from config

export const formatIndianCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount)
}

export const calculateSinglePayoutTotalDebit = (amount: number) => {
  return amount + SINGLE_PAYOUT_CHARGES
}

export const formatPayoutDateTime = (date: string) => {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}
