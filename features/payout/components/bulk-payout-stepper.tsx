'use client'

import { Check } from 'lucide-react'

export type BulkPayoutStep =
    | 'upload'
    | 'validation'
    | 'review'
    | 'otp'
    | 'result'

interface BulkPayoutStepperProps {
    currentStep: BulkPayoutStep
}

const steps: { id: BulkPayoutStep; label: string }[] = [
    { id: 'upload', label: 'Upload File' },
    { id: 'validation', label: 'Validate Records' },
    { id: 'review', label: 'Review' },
    { id: 'otp', label: 'OTP Verification' },
    { id: 'result', label: 'Complete' },
]

const stepOrder: Record<BulkPayoutStep, number> = {
    upload: 1,
    validation: 2,
    review: 3,
    otp: 4,
    result: 5,
}

export default function BulkPayoutStepper({
    currentStep,
}: BulkPayoutStepperProps) {
    const activeStep = stepOrder[currentStep]

    return (
        <div className="w-full border-b border-slate-200 bg-white px-4 py-5 sm:px-6">
            <div className="mx-auto flex max-w-5xl items-start justify-between overflow-x-auto pb-1">
                {steps.map((step, index) => {
                    const stepNumber = index + 1
                    const isCompleted = stepNumber < activeStep
                    const isActive = stepNumber === activeStep

                    return (
                        <div
                            key={step.id}
                            className="flex min-w-[112px] flex-1 items-center last:min-w-fit last:flex-none"
                        >
                            <div className="flex flex-col items-center">
                                <div
                                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${isCompleted
                                            ? 'bg-indigo-600 text-white'
                                            : isActive
                                                ? 'border-2 border-indigo-600 bg-indigo-50 text-indigo-600'
                                                : 'border border-slate-300 bg-white text-slate-500'
                                        }`}
                                >
                                    {isCompleted ? <Check className="h-4 w-4" /> : stepNumber}
                                </div>

                                <p
                                    className={`mt-2 whitespace-nowrap text-xs font-medium ${isActive || isCompleted
                                            ? 'text-indigo-600'
                                            : 'text-slate-500'
                                        }`}
                                >
                                    {step.label}
                                </p>
                            </div>

                            {index !== steps.length - 1 ? (
                                <div
                                    className={`mx-3 mb-5 h-px flex-1 ${stepNumber < activeStep
                                            ? 'bg-indigo-600'
                                            : 'bg-slate-200'
                                        }`}
                                />
                            ) : null}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}