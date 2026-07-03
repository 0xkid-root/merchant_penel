'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  Clock3,
  IndianRupee,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  UserRound,
} from 'lucide-react'

import { PrimaryButton } from '@/components/buttons/primary-button'
import { SecondaryButton } from '@/components/buttons/secondary-button'

interface SinglePayoutOtpProps {
  otp: string
  error: string | null
  isLoading: boolean
  onOtpChange: (otp: string) => void
  onBack: () => void
  onVerify: () => void
}

const OTP_LENGTH = 6
const RESEND_SECONDS = 30

export default function SinglePayoutOtp({
  otp,
  error,
  isLoading,
  onOtpChange,
  onBack,
  onVerify,
}: SinglePayoutOtpProps) {
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  const otpValues = Array.from(
    { length: OTP_LENGTH },
    (_, index) => otp[index] ?? '',
  )

  useEffect(() => {
    if (secondsLeft <= 0) return

    const timer = window.setInterval(() => {
      setSecondsLeft((currentSeconds) => currentSeconds - 1)
    }, 1000)

    return () => window.clearInterval(timer)
  }, [secondsLeft])

  const updateOtpAtIndex = (index: number, value: string) => {
    const cleanedValue = value.replace(/\D/g, '').slice(-1)

    const nextOtp = [...otpValues]
    nextOtp[index] = cleanedValue

    onOtpChange(nextOtp.join(''))

    if (cleanedValue && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    if (event.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()

    const pastedOtp = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, OTP_LENGTH)

    onOtpChange(pastedOtp)

    const focusIndex = Math.min(pastedOtp.length, OTP_LENGTH - 1)
    inputRefs.current[focusIndex]?.focus()
  }

  const handleResendOtp = () => {
    if (secondsLeft > 0) return

    onOtpChange('')
    setSecondsLeft(RESEND_SECONDS)
    inputRefs.current[0]?.focus()

    // TODO: call resend OTP API here
  }

  const isOtpComplete = otp.length === OTP_LENGTH

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-slate-900">
          Verify Payout
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Enter the OTP sent to your registered mobile number to authorize this
          payout.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-120 bg-white">
        <div className="space-y-6 p-5 sm:p-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
                <Smartphone className="h-5 w-5 text-indigo-600" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  OTP sent successfully
                </p>

                <p className="mt-1 text-sm leading-5 text-slate-600">
                  Please enter the 6-digit OTP sent to your registered mobile
                  number.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-indigo-600" />

              <h3 className="text-sm font-semibold text-slate-900">
                Enter OTP
              </h3>
            </div>

            <div className="flex gap-2 sm:gap-3">
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? 'one-time-code' : 'off'}
                  maxLength={1}
                  value={value}
                  disabled={isLoading}
                  onChange={(event) =>
                    updateOtpAtIndex(index, event.target.value)
                  }
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  onPaste={handlePaste}
                  className={`h-12 w-11 rounded-xl border text-center text-lg font-bold outline-none transition sm:h-14 sm:w-14 ${
                    error
                      ? 'border-red-400 bg-red-50 text-red-700 focus:ring-4 focus:ring-red-100'
                      : value
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700 focus:ring-4 focus:ring-indigo-100'
                        : 'border-slate-300 bg-white text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'
                  }`}
                />
              ))}
            </div>

            {error ? (
              <p className="mt-3 text-sm font-medium text-red-600">
                {error}
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-2 text-sm">
            {secondsLeft > 0 ? (
              <>
                <Clock3 className="h-4 w-4 text-slate-400" />

                <span className="text-slate-500">
                  Resend OTP available in{' '}
                  <span className="font-semibold text-slate-700">
                    {secondsLeft}s
                  </span>
                </span>
              </>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isLoading}
                className="inline-flex items-center gap-2 font-semibold text-indigo-600 transition hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RefreshCw className="h-4 w-4" />
                Resend OTP
              </button>
            )}
          </div>

          <div className="flex flex-col-reverse gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <UserRound className="h-4 w-4 text-slate-400" />
              OTP is valid only for this payout request.
            </div>

            <div className="flex items-center gap-3">
              <SecondaryButton onClick={onBack} disabled={isLoading}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </SecondaryButton>

              <PrimaryButton
                onClick={onVerify}
                disabled={!isOtpComplete || isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify & Pay'}
                {!isLoading && <IndianRupee className="h-4 w-4" />}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}