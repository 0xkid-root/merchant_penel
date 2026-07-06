'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  RefreshCw,
  ShieldCheck,
  Smartphone,
} from 'lucide-react'
import { toast } from 'sonner'

import { PrimaryButton } from '@/components/buttons/primary-button'
import { SecondaryButton } from '@/components/buttons/secondary-button'

interface BulkPayoutOtpProps {
  onBack: () => void
  onVerified: (otp: string) => void
}

const OTP_LENGTH = 6
const RESEND_SECONDS = 30

export default function BulkPayoutOtp({
  onBack,
  onVerified,
}: BulkPayoutOtpProps) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  const otpValue = otp.join('')
  const isOtpComplete = otpValue.length === OTP_LENGTH

  useEffect(() => {
    if (secondsLeft <= 0) return

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => current - 1)
    }, 1000)

    return () => window.clearInterval(timer)
  }, [secondsLeft])

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1)

    setOtp((currentOtp) => {
      const nextOtp = [...currentOtp]
      nextOtp[index] = digit
      return nextOtp
    })

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
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

    if (!pastedOtp) return

    const nextOtp = Array(OTP_LENGTH).fill('')

    pastedOtp.split('').forEach((digit, index) => {
      nextOtp[index] = digit
    })

    setOtp(nextOtp)

    const nextFocusIndex = Math.min(pastedOtp.length, OTP_LENGTH - 1)
    inputRefs.current[nextFocusIndex]?.focus()
  }

  const handleResendOtp = () => {
    if (secondsLeft > 0) return

    setOtp(Array(OTP_LENGTH).fill(''))
    setSecondsLeft(RESEND_SECONDS)
    inputRefs.current[0]?.focus()

    toast.success('A new OTP has been sent')
  }

  const handleVerifyOtp = async () => {
    if (!isOtpComplete) {
      toast.error('Please enter the 6-digit OTP')
      return
    }

    setIsSubmitting(true)

    try {
      // Replace this with your OTP verification API.
      await new Promise((resolve) => window.setTimeout(resolve, 700))

      toast.success('OTP verified successfully')
      onVerified(otpValue)
    } catch {
      toast.error('OTP verification failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="px-5 py-8 sm:px-6 sm:py-10">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Verify Payout
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter the OTP sent to your registered mobile number to authorize
                this payout.
              </p>
            </div>

            <div className=" px-5 py-6 sm:px-8 sm:py-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
                  <Smartphone className="h-6 w-6 text-indigo-600" />
                </div>

                <div>
                  <p className="text-base font-semibold text-slate-900">
                    OTP sent successfully
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Please enter the 6-digit OTP sent to your registered mobile
                    number.
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-indigo-600" />

                  <label className="text-sm font-semibold text-slate-900">
                    Enter OTP
                  </label>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(element) => {
                        inputRefs.current[index] = element
                      }}
                      value={digit}
                      onChange={(event) =>
                        handleOtpChange(index, event.target.value)
                      }
                      onKeyDown={(event) => handleKeyDown(index, event)}
                      onPaste={handlePaste}
                      inputMode="numeric"
                      autoComplete={index === 0 ? 'one-time-code' : 'off'}
                      maxLength={1}
                      aria-label={`OTP digit ${index + 1}`}
                      className="h-14 w-12 rounded-xl border border-slate-300 bg-white text-center text-lg font-bold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    />
                  ))}
                </div>

                <div className="mt-7">
                  {secondsLeft > 0 ? (
                    <p className="inline-flex items-center gap-2 text-sm text-slate-500">
                      <Clock3 className="h-4 w-4" />
                      Resend OTP available in {secondsLeft}s
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Resend OTP
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-12 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="inline-flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 className="h-4 w-4 text-slate-400" />
                  OTP is valid only for this payout request.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <SecondaryButton onClick={onBack} disabled={isSubmitting}>
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </SecondaryButton>

                  <PrimaryButton
                    onClick={handleVerifyOtp}
                    disabled={!isOtpComplete || isSubmitting}
                  >
                    <ShieldCheck className="h-4 w-4" />
                    {isSubmitting ? 'Verifying...' : 'Verify & Pay'}
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}