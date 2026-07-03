'use client'

import { Check } from 'lucide-react'

export type PayoutStep = 'form' | 'review' | 'otp' | 'result'

interface PayoutStepperProps {
  currentStep: PayoutStep
}

const steps: { id: PayoutStep; label: string }[] = [
  { id: 'form', label: 'Payout Details' },
  { id: 'review', label: 'Review' },
  { id: 'otp', label: 'OTP Verification' },
  { id: 'result', label: 'Complete' },
]

const stepOrder: Record<PayoutStep, number> = {
  form: 1,
  review: 2,
  otp: 3,
  result: 4,
}

export default function PayoutStepper({
  currentStep,
}: PayoutStepperProps) {
  const activeStep = stepOrder[currentStep]

  return (
    <div className="w-full border-b border-slate-200 bg-white px-6 py-5">
      <div className="mx-auto flex max-w-3xl items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < activeStep
          const isActive = stepNumber === activeStep

          return (
            <div
              key={step.id}
              className="flex flex-1 items-center last:flex-none"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                    isCompleted
                      ? 'bg-indigo-600 text-white'
                      : isActive
                        ? 'border-2 border-indigo-600 bg-indigo-50 text-indigo-600'
                        : 'border border-slate-300 bg-white text-slate-500'
                  }`}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : stepNumber}
                </div>

                <p
                  className={`mt-2 whitespace-nowrap text-xs font-medium ${
                    isActive || isCompleted
                      ? 'text-indigo-600'
                      : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </p>
              </div>

              {index !== steps.length - 1 && (
                <div
                  className={`mx-3 mb-5 h-px flex-1 ${
                    stepNumber < activeStep
                      ? 'bg-indigo-600'
                      : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}