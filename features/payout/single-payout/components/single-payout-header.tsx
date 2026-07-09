'use client'

import { Plus } from 'lucide-react'

import { PrimaryButton } from '@/components/buttons/primary-button'

interface SinglePayoutHeaderProps {
  onCreatePayout: () => void
}

export default function SinglePayoutHeader({
  onCreatePayout,
}: SinglePayoutHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Single Payout
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
          Send money to your saved beneficiaries securely.
        </p>
      </div>

      <PrimaryButton
        onClick={onCreatePayout}
        className="h-11 w-full justify-center sm:w-auto"
      >
        <Plus className="h-4 w-4" />
        Single Payout
      </PrimaryButton>
    </div>
  )
}