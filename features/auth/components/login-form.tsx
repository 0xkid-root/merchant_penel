'use client'

import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Image from 'next/image'


export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Store auth data
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', email)
      if (rememberMe) {
        localStorage.setItem('rememberEmail', email)
      }

      toast.success('Login successful! Welcome back.')

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      toast.error('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  const forgotPage = ()=>{
    try{
      router.push('/forgot-password')
    }catch(error){
      console.error(error)
    }

  }

  return (
    <div className="w-full max-w-[500px] px-12 py-10 flex flex-col justify-between h-full">
      {/* Top Content */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-4 mb-14">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl ">
          <Image
            src="/atmoonpe-logo.png"
            alt="AtMoonPe"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              AtMoonPe
            </h1>

            <p className="text-slate-600 text-lg">
              Merchant Panel
            </p>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-[28px] font-bold text-slate-900 leading-none mb-4">
            Welcome Back!
          </h2>

          <p className="text-slate-600 text-md leading-8">
            Login to access your merchant dashboard and manage payouts.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-7">

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="pl-12 h-14 rounded-xl border-slate-300"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pl-12 pr-12 h-14 rounded-xl border-slate-300"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-slate-400"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember */}
          <div className="flex items-center justify-between">

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 accent-indigo-600"
              />

              <span className="text-slate-700">
                Remember me
              </span>
            </label>

            <button
              onClick={forgotPage}
              type="button"
              className="text-indigo-600 font-semibold hover:text-indigo-700"
            >
              Forgot Password?
            </button>

          </div>

          {/* Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-md font-semibold"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
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


    </div>
  )
}
