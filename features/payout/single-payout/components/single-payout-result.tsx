'use client'

import { FileText } from 'lucide-react'
import PayoutSuccessCard from '../../components/payout-success-card'
import type {
  SinglePayoutBeneficiary,
  SinglePayoutResult,
} from '../types/single-payout.types'

interface SinglePayoutResultProps {
  result: SinglePayoutResult
  beneficiary: SinglePayoutBeneficiary
  amount: number
  remarks: string
  charges: number
  totalDebit: number
  onViewDetails: () => void
  onMakeAnotherPayout: () => void
  onBackToHistory: () => void
}

export default function SinglePayoutResult({
  result,
  beneficiary,
  amount,
  onViewDetails,
  onMakeAnotherPayout,
  onBackToHistory,
}: SinglePayoutResultProps) {
  const isFailed = result.status === 'FAILED'

  if (isFailed) {
    return (
      <div className="mx-auto max-w-3xl py-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <h1 className="text-2xl font-bold text-red-900">
            Payout Could Not Be Completed
          </h1>

          <p className="mt-2 text-sm text-red-700">
            {result.failureReason ||
              'Your payout request could not be completed. Please try again.'}
          </p>

          <button
            type="button"
            onClick={onMakeAnotherPayout}
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PayoutSuccessCard
        title={
          result.status === 'PENDING'
            ? 'Payout Is Being Processed'
            : 'Payout Submitted Successfully'
        }
        description={
          result.message ||
          (result.status === 'PENDING'
            ? 'Your payout request has been submitted and is currently being processed.'
            : 'Your payout request has been submitted. You can track its status from the Payout History.')
        }
        payoutId={result.payoutId || 'Will be generated shortly'}
        amount={amount}
        recipientLabel="Beneficiary"
        recipientName={beneficiary.beneficiaryName}
        onViewDetails={onViewDetails}
        onMakeAnotherPayout={onMakeAnotherPayout}
        onBackToHistory={onBackToHistory}
      />


    </div>
  )
}