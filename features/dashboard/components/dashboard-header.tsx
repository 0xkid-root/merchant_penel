'use client'

import { Bell, Calendar, ChevronDown } from 'lucide-react'

interface DashboardHeaderProps {
  userEmail: string
}

export default function DashboardHeader({
  userEmail,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1
          className="text-gray-900"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '32px',
          }}
        >
          Dashboard
        </h1>

        <p
          className="text-gray-600 mt-1"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 400,
            fontSize: '15px',
          }}
        >
          Welcome back, {userEmail}. Here's what's happening with your account
          today.
        </p>
      </div>

      <div className="flex items-center gap-4">


        <button className="relative p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-600"></span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
            D
          </div>

          <span>Demo Pvt. Ltd.</span>

          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  )
}