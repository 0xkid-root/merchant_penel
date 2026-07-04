'use client'

import { useState } from 'react'

import PageHeader from '@/components/layout/page-header'

import DirectPayoutForm from './direct-payout-form'
import DirectPayoutReview from './direct-payout-review'
import DirectPayoutOtp from './direct-payout-otp'
import DirectPayoutResult from './direct-payout-result'

export type DirectPayoutStep = 'form' | 'review' | 'otp' | 'result'

export interface DirectPayoutFormValues {
    accountHolderName: string
    accountNumber: string
    confirmAccountNumber: string
    ifscCode: string
    bankName: string
    branchName: string
    amount: string
    remarks: string
}

const INITIAL_FORM_VALUES: DirectPayoutFormValues = {
    accountHolderName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    bankName: '',
    branchName: '',
    amount: '',
    remarks: '',
}

export default function DirectPayoutCreatePage() {
    const [step, setStep] = useState<DirectPayoutStep>('form')

    const [formValues, setFormValues] =
        useState<DirectPayoutFormValues>(INITIAL_FORM_VALUES)

    const [isSuccess, setIsSuccess] = useState(true)

    const handleStartNewPayout = () => {
        setFormValues(INITIAL_FORM_VALUES)
        setIsSuccess(true)
        setStep('form')
    }

    return (
        <div className="min-h-full bg-slate-50 px-4 py-5 lg:px-6">
            <div className="mx-auto max-w-[1100px]">
                <PageHeader
                    title="Create Direct Payout"
                    subtitle="Transfer money directly to a bank account using account and IFSC details."
                    backHref="/payout/direct"
                    backLabel="Back to Direct Payouts"
                />

                {step === 'form' ? (
                    <DirectPayoutForm
                        values={formValues}
                        onChange={setFormValues}
                        onContinue={() => setStep('review')}
                    />
                ) : null}

                {step === 'review' ? (
                    <DirectPayoutReview
                        values={formValues}
                        onBack={() => setStep('form')}
                        onContinue={() => setStep('otp')}
                    />
                ) : null}

                {step === 'otp' ? (
                    <DirectPayoutOtp
                        values={formValues}
                        onBack={() => setStep('review')}
                        onVerify={() => {
                            setIsSuccess(true)
                            setStep('result')
                        }}
                    />
                ) : null}

                {step === 'result' ? (
                    <DirectPayoutResult
                        values={formValues}
                        payoutId="DP-20260704-001"
                        onCreateAnother={() => {
                            setFormValues(initialFormValues)
                            setStep('form')
                        }}
                    />
                ) : null}
            </div>
        </div>
    )
}