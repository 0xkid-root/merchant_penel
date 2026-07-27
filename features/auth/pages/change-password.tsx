'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, ArrowLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

import { Input } from '@/components/ui/input'
import { PrimaryButton } from '@/components/buttons/primary-button'
import { PasswordRequirements } from '@/features/auth/components/PasswordRequirements'
import { changePasswordSchema, ChangePasswordSchema } from '../schemas/changePasswordSchema'
import { useChangePassword } from '../hooks/usePassword'
import { useAuthStore } from '@/lib/store/authStore'

interface ApiErrorResponse {
  message: string
}

export default function ChangePasswordPage() {
  const router = useRouter()
  const { mutateAsync: changePassword, isPending } = useChangePassword()

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: ChangePasswordSchema) => {
    try {
      const response = await changePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      // Show backend success message
      toast.success(response.message);

      // Clear auth data
      useAuthStore.getState().clearAuth();

      // Redirect to login
      router.replace("/login");
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>;

      toast.error(
        err.response?.data?.message ?? "Unable to change password"
      );
    }
  };

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Current Password */}
        <div>
          <label
            htmlFor="currentPassword"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            Current Password
          </label>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <Input
              id="currentPassword"
              type={showCurrentPassword ? 'text' : 'password'}
              placeholder="Enter current password"
              disabled={isPending}
              {...register('currentPassword')}
              className={`h-12 rounded-xl pl-12 pr-12 ${errors.currentPassword ? 'border-red-500' : 'border-slate-300'
                }`}
            />

            <button
              type="button"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
              disabled={isPending}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {showCurrentPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label
            htmlFor="newPassword"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            New Password
          </label>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <Input
              id="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              placeholder="Enter new password"
              disabled={isPending}
              {...register('newPassword')}
              className={`h-12 rounded-xl pl-12 pr-12 ${errors.newPassword ? 'border-red-500' : 'border-slate-300'
                }`}
            />

            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              disabled={isPending}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {showNewPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            Confirm Password
          </label>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm new password"
              disabled={isPending}
              {...register('confirmPassword')}
              className={`h-12 rounded-xl pl-12 pr-12 ${errors.confirmPassword ? 'border-red-500' : 'border-slate-300'
                }`}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              disabled={isPending}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <PasswordRequirements />

        <div className="space-y-4 pt-1">
          <PrimaryButton
            type="submit"
            isLoading={isPending}
            disabled={isPending}
            className="h-12 w-full rounded-xl"
          >
            {isPending ? 'Changing...' : 'Change Password'}
          </PrimaryButton>

          <button
            type="button"
            onClick={() => router.back()}
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

      </form>
    </div>
  )
}