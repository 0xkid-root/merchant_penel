'use client'

import { Landmark } from 'lucide-react'

import PayoutSuccessCard from '../../components/payout-success-card'
import PayoutFailedCard from '../../components/payout-failed-card'

import type { DirectPayoutFormData } from '../schema/direct-payout.schema'

interface DirectPayoutResultProps {
  values: DirectPayoutFormData
  payoutId: string
  status: 'SUCCESS' | 'PENDING' | 'FAILED'
  message?: string
  onCreateAnother: () => void
  onBackToHistory: () => void
}

export default function DirectPayoutResult({
  values,
  payoutId,
  status,
  message,
  onCreateAnother,
  onBackToHistory,
}: DirectPayoutResultProps) {
  const amount = Number(values.amount)

  if (status === 'FAILED') {
    return (
      <div className="space-y-5">
        <PayoutFailedCard
          message={message}
          onTryAgain={onCreateAnother}
          onBackToHistory={onBackToHistory}
        />
      </div>
    )
  }

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
