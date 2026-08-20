'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLogin } from '../hooks/useLogin'
import { useAuthStore } from '@/lib/store/authStore'
import { loginSchema, LoginSchema } from '../schemas/loginSchema'

interface ApiErrorResponse {
  message: string
}

export default function LoginForm() {
  const router = useRouter()
  const { mutateAsync: login, isPending } = useLogin()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)

  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.forcePasswordChange) {
        router.replace('/change-password')
      } else {
        router.replace('/dashboard')
      }
    }
  }, [isAuthenticated, user, router])

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberEmail')

    if (rememberedEmail) {
      setValue('email', rememberedEmail)
      setRememberMe(true)
    }
  }, [setValue])

  const onSubmit = async (data: LoginSchema) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      })

      if (rememberMe) {
        localStorage.setItem('rememberEmail', data.email)
      } else {
        localStorage.removeItem('rememberEmail')
      }

      toast.success('Login successful. Welcome back.')
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>

      toast.error(
        err.response?.data?.message ??
        'Login failed. Please try again.'
      )
    }
  }

  const handleForgotPassword = () => {
    router.push('/forgot-password')
  }

  return (
    <div className="w-full max-w-[540px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
      <div className="mb-10 flex items-center gap-3 sm:mb-14 sm:gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14">
          <Image
            src="/atmoonpe-logo.png"
            alt="AtMoonPe"
            width={80}
            height={80}
            priority
            className="h-full w-full object-contain"
          />
        </div>

        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            AtMoonPe
          </h1>

          <p className="text-sm text-slate-600 sm:text-base">
            Merchant Panel
          </p>
        </div>
      </div>

      <div className="mb-8 sm:mb-10">
        <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-[28px]">
          Welcome Back!
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-8">
          Login to access your merchant dashboard and manage payouts.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-7">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            Email Address
          </label>

          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              autoComplete="email"
              disabled={isPending}
              {...register('email')}
              className={`h-13 rounded-xl pl-12 text-sm sm:h-14 sm:text-base ${
                errors.email ? 'border-red-500' : 'border-slate-300'
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            Password
          </label>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={isPending}
              {...register('password')}
              className={`h-13 rounded-xl pl-12 pr-12 text-sm sm:h-14 sm:text-base ${
                errors.password ? 'border-red-500' : 'border-slate-300'
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              disabled={isPending}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              disabled={isPending}
              className="h-5 w-5 rounded accent-indigo-600"
            />

            <span className="text-sm text-slate-700">Remember me</span>
          </label>

          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={isPending}
            className="self-start text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="h-13 w-full rounded-xl bg-indigo-600 text-sm font-semibold hover:bg-indigo-700 sm:h-14 sm:text-base"
        >
          {isPending ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Logging in...
            </>
          ) : (
            <>
              <Lock className="mr-2 h-5 w-5" />
              Login to Dashboard
            </>
          )}
        </Button>
      </form>
    </div>
  )
}