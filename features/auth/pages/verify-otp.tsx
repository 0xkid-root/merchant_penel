'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { PrimaryButton } from '@/components/buttons/primary-button'

export default function VerifyOtpPage() {
  const router = useRouter()
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1)
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input if value is entered
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Placeholder navigation for UI demonstration
    router.push('/reset-password')
  }

  return (
    <div className="w-full max-w-[540px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
      <div className="mb-8 sm:mb-10">
        <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-[44px]">
          Verify OTP
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
          Enter the 6 digit OTP sent to your registered email.
        </p>

        <div className="mt-4">
          <Input 
            readOnly 
            value="merchant@example.com" 
            className="h-[52px] w-full rounded-xl border-slate-300 bg-slate-50 text-slate-500 text-sm sm:h-14 sm:text-base cursor-not-allowed"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-3 block text-sm font-semibold text-slate-900">
            One Time Password
          </label>

          <div className="flex justify-between gap-2 sm:gap-4">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => { inputRefs.current[index] = el }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="h-12 w-12 rounded-xl border-slate-300 text-center text-lg font-semibold sm:h-14 sm:w-14 sm:text-xl"
              />
            ))}
          </div>

          <div className="mt-4 text-center">
            <span className="text-sm font-medium text-slate-400">
              Resend OTP in <span className="font-semibold text-slate-500">00:59</span>
            </span>
          </div>
        </div>

        <PrimaryButton
          type="submit"
          className="h-[52px] w-full sm:h-14"
        >
          Verify OTP
        </PrimaryButton>

        <button
          type="button"
          onClick={() => router.push('/forgot-password')}
          className="flex w-full items-center justify-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 sm:text-base"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </form>
    </div>
  )
}
