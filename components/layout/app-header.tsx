'use client'

import { useState } from 'react'
import { Bell, ChevronDown, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import ProfileDropdown from './profile-dropdown'

interface AppHeaderProps {
  merchantName?: string
}

export default function AppHeader({
  merchantName = 'Demo Pvt. Ltd.',
}: AppHeaderProps) {
  const [open, setOpen] = useState(false)

  const pathname = usePathname()

  const pageTitles: Record<string, string> = {
    dashboard: 'Dashboard',
    wallet: 'Wallet',
    'wallet-transactions': 'Wallet Transactions',
    beneficiaries: 'Beneficiaries',
    payout: 'Payout',
    reports: 'Reports',
    notifications: 'Notifications',
    'wallet-whitelist': 'Wallet Whitelist',
  }

  const route = pathname.split('/').pop() || 'dashboard'
  const pageTitle = pageTitles[route] || 'Merchant Panel'

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

      {/* Left */}
      <div className="flex items-center gap-4">

        <button className="text-slate-700 transition-colors hover:text-indigo-600">
          <Menu className="h-6 w-6" />
        </button>

        <h2 className="text-3xl font-bold text-slate-900">
          {pageTitle}
        </h2>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Notification */}
        <button className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white transition-colors hover:bg-slate-50">

          <Bell className="h-5 w-5 text-slate-600" />

          <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-semibold text-white">
            3
          </span>

        </button>

        {/* Merchant Profile */}
        <div className="relative">

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 transition-colors hover:bg-slate-50"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
              D
            </div>

            <div className="text-left">

              <p className="text-sm font-semibold text-slate-900">
                {merchantName}
              </p>

              <p className="text-xs text-slate-500">
                MID : M123456
              </p>

            </div>

            <ChevronDown
              className={`h-4 w-4 text-slate-500 transition-transform ${
                open ? 'rotate-180' : ''
              }`}
            />

          </button>

          {open && (
            <ProfileDropdown
              onClose={() => setOpen(false)}
            />
          )}

        </div>

      </div>

    </header>
  )
}