'use client'

import { useState } from 'react'

import PageHeader from '@/components/layout/page-header'
import PayoutStepper, { type BulkPayoutStep, } from '../../components/bulk-payout-stepper'

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

    return (
        <div className="min-h-full bg-slate-50">
            <PageHeader
                title="Create Bulk Payout"
                subtitle="Upload a payout file, validate beneficiary records, and submit the batch securely."
            />

            <PayoutStepper currentStep={currentStep} />

            <div className="px-4 py-6 lg:px-6">
                <div className="mx-auto max-w-5xl">
                    {currentStep === 'upload' ? (
                        <BulkPayoutUpload
                            values={values}
                            onContinue={(updatedValues) => {
                                setValues(updatedValues)
                                setCurrentStep('validation')
                            }}
                        />
                    ) : null}

                    {currentStep === 'validation' ? (
                        <BulkPayoutValidation
                            values={values}
                            onBack={() => setCurrentStep('upload')}
                            onReupload={() => setCurrentStep('upload')}
                            onContinue={(validRecords) => {
                                const updatedTotalAmount = validRecords.reduce(
                                    (total, record) => total + record.amount,
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
                    ) : null}

                    {currentStep === 'review' ? (
                        <BulkPayoutReview
                            fileName={values.fileName}
                            records={values.records}
                            onBack={() => setCurrentStep('validation')}
                            onContinue={() => setCurrentStep('otp')}
                        />
                    ) : null}

                    {currentStep === 'otp' ? (
                        <BulkPayoutOtp
                            totalRecords={values.records.length}
                            totalAmount={values.totalAmount}
                            onBack={() => setCurrentStep('review')}
                            onVerified={() => handleSubmitBulkPayout()}
                        />
                    ) : null}

                    {currentStep === 'result' ? (
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
                    ) : null}

                </div>
            </div>
        </div>
    )
}