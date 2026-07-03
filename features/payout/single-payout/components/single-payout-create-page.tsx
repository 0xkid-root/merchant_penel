'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import PayoutStepper from '../../components/payout-stepper'

import { useSinglePayout } from '../hooks/use-single-payout'

import SinglePayoutForm from './single-payout-form'
import SinglePayoutReview from './single-payout-review'
import SinglePayoutOtp from './single-payout-otp'
import SinglePayoutResult from './single-payout-result'

export default function SinglePayoutCreatePage() {
  const {
    state,
    error,
    walletBalance,
    minAmount,
    maxAmount,
    charges,
    amountNumber,
    totalDebit,
    updateFormData,
    selectBeneficiary,
    updateOtp,
    goToReview,
    goBackToForm,
    sendOtp,
    goBackToReview,
    verifyOtpAndCreatePayout,
    resetPayout,
  } = useSinglePayout()

  const handleBackToHistory = () => {
    window.location.href = '/payout/single'
  }

  const handleMakeAnotherPayout = () => {
    resetPayout()
  }

  const handleViewDetails = () => {
    if (!state.result?.payoutId) return

    window.location.href = `/payouts/${state.result.payoutId}`
  }

  const renderStepContent = () => {
    if (state.currentStep === 'form') {
      return (
        <SinglePayoutForm
          formData={state.formData}
          selectedBeneficiary={state.selectedBeneficiary}
          walletBalance={walletBalance}
          minAmount={minAmount}
          maxAmount={maxAmount}
          error={error}
          onSelectBeneficiary={selectBeneficiary}
          onChange={updateFormData}
          onContinue={goToReview}
        />
      )
    }

    if (state.currentStep === 'review' && state.selectedBeneficiary) {
      return (
        <SinglePayoutReview
          beneficiary={state.selectedBeneficiary}
          amount={amountNumber}
          remarks={state.formData.remarks}
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
        <SinglePayoutOtp
          otp={state.otp}
          error={error}
          isLoading={state.isLoading}
          onOtpChange={updateOtp}
          onBack={goBackToReview}
          onVerify={verifyOtpAndCreatePayout}
        />
      )
    }

    if (
      state.currentStep === 'result' &&
      state.result &&
      state.selectedBeneficiary
    ) {
      return (
        <SinglePayoutResult
          result={state.result}
          beneficiary={state.selectedBeneficiary}
          amount={amountNumber}
          onViewDetails={handleViewDetails}
          remarks={state.formData.remarks}
          charges={charges}
          totalDebit={totalDebit}
          onMakeAnotherPayout={handleMakeAnotherPayout}
          onBackToHistory={handleBackToHistory}
        />
      )
    }

    return null
  }

  return (
    <div className="min-h-full bg-slate-50  px-4 py-4">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-7 flex items-center gap-2 text-sm">
          <Link
            href="/payout/single"
            className="font-medium text-slate-500 transition hover:text-indigo-600"
          >
            Single Payout
          </Link>

          <ChevronRight className="h-4 w-4 text-slate-400" />

          <span className="font-semibold text-slate-900">
            Create Payout
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <PayoutStepper currentStep={state.currentStep} />

          <div className="px-6 py-10 lg:px-12 lg:py-12">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
