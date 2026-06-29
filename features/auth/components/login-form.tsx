'use client'

import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function LoginForm() {
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

  return (
    <div className="flex flex-col h-full justify-between p-8 lg:p-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">⚡</span>
          </div>
          <div>
            <h1 className="font-bold text-xl text-slate-900">PayOutX</h1>
            <p className="text-sm text-slate-600">Merchant Panel</p>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '32px' }}>Welcome Back! 👋</h2>
          <p className="text-slate-600" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '15px' }}>
            Login to access your merchant dashboard and manage payouts.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-slate-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px' }}>
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '14px' }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-slate-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px' }}>
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '14px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 accent-indigo-600"
              />
              <span className="text-slate-700" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px' }}>Remember me</span>
            </label>
            <a href="#" className="text-indigo-600 hover:text-indigo-700" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 h-11"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Logging in...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Lock className="h-4 w-4" />
                Login to Dashboard
              </span>
            )}
          </Button>
        </form>
      </div>

      {/* Security Notice */}
      <div className="flex items-center gap-3 pt-8 border-t border-slate-200">
        <Shield className="h-5 w-5 text-slate-400" />
        <p className="text-slate-600" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '14px' }}>Secure & Encrypted Connection</p>
      </div>
    </div>
  )
}
