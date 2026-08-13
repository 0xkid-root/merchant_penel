import type {
  SinglePayoutBeneficiary,
  SinglePayoutTransaction,
} from '../types/single-payout.types'

export const SINGLE_PAYOUT_WALLET_BALANCE = 125000

export const SINGLE_PAYOUT_MIN_AMOUNT = 1
export const SINGLE_PAYOUT_MAX_AMOUNT = 50000

export const SINGLE_PAYOUT_CHARGES = 0

export const SINGLE_PAYOUT_BENEFICIARIES: SinglePayoutBeneficiary[] = [
  {
    id: 10,
    beneficiaryName: 'Durgesh Kumar Tiwari',
    accountHolderName: 'Durgesh Kumar Tiwari',
    bankName: 'HDFC Bank',
    accountNumber: '50200012345678',
    maskedAccountNumber: 'XXXXXX5678',
    ifscCode: 'HDFC0001234',
    accountType: 'Savings Account',
  },
  {
    id: 13,
    beneficiaryName: 'Mr. Bhushan Anilrao Barbuddhe',
    accountHolderName: 'Bhushan Anilrao Barbuddhe',
    bankName: 'State Bank of India',
    accountNumber: '123456789012',
    maskedAccountNumber: 'XXXXXX9012',
    ifscCode: 'SBIN0004567',
    accountType: 'Savings Account',
  },
  {
    id: 14,
    beneficiaryName: 'Apex Solutions Private Limited',
    accountHolderName: 'Apex Solutions Private Limited',
    bankName: 'ICICI Bank',
    accountNumber: '001234567890',
    maskedAccountNumber: 'XXXXXX7890',
    ifscCode: 'ICIC0000789',
    accountType: 'Current Account',
  },
]



export const getSinglePayoutBeneficiaryById = (
  beneficiaryId: number,
): SinglePayoutBeneficiary | undefined => {
  return SINGLE_PAYOUT_BENEFICIARIES.find(
    (beneficiary) => beneficiary.id === beneficiaryId,
  )
}

export const calculateSinglePayoutTotalDebit = (amount: number) => {
  return amount + SINGLE_PAYOUT_CHARGES
}

export const formatIndianCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount)
}



export const formatPayoutDateTime = (date: string) => {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}