'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginForm() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberEmail')

    if (rememberedEmail) {
      setEmail(rememberedEmail)
      setRememberMe(true)
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email.trim() || !password) {
      toast.error('Please fill in all fields')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      // Replace with login API when backend integration starts.
      await new Promise((resolve) => setTimeout(resolve, 1000))

      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', email)

      if (rememberMe) {
        localStorage.setItem('rememberEmail', email)
      } else {
        localStorage.removeItem('rememberEmail')
      }

      toast.success('Login successful. Welcome back.')

      router.push('/dashboard')
    } catch {
      toast.error('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
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

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email address"
              autoComplete="email"
              disabled={isLoading}
              className="h-13 rounded-xl border-slate-300 pl-12 text-sm sm:h-14 sm:text-base"
            />
          </div>
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={isLoading}
              className="h-13 rounded-xl border-slate-300 pl-12 pr-12 text-sm sm:h-14 sm:text-base"
            />

            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              disabled={isLoading}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              disabled={isLoading}
              className="h-5 w-5 rounded accent-indigo-600"
            />

            <span className="text-sm text-slate-700">Remember me</span>
          </label>

          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={isLoading}
            className="self-start text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="h-13 w-full rounded-xl bg-indigo-600 text-sm font-semibold hover:bg-indigo-700 sm:h-14 sm:text-base"
        >
          {isLoading ? (
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