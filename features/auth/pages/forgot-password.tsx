'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Mail } from 'lucide-react'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

import { Input } from '@/components/ui/input'
import { PrimaryButton } from '@/components/buttons/primary-button'
import { useForgotPasswordSendOtp } from '../hooks/usePassword'

interface ApiErrorResponse {
  message: string
}

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const { mutateAsync: sendOtp, isPending } = useForgotPasswordSendOtp()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    if (!email.trim()) {
      toast.error('Please enter your email address')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }

    try {
      await sendOtp({ email })
      
      sessionStorage.setItem('forgotPasswordEmail', email)
      toast.success('OTP sent successfully.')
      router.push('/verify-otp')
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>
      toast.error(err.response?.data?.message || 'Failed to send OTP')
    }
  }

  return (
    <div className="w-full max-w-[540px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
      <div className="mb-8 sm:mb-10">
        <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-[44px]">
          Forgot Password?
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
          Enter your registered email address. We'll send a One Time Password (OTP) to verify your identity.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="forgot-password-email"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            Email Address
          </label>

          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <Input
              id="forgot-password-email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              disabled={isPending}
              className="h-[52px] w-full rounded-xl border-slate-300 pl-12 text-sm sm:h-14 sm:text-base"
            />
          </div>
        </div>

        <PrimaryButton
          type="submit"
          isLoading={isPending}
          disabled={isPending}
          className="h-[52px] w-full sm:h-14"
        >
          Send OTP
        </PrimaryButton>

        <button
          type="button"
          onClick={() => router.push('/login')}
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </button>
      </form>
    </div>
  )
}