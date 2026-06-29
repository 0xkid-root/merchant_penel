'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Mail } from 'lucide-react'
import { Input } from '@/components/ui/input'

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
  <div className="w-full max-w-[520px] px-8 lg:px-12">

    {/* Header */}
    <div className="mb-10">
      <h2 className="text-[44px] font-bold text-slate-900 leading-tight">
        Forgot Password?
      </h2>

      <p className="mt-3 text-[16px] leading-7 text-slate-600">
        No worries! Enter your registered email address and we'll send you a
        password reset link.
      </p>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-6">

     <div className="space-y-3">

  <label className="block text-sm font-semibold text-slate-900 mb-2">
    Email Address
  </label>

  <div className="relative">

    <Mail className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

    <Input
      type="email"
      placeholder="Enter your email address"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      className="pl-12 h-14 w-full rounded-xl border-slate-300"
    />

  </div>

</div>
      <PrimaryButton
        type="submit"
        isLoading={isLoading}
        className="w-full h-12"
      >
        Send Reset Link
      </PrimaryButton>

      <button
        type="button"
        onClick={() => router.push('/login')}
        className="flex items-center justify-center gap-2 w-full text-indigo-600 hover:text-indigo-700 font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Login
      </button>

    </form>

  </div>
)
}
