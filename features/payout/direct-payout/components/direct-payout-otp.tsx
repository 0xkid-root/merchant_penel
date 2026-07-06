// features/payout/direct-payout/components/direct-payout-otp.tsx

'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  LoaderCircle,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react'
import { toast } from 'sonner'

interface DirectPayoutOtpProps {
  onBack: () => void
  onVerify: () => void
}

const OTP_LENGTH = 6
const RESEND_SECONDS = 30

export default function DirectPayoutOtp({
  onBack,
  onVerify,
}: DirectPayoutOtpProps) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [resendSeconds, setResendSeconds] = useState(RESEND_SECONDS)
  const [isVerifying, setIsVerifying] = useState(false)

  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (resendSeconds <= 0) return

    const timer = window.setInterval(() => {
      setResendSeconds((previousSeconds) => previousSeconds - 1)
    }, 1000)

    return () => window.clearInterval(timer)
  }, [resendSeconds])

  const updateOtpValue = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1)

    const updatedOtp = [...otp]
    updatedOtp[index] = digit

    setOtp(updatedOtp)

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
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

    const updatedOtp = Array(OTP_LENGTH).fill('')

    pastedOtp.split('').forEach((digit, index) => {
      updatedOtp[index] = digit
    })

    setOtp(updatedOtp)

    const nextFocusIndex = Math.min(pastedOtp.length, OTP_LENGTH - 1)

    inputRefs.current[nextFocusIndex]?.focus()
  }

  const handleResendOtp = () => {
    if (resendSeconds > 0) return

    setOtp(Array(OTP_LENGTH).fill(''))
    setResendSeconds(RESEND_SECONDS)

    toast.success('OTP resent successfully')

    window.setTimeout(() => {
      inputRefs.current[0]?.focus()
    }, 50)
  }

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('')

    if (enteredOtp.length !== OTP_LENGTH) {
      toast.error('Please enter the complete 6-digit OTP')
      return
    }

    setIsVerifying(true)

    window.setTimeout(() => {
      setIsVerifying(false)
      toast.success('OTP verified successfully')
      onVerify()
    }, 1000)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-5 lg:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
            <ShieldCheck className="h-5 w-5 text-indigo-600" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              OTP Verification
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the OTP sent to your registered mobile number to confirm
              this direct payout.
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-10 lg:px-6">
        <div className="mx-auto max-w-md text-center">
          <p className="text-sm font-semibold text-slate-800">
            Enter 6-digit OTP
          </p>

          <p className="mt-1 text-xs text-slate-500">
            For dummy UI, enter any 6 digits.
          </p>

          <div className="mt-6 flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element
                }}
                value={digit}
                onChange={(event) =>
                  updateOtpValue(index, event.target.value)
                }
                onKeyDown={(event) => handleKeyDown(event, index)}
                onPaste={handlePaste}
                inputMode="numeric"
                maxLength={1}
                aria-label={`OTP digit ${index + 1}`}
                className="h-12 w-11 rounded-xl border border-slate-300 bg-white text-center text-lg font-bold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:h-14 sm:w-12"
              />
            ))}
          </div>

          <div className="mt-5">
            {resendSeconds > 0 ? (
              <p className="text-xs text-slate-500">
                Resend OTP available in{' '}
                <span className="font-semibold text-slate-700">
                  {resendSeconds}s
                </span>
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

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">
        <button
          type="button"
          onClick={onBack}
          disabled={isVerifying}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Review
        </button>

        <button
          type="button"
          onClick={handleVerifyOtp}
          disabled={isVerifying}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
        >
          {isVerifying ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Verifying OTP...
            </>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              Verify and Submit Payout
            </>
          )}
        </button>
      </div>
    </div>
  )
}