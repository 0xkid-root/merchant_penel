'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, ArrowLeft } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { PrimaryButton } from '@/components/buttons/primary-button'
import { PasswordRequirements } from '@/features/auth/components/PasswordRequirements'

export default function ChangePasswordPage() {
  const router = useRouter()

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  }

  return (
    <div className="w-full max-w-[540px] px-6 py-6 lg:px-10 lg:py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Change Password
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
          Update your password to keep your merchant account secure.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Current Password */}

        <div>
          <label
            htmlFor="current-password"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            Current Password
          </label>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <Input
              id="current-password"
              type={showCurrentPassword ? 'text' : 'password'}
              placeholder="Enter current password"
              value={passwords.current}
              onChange={(e) =>
                setPasswords((prev) => ({
                  ...prev,
                  current: e.target.value,
                }))
              }
              className="h-12 rounded-xl border-slate-300 pl-12 pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowCurrentPassword((prev) => !prev)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              {showCurrentPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}

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
              onChange={(e) =>
                setPasswords((prev) => ({
                  ...prev,
                  new: e.target.value,
                }))
              }
              className="h-12 rounded-xl border-slate-300 pl-12 pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowNewPassword((prev) => !prev)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              {showNewPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}

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
              onChange={(e) =>
                setPasswords((prev) => ({
                  ...prev,
                  confirm: e.target.value,
                }))
              }
              className="h-12 rounded-xl border-slate-300 pl-12 pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((prev) => !prev)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
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

        <div className="space-y-4 pt-1">
          <PrimaryButton
            type="submit"
            className="h-12 w-full rounded-xl"
          >
            Change Password
          </PrimaryButton>

          <button
            type="button"
            onClick={() => router.back()}
            className="flex w-full items-center justify-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

      </form>
    </div>
  )
}