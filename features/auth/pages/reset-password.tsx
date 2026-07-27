'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { PrimaryButton } from '@/components/buttons/primary-button'

export default function ResetPasswordPage() {
  const router = useRouter()

  const [passwords, setPasswords] = useState({
    new: '',
    confirm: '',
  })

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Placeholder navigation for UI demonstration
    router.push('/login')
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
              className="h-14 w-full rounded-xl border-slate-300 pl-12 pr-12 text-base"
            />

            <button
              type="button"
              onClick={() => setShowNewPassword((previous) => !previous)}
              aria-label={
                showNewPassword ? 'Hide new password' : 'Show new password'
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
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
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-4 sm:px-5">
          <p className="mb-2 text-sm font-semibold text-slate-900">
            Password requirements
          </p>

          <ul className="space-y-1 text-sm leading-6 text-slate-600">
            <li>• Minimum 8 characters</li>
            <li>• At least one uppercase letter</li>
            <li>• At least one lowercase letter</li>
            <li>• At least one number</li>
          </ul>
        </div>

        <PrimaryButton
          type="submit"
          className="h-14 w-full rounded-xl text-base font-semibold"
        >
          Reset Password
        </PrimaryButton>
      </form>
    </div>
  )
}