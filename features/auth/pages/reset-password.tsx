'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

import { Input } from '@/components/ui/input'
import { PrimaryButton } from '@/components/buttons/primary-button'
import { useResetPassword } from '../hooks/usePassword'
import { PasswordRequirements } from '../components/PasswordRequirements'

interface ApiErrorResponse {
  message: string
}

export default function ResetPasswordPage() {
  const router = useRouter()

  const [passwords, setPasswords] = useState({
    new: '',
    confirm: '',
  })

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const { mutateAsync: resetPassword, isPending } = useResetPassword()

  useEffect(() => {
    const token = sessionStorage.getItem('passwordResetToken')
    if (!token) {
      router.push('/forgot-password')
    }
  }, [router])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    const resetToken = sessionStorage.getItem('passwordResetToken')
    if (!resetToken) {
      toast.error('Invalid or missing reset token')
      router.push('/forgot-password')
      return
    }
    
    if (!passwords.new || !passwords.confirm) {
      toast.error('Please fill in both password fields')
      return
    }

    if (passwords.new !== passwords.confirm) {
      toast.error('Passwords do not match')
      return
    }

    if (passwords.new.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    try {
      await resetPassword({
        resetToken,
        newPassword: passwords.new,
        confirmPassword: passwords.confirm,
      })
      
      sessionStorage.removeItem('passwordResetToken')
      sessionStorage.removeItem('forgotPasswordEmail')
      
      toast.success('Password reset successfully.')
      
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>
      toast.error(err.response?.data?.message || 'Failed to reset password')
    }
  }

  return (
    <div className="w-full max-w-[540px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
      <div className="mb-8 sm:mb-10">
        <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
          Create New Password
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
          Enter a strong password to secure your merchant account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="new-password"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            New Password
          </label>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <Input
              id="new-password"
              type={showNewPassword ? 'text' : 'password'}
              placeholder="Enter new password"
              value={passwords.new}
              onChange={(event) =>
                setPasswords((previous) => ({
                  ...previous,
                  new: event.target.value,
                }))
              }
              disabled={isPending}
              className="h-14 w-full rounded-xl border-slate-300 pl-12 pr-12 text-base"
            />

            <button
              type="button"
              onClick={() => setShowNewPassword((previous) => !previous)}
              aria-label={
                showNewPassword ? 'Hide new password' : 'Show new password'
              }
              disabled={isPending}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {showNewPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            Confirm Password
          </label>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <Input
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm new password"
              value={passwords.confirm}
              onChange={(event) =>
                setPasswords((previous) => ({
                  ...previous,
                  confirm: event.target.value,
                }))
              }
              disabled={isPending}
              className="h-14 w-full rounded-xl border-slate-300 pl-12 pr-12 text-base"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((previous) => !previous)
              }
              aria-label={
                showConfirmPassword
                  ? 'Hide confirm password'
                  : 'Show confirm password'
              }
              disabled={isPending}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <PasswordRequirements />

        <PrimaryButton
          type="submit"
          isLoading={isPending}
          disabled={isPending}
          className="h-14 w-full rounded-xl text-base font-semibold"
        >
          Reset Password
        </PrimaryButton>
      </form>
    </div>
  )
}