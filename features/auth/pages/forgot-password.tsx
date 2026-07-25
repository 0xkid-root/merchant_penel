'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Mail } from 'lucide-react'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { PrimaryButton } from '@/components/buttons/primary-button'
import { authApi } from '@/features/auth/api/authApi'

export default function ForgotPasswordPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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

    setIsLoading(true)

    try {
      const response = await forgotPasswordAction({ email })

      if (!response.success) {
        toast.error(response.error?.message || 'Failed to process request')
        return
      }

      toast.success('Password reset link sent to your email')

      window.setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[540px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
      <div className="mb-8 sm:mb-10">
        <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-[44px]">
          Forgot Password?
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
          No worries. Enter your registered email address and we will send you
          a password reset link.
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
              disabled={isLoading}
              autoComplete="email"
              className="h-[52px] w-full rounded-xl border-slate-300 pl-12 text-sm sm:h-14 sm:text-base"
            />
          </div>
        </div>

        <PrimaryButton
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
          className="h-[52px] w-full sm:h-14"
        >
          Send Reset Link
        </PrimaryButton>

        <button
          type="button"
          onClick={() => router.push('/login')}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </button>
      </form>
    </div>
  )
}