'use client'

import { Bell, ChevronDown } from 'lucide-react'

interface MerchantHeaderProps {
  title: string
  subtitle?: string
  merchantName?: string
}

export default function MerchantHeader({
  title,
  subtitle,
  merchantName = 'Demo Pvt. Ltd.',
}: MerchantHeaderProps) {
  return (
    <header className="flex items-start justify-between mb-8">

      {/* Left */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-[15px] text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Notification */}
        <button className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white transition-colors hover:bg-slate-50">

          <Bell className="h-5 w-5 text-slate-600" />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-blue-600" />

        </button>

        {/* Merchant */}
        <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 transition-colors hover:bg-slate-50">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
            D
          </div>

          <div className="text-left">
            <p className="text-sm font-semibold text-slate-900">
              {merchantName}
            </p>

            <p className="text-xs text-slate-500">
              Merchant
            </p>
          </div>

          <ChevronDown className="h-4 w-4 text-slate-500" />

        </button>

      </div>

    </header>
  )
}