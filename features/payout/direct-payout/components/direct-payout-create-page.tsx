'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

import PayoutStepper from '../../components/payout-stepper'

import DirectPayoutForm from './direct-payout-form'
import DirectPayoutReview from './direct-payout-review'
import DirectPayoutOtp from './direct-payout-otp'
import DirectPayoutResult from './direct-payout-result'

export type DirectPayoutStep = 'form' | 'review' | 'otp' | 'result'

import type { DirectPayoutFormData } from '../schema/direct-payout.schema'

const INITIAL_FORM_VALUES: DirectPayoutFormData = {
    accountHolderName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    bankName: '',
    branchName: '',
    paymentMode: 'IMPS',
    amount: '',
    remarks: '',
}

export default function DirectPayoutCreatePage() {
    const [step, setStep] = useState<DirectPayoutStep>('form')

    const [formValues, setFormValues] = useState<DirectPayoutFormData>(INITIAL_FORM_VALUES)

    const [isSuccess, setIsSuccess] = useState(true)

    const handleBackToHistory = () => {
        window.location.href = '/payout/direct'
    }

    const handleCreateAnotherPayout = () => {
        setFormValues(INITIAL_FORM_VALUES)
        setIsSuccess(true)
        setStep('form')
    }

    const handleVerifyOtp = () => {
        // Later API call will come here.
        // For now dummy success flow.
        setIsSuccess(true)
        setStep('result')
    }

    const renderStepContent = () => {
        if (step === 'form') {
            return (
                <DirectPayoutForm
                    values={formValues}
                    onChange={setFormValues}
                    onContinue={() => setStep('review')}
                />
            )
        }

        if (step === 'review') {
            return (
                <DirectPayoutReview
                    values={formValues}
                    onBack={() => setStep('form')}
                    onContinue={() => setStep('otp')}
                />
            )
        }

        if (step === 'otp') {
            return (
                <DirectPayoutOtp
                    onBack={() => setStep('review')}
                    onVerify={() => {
                        setIsSuccess(true)
                        setStep('result')
                    }}
                />

            )
        }

        if (step === 'result') {
            return (
                <DirectPayoutResult
                    values={formValues}
                    payoutId="DP-20260704-001"
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
                        Create Payouthii
                    </span>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <PayoutStepper currentStep={step} />

                    <div className="px-6 py-10 lg:px-12 lg:py-12">
                        {renderStepContent()}
                    </div>
                </div>
            </div>
        </div>
    )
}