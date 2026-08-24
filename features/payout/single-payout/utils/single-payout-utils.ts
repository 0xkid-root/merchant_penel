export const SINGLE_PAYOUT_MIN_AMOUNT = 100
export const SINGLE_PAYOUT_MAX_AMOUNT = 500000
export const SINGLE_PAYOUT_CHARGES = 0 // Assuming 0 for now, or fetch from config



export const calculateSinglePayoutTotalDebit = (amount: number) => {
  return amount + SINGLE_PAYOUT_CHARGES
}

