'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import BulkPayoutStepper from '../../components/bulk-payout-stepper'

import BulkPayoutOtp from './bulk-payout-otp'
import BulkPayoutResult from './bulk-payout-result'
import BulkPayoutReview from './bulk-payout-review'
import BulkPayoutUpload from './bulk-payout-upload'
import BulkPayoutValidation from './bulk-payout-validation'

import { useBulkPayout } from '../hook/use-bulk-payout'

export default function BulkPayoutCreatePage() {
  const bulkPayout = useBulkPayout()
  const { state, error, walletBalance } = bulkPayout

  const renderStepContent = () => {
    if (state.currentStep === 'upload') {
      return (
        <BulkPayoutUpload
          file={state.file}
          onContinue={bulkPayout.handleUpload}
          error={error}
        />
      )
    }

    if (state.currentStep === 'validation') {
      return (
        <BulkPayoutValidation
          preview={state.preview}
          walletBalance={walletBalance}
          onBack={bulkPayout.goBackToUpload}
          onReupload={bulkPayout.goBackToUpload}
          onContinue={bulkPayout.goToReview}
          error={error}
        />
      )
    }

    if (state.currentStep === 'review') {
      return (
        <BulkPayoutReview
          preview={state.preview}
          onBack={bulkPayout.goBackToValidation}
          onContinue={bulkPayout.sendOtp}
          error={error}
        />
      )
    }

    if (state.currentStep === 'otp') {
      return (
        <BulkPayoutOtp
          onBack={bulkPayout.goBackToReview}
          onVerify={bulkPayout.verifyOtpAndCreatePayout}
          onResend={bulkPayout.resendOtp}
          remainingSeconds={state.remainingSeconds}
          error={error}
        />
      )
    }

    if (state.currentStep === 'result') {
      return (
        <BulkPayoutResult
          result={state.result}
          preview={state.preview}
          onCreateAnother={bulkPayout.resetPayout}
          onBackToHistory={() => {
            window.location.href = '/payout/bulk'
          }}
        />
      )
    }

    return null
  }

  return (
    <div className="min-h-full bg-slate-50 px-4 py-4">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-7 flex items-center gap-2 text-sm">
          <Link
            href="/payout/bulk"
            className="font-medium text-slate-500 transition hover:text-indigo-600"
          >
            Bulk Payout
          </Link>

          <ChevronRight className="h-4 w-4 text-slate-400" />

          <span className="font-semibold text-slate-900">
            Create Bulk Payout
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <BulkPayoutStepper currentStep={state.currentStep} />

          <div className="px-6 py-10 lg:px-12 lg:py-12">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
