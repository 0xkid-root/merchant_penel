'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { InputField } from '@/components/form/input-field'
import { PrimaryButton } from '@/components/buttons/primary-button'
import { resetPasswordAction } from '@/features/auth/server-actions'
import { toast } from 'sonner'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [passwords, setPasswords] = useState({ new: '', confirm: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwords.new !== passwords.confirm) {
      toast.error('Passwords do not match')
      return
    }

    if (passwords.new.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setIsLoading(true)

    try {
      const response = await resetPasswordAction({
        token: 'mock-token',
        newPassword: passwords.new,
        confirmPassword: passwords.confirm,
      })

      if (!response.success) {
        toast.error(response.error?.message || 'Failed to reset password')
        return
      }

      toast.success('Password reset successfully')
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
      <h2 className="text-[32px] font-bold text-slate-900 leading-tight">
        Create New Password
      </h2>

      <p className="mt-3 text-[16px] leading-7 text-slate-600">
        Enter a strong password to secure your account.
      </p>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* New Password */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-900">
          New Password
        </label>

        <div className="relative">
          <Lock className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

          <Input
            type="password"
            placeholder="Enter new password"
            value={passwords.new}
            onChange={(e) =>
              setPasswords((prev) => ({
                ...prev,
                new: e.target.value,
              }))
            }
            className="pl-12 h-14 rounded-xl border-slate-200"
          />
        </div>
      </div>

      {/* Confirm Password */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-900">
          Confirm Password
        </label>

        <div className="relative">
          <Lock className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

          <Input
            type="password"
            placeholder="Confirm password"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords((prev) => ({
                ...prev,
                confirm: e.target.value,
              }))
            }
            className="pl-12 h-14 rounded-xl border-slate-200"
          />
        </div>
      </div>

      {/* Password Rules */}
      <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
        <ul className="space-y-1 text-sm text-slate-700">
          <li>• Minimum 8 characters</li>
          <li>• At least one uppercase letter</li>
          <li>• At least one lowercase letter</li>
          <li>• At least one number</li>
        </ul>
      </div>

      {/* Button */}
      <PrimaryButton
        type="submit"
        isLoading={isLoading}
        className="w-full h-12"
      >
        Reset Password
      </PrimaryButton>

    </form>
  </div>
)
}
