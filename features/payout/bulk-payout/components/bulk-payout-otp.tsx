'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react'
import { toast } from 'sonner'

import { PrimaryButton } from '@/components/buttons/primary-button'
import { SecondaryButton } from '@/components/buttons/secondary-button'

interface BulkPayoutOtpProps {
  totalRecords: number
  totalAmount: number
  onBack: () => void
  onVerified: (otp: string) => void
}

function formatIndianCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

const OTP_LENGTH = 6
const RESEND_SECONDS = 30

export default function BulkPayoutOtp({
  totalRecords,
  totalAmount,
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
      // Replace this timeout with your OTP verification API call.
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
        <div className="border-b border-slate-200 px-5 py-6 text-center sm:px-6 sm:py-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
            <ShieldCheck className="h-7 w-7 text-indigo-600" />
          </div>

          <h2 className="mt-4 text-xl font-bold text-slate-900">
            Verify Bulk Payout
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
            Enter the 6-digit OTP sent to your registered mobile number to
            submit this bulk payout batch.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-2">
          <div className="bg-white px-5 py-5 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Valid Beneficiaries
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {totalRecords}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Records included in this batch
            </p>
          </div>

          <div className="bg-white px-5 py-5 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Total Wallet Debit
            </p>

            <p className="mt-2 text-2xl font-bold text-indigo-700">
              {formatIndianCurrency(totalAmount)}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Amount to be deducted after verification
            </p>
          </div>
        </div>

        <div className="px-5 py-7 sm:px-6">
          <div className="mx-auto max-w-md">
            <label className="block text-center text-sm font-semibold text-slate-900">
              Enter OTP
            </label>

            <p className="mt-1 text-center text-xs text-slate-500">
              OTP is valid for a limited time.
            </p>

            <div className="mt-6 flex items-center justify-center gap-2 sm:gap-3">
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
                  className="h-12 w-10 rounded-xl border border-slate-300 bg-white text-center text-lg font-bold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:h-14 sm:w-12"
                />
              ))}
            </div>

            <div className="mt-6 text-center">
              {secondsLeft > 0 ? (
                <p className="inline-flex items-center gap-2 text-sm text-slate-500">
                  <Clock3 className="h-4 w-4" />
                  Resend OTP in {secondsLeft}s
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
        </div>

        <div className="border-t border-slate-200 bg-slate-50/60 px-5 py-4 sm:px-6">
          <div className="flex gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

            <p className="text-sm leading-6 text-slate-600">
              After successful verification, the bulk payout batch will be
              submitted for processing.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <SecondaryButton onClick={onBack} disabled={isSubmitting}>
            <ArrowLeft className="h-4 w-4" />
            Back to Review
          </SecondaryButton>

          <PrimaryButton
            onClick={handleVerifyOtp}
            disabled={!isOtpComplete || isSubmitting}
          >
            <ShieldCheck className="h-4 w-4" />
            {isSubmitting ? 'Verifying OTP...' : 'Verify and Submit'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}