'use client'

import { Landmark } from 'lucide-react'

import PayoutSuccessCard from '../../components/payout-success-card'

import type { DirectPayoutFormValues } from './direct-payout-create-page'

interface DirectPayoutResultProps {
  values: DirectPayoutFormValues
  payoutId: string
  onCreateAnother: () => void
  onBackToHistory: () => void
}

export default function DirectPayoutResult({
  values,
  payoutId,
  onCreateAnother,
  onBackToHistory,
}: DirectPayoutResultProps) {
  const amount = Number(values.amount)

  return (
    <div className="space-y-5">
      <PayoutSuccessCard
        title="Direct Payout Submitted Successfully"
        description="Your direct payout request has been submitted. You can track its status from the Direct Payout list."
        payoutId={payoutId}
        amount={amount}
        recipientLabel="Account Holder"
        recipientName={values.accountHolderName}
        onMakeAnotherPayout={onCreateAnother}
        onBackToHistory={onBackToHistory}
      />
    </div>


  )
}
