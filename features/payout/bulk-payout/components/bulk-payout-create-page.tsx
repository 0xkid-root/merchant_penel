'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import PayoutStepper, {
  type BulkPayoutStep,
} from '../../components/bulk-payout-stepper'

import BulkPayoutOtp from './bulk-payout-otp'
import BulkPayoutResult from './bulk-payout-result'
import BulkPayoutReview from './bulk-payout-review'
import BulkPayoutUpload from './bulk-payout-upload'
import BulkPayoutValidation from './bulk-payout-validation'

import type { BulkPayoutFormValues } from '../types/bulk-payout.types'

const INITIAL_VALUES: BulkPayoutFormValues = {
  batchName: '',
  fileName: '',
  records: [],
  totalAmount: 0,
  validRecords: 0,
  invalidRecords: 0,
}

export default function BulkPayoutCreatePage() {
  const [currentStep, setCurrentStep] =
    useState<BulkPayoutStep>('upload')

  const [values, setValues] =
    useState<BulkPayoutFormValues>(INITIAL_VALUES)

  const [batchId, setBatchId] = useState('')

  const handleCreateAnother = () => {
    setValues(INITIAL_VALUES)
    setBatchId('')
    setCurrentStep('upload')
  }

  const handleSubmitBulkPayout = () => {
    setBatchId(`BP-${Date.now().toString().slice(-8)}`)
    setCurrentStep('result')
  }

  const renderStepContent = () => {
    if (currentStep === 'upload') {
      return (
        <BulkPayoutUpload
          values={values}
          onContinue={(updatedValues) => {
            setValues(updatedValues)
            setCurrentStep('validation')
          }}
        />
      )
    }

    if (currentStep === 'validation') {
      return (
        <BulkPayoutValidation
          values={values}
          onBack={() => setCurrentStep('upload')}
          onReupload={() => setCurrentStep('upload')}
          onContinue={(validRecords) => {
            const updatedTotalAmount = validRecords.reduce(
              (total, record) => total + Number(record.amount || 0),
              0,
            )

            setValues((previousValues) => ({
              ...previousValues,
              records: validRecords,
              totalAmount: updatedTotalAmount,
              validRecords: validRecords.length,
              invalidRecords: 0,
            }))

            setCurrentStep('review')
          }}
        />
      )
    }

    if (currentStep === 'review') {
      return (
        <BulkPayoutReview
          fileName={values.fileName}
          records={values.records}
          onBack={() => setCurrentStep('validation')}
          onContinue={() => setCurrentStep('otp')}
        />
      )
    }

    if (currentStep === 'otp') {
      return (
        <BulkPayoutOtp
          onBack={() => setCurrentStep('review')}
          onVerified={handleSubmitBulkPayout}
        />
      )
    }

    if (currentStep === 'result') {
      return (
        <BulkPayoutResult
          batchId={batchId}
          fileName={values.fileName}
          totalRecords={values.records.length}
          totalAmount={values.totalAmount}
          onCreateAnother={handleCreateAnother}
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
          <PayoutStepper currentStep={currentStep} />

          <div className="px-6 py-10 lg:px-12 lg:py-12">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
