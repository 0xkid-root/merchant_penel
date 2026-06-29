'use client'

import { LoginForm } from '../components/login-form'
import { DashboardPreview } from '@/components/cards/dashboard-preview'

export function AuthLoginPage() {
  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Column - Login Form */}
        <div className="bg-white flex flex-col">
          <LoginForm />
        </div>

        {/* Right Column - Hero Section with Gradient */}
        <div className="hidden lg:flex lg:flex-col bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 relative overflow-hidden p-12">
          {/* Content */}
          <div className="flex flex-col h-full justify-center items-center z-10">
            {/* Text Section */}
            <div className="mb-12 max-w-xl text-center lg:text-left">
              <h2 className="text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '48px' }}>
                All Your Payouts.
              </h2>
              <h3 className="text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '36px' }}>
                One Powerful Platform.
              </h3>
              <p className="text-white/90 leading-relaxed" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '16px' }}>
                Add funds, manage your wallet, process payouts, and track transactions in real-time with complete security and transparency.
              </p>
            </div>

            {/* Phone Mockup */}
            <div className="flex-1 flex items-center justify-center">
              <DashboardPreview />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
