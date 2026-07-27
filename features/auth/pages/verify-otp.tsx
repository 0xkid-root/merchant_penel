'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

import { Input } from '@/components/ui/input'
import { PrimaryButton } from '@/components/buttons/primary-button'
import { useForgotPasswordVerifyOtp } from '../hooks/usePassword'
import { OTPInput } from '../components/OTPInput'
import { OTPCountdown } from '../components/OTPCountdown'

interface ApiErrorResponse {
  message: string
}

export default function VerifyOtpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  
  const { mutateAsync: verifyOtp, isPending } = useForgotPasswordVerifyOtp()

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('forgotPasswordEmail')
    if (storedEmail) {
      setEmail(storedEmail)
    } else {
      router.push('/forgot-password')
    }
  }, [router])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    if (otp.length < 6) {
      toast.error('Please enter the complete 6-digit OTP')
      return
    }

    try {
      const response = await verifyOtp({ email, otp })
      
      sessionStorage.setItem('passwordResetToken', response.resetToken)
      toast.success(response.message || 'OTP verified successfully')
      router.push('/reset-password')
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>
      toast.error(err.response?.data?.message || 'Failed to verify OTP')
    }
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
            value={email} 
            className="h-[52px] w-full rounded-xl border-slate-300 bg-slate-50 text-slate-500 text-sm sm:h-14 sm:text-base cursor-not-allowed"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-3 block text-sm font-semibold text-slate-900">
            One Time Password
          </label>

          <OTPInput
            value={otp}
            onChange={setOtp}
            disabled={isPending}
          />

          <OTPCountdown email={email} />
        </div>

        <PrimaryButton
          type="submit"
          isLoading={isPending}
          disabled={isPending}
          className="h-[52px] w-full sm:h-14"
        >
          Verify OTP
        </PrimaryButton>

        <button
          type="button"
          onClick={() => router.push('/forgot-password')}
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </form>
    </div>
  )
}
