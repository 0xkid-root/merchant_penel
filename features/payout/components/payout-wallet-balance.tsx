'use client'

import { Wallet } from 'lucide-react'

import { SecondaryButton } from '@/components/buttons/secondary-button'

interface PayoutWalletBalanceProps {
  balance: number
  label?: string
  onAddFunds?: () => void
  className?: string
}

export default function PayoutWalletBalance({
  balance,
  label = 'Available Wallet Balance',
  onAddFunds,
  className = '',
}: PayoutWalletBalanceProps) {
  const formattedBalance = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(balance)

  return (
    <section
      className={`flex flex-col gap-5 rounded-xl border border-slate-200 bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
          <Wallet className="h-6 w-6 text-indigo-600" />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">
            {label}
          </p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
            {formattedBalance}
          </p>
        </div>
      </div>

      {onAddFunds ? (
        <SecondaryButton
          onClick={onAddFunds}
          className="min-w-[116px] justify-center"
        >
          Add Funds
        </SecondaryButton>
      ) : null}
    </section>
  )
}