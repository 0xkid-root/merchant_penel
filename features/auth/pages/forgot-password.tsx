'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Mail } from 'lucide-react'
import { InputField } from '@/components/form/input-field'
import { PrimaryButton } from '@/components/buttons/primary-button'
import { SecondaryButton } from '@/components/buttons/secondary-button'
import { forgotPasswordAction } from '@/features/auth/server-actions'
import { toast } from 'sonner'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await forgotPasswordAction({ email })

      if (!response.success) {
        toast.error(response.error?.message || 'Failed to process request')
        return
      }

      toast.success('Password reset link sent to your email')
      setTimeout(() => router.push('/login'), 2000)
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '32px' }}>
            Reset Password
          </h1>
          <p className="text-gray-600 mt-2" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '15px' }}>
            Enter your email to receive password reset instructions
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Email Address"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={setEmail}
            icon={Mail}
            required
          />

          <PrimaryButton type="submit" isLoading={isLoading} className="w-full">
            Send Reset Link
          </PrimaryButton>

          <button
            type="button"
            onClick={() => router.back()}
            className="w-full flex items-center justify-center gap-2 text-indigo-600 hover:text-indigo-700"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>
        </form>
      </div>
    </div>
  )
}
