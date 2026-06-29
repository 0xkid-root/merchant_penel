'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '32px' }}>
            Create New Password
          </h1>
          <p className="text-gray-600 mt-2" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '15px' }}>
            Enter a strong password to secure your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="New Password"
            placeholder="••••••••"
            type="password"
            value={passwords.new}
            onChange={(val) => setPasswords(prev => ({ ...prev, new: val }))}
            icon={Lock}
            required
          />

          <InputField
            label="Confirm Password"
            placeholder="••••••••"
            type="password"
            value={passwords.confirm}
            onChange={(val) => setPasswords(prev => ({ ...prev, confirm: val }))}
            icon={Lock}
            required
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-blue-900 text-sm" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '13px' }}>
              • At least 8 characters
              <br />• Mix of uppercase and lowercase letters
              <br />• At least one number
            </p>
          </div>

          <PrimaryButton type="submit" isLoading={isLoading} className="w-full">
            Reset Password
          </PrimaryButton>
        </form>
      </div>
    </div>
  )
}
