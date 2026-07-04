import type { DirectPayoutItem } from '../types/direct-payout.types'

export const IFSC_BANK_DETAILS: Record<
  string,
  {
    bankName: string
    branchName: string
  }
> = {
  HDFC0001234: {
    bankName: 'HDFC Bank',
    branchName: 'Lucknow Main Branch',
  },

  SBIN0004567: {
    bankName: 'State Bank of India',
    branchName: 'Hazratganj Branch',
  },

  ICIC0000789: {
    bankName: 'ICICI Bank',
    branchName: 'Gomti Nagar Branch',
  },

  UTIB0000100: {
    bankName: 'Axis Bank',
    branchName: 'Aliganj Branch',
  },
}

export const DIRECT_PAYOUTS: DirectPayoutItem[] = [
  {
    id: 1,
    payoutId: 'DP-20260703-001',
    accountHolderName: 'Durgesh Kumar Tiwari',
    maskedAccountNumber: 'XXXXXX5678',
    bankName: 'HDFC Bank',
    ifscCode: 'HDFC0001234',
    amount: 15000,
    totalDebit: 15000,
    remarks: 'Vendor payment for July services',
    status: 'success',
    createdAt: '03 Jul 2026, 10:30 am',
  },
  {
    id: 2,
    payoutId: 'DP-20260702-002',
    accountHolderName: 'Mr. Bhushan Anilrao Barbudhe',
    maskedAccountNumber: 'XXXXXX9012',
    bankName: 'State Bank of India',
    ifscCode: 'SBIN0004567',
    amount: 8500,
    totalDebit: 8500,
    remarks: 'Direct settlement payment',
    status: 'success',
    createdAt: '02 Jul 2026, 4:15 pm',
  },
  {
    id: 3,
    payoutId: 'DP-20260701-003',
    accountHolderName: 'Apex Solutions Private Limited',
    maskedAccountNumber: 'XXXXXX7890',
    bankName: 'ICICI Bank',
    ifscCode: 'ICIC0000789',
    amount: 22000,
    totalDebit: 22000,
    remarks: 'Invoice payment INV-2026-078',
    status: 'pending',
    createdAt: '01 Jul 2026, 2:40 pm',
  },
  {
    id: 4,
    payoutId: 'DP-20260630-004',
    accountHolderName: 'Ravi Enterprises',
    maskedAccountNumber: 'XXXXXX1122',
    bankName: 'Axis Bank',
    ifscCode: 'UTIB0000100',
    amount: 12000,
    totalDebit: 12000,
    remarks: 'Supplier payout',
    status: 'failed',
    createdAt: '30 Jun 2026, 11:20 am',
  },
  {
    id: 5,
    payoutId: 'DP-20260629-005',
    accountHolderName: 'Neha Trading Company',
    maskedAccountNumber: 'XXXXXX4567',
    bankName: 'HDFC Bank',
    ifscCode: 'HDFC0001234',
    amount: 6500,
    totalDebit: 6500,
    remarks: 'Urgent direct transfer',
    status: 'success',
    createdAt: '29 Jun 2026, 9:45 am',
  },
]