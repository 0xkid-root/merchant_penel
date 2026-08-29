'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import PayoutStepper from '../../components/payout-stepper'

import { useDirectPayout } from '../hooks/use-direct-payout'

import DirectPayoutForm from './direct-payout-form'
import DirectPayoutReview from './direct-payout-review'
import DirectPayoutOtp from './direct-payout-otp'
import DirectPayoutResult from './direct-payout-result'

export default function DirectPayoutCreatePage() {
  const {
    state,
    error,
    walletBalance,
    amountNumber,
    totalDebit,
    charges,
    goToReview,
    goBackToForm,
    sendOtp,
    resendOtp,
    goBackToReview,
    verifyOtpAndCreatePayout,
    resetPayout,
  } = useDirectPayout()

  const handleBackToHistory = () => {
    window.location.href = '/payout/direct'
  }

  const handleCreateAnotherPayout = () => {
    resetPayout()
  }

  const renderStepContent = () => {
    if (state.currentStep === 'form') {
      return (
        <DirectPayoutForm
          values={state.formData}
          onContinue={goToReview}
        />
      )
    }

    if (state.currentStep === 'review') {
      return (
        <DirectPayoutReview
          values={state.formData}
          amount={amountNumber}
          charges={charges}
          totalDebit={totalDebit}
          isLoading={state.isLoading}
          onBack={goBackToForm}
          onContinue={sendOtp}
        />
      )
    }

    if (state.currentStep === 'otp') {
      return (
        <DirectPayoutOtp
          remainingSeconds={state.remainingSeconds}
          onBack={goBackToReview}
          onVerify={verifyOtpAndCreatePayout}
          onResend={resendOtp}
        />
      )
    }

    if (state.currentStep === 'result' && state.result) {
      return (
        <DirectPayoutResult
          values={state.formData}
          payoutId={state.result.payoutId}
          status={state.result.status}
          message={state.result.message}
          onCreateAnother={handleCreateAnotherPayout}
          onBackToHistory={handleBackToHistory}
        />
      )
    }

    return null
  }

  return (
    <div className="min-h-full bg-slate-50 px-4 py-2">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-7 flex items-center gap-2 text-sm">
          <Link
            href="/payout/direct"
            className="font-medium text-slate-500 transition hover:text-indigo-600"
          >
            Direct Payout
          </Link>

          <ChevronRight className="h-4 w-4 text-slate-400" />

          <span className="font-semibold text-slate-900">
            Create Payout
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <PayoutStepper currentStep={state.currentStep} />

          <div className="px-6 py-10 lg:px-12 lg:py-12">
            {/* Show global form validation error here if any */}
            {error && state.currentStep === 'form' && (
              <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-600">
                {error}
              </div>
            )}
            
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  )
}