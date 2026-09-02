'use client'

import { useState } from 'react'
import { Bell, ChevronDown, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { useProfile } from '@/features/profile/hooks/useProfile'
import ProfileDropdown from './profile-dropdown'
import { getPageTitle } from '@/lib/utils/get-page-title'

interface AppHeaderProps {
  isSidebarCollapsed: boolean
  onToggleSidebar: () => void
  onOpenMobileSidebar: () => void
}

export default function AppHeader({
  isSidebarCollapsed,
  onToggleSidebar,
  onOpenMobileSidebar,
}: AppHeaderProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const { data: profileResponse } = useProfile()
  const pageTitle = getPageTitle(pathname)

  const companyName = profileResponse?.businessProfile?.businessName || 'Demo Pvt. Ltd.'
  const mid = profileResponse?.merchantId ? `M${profileResponse.merchantId}` : 'M123456'
  const initial = companyName.charAt(0).toUpperCase()

  return (
    <header className="sticky top-0 z-30 flex h-[76px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:h-[101px] lg:px-10">
      <div className="flex min-w-0 items-center gap-3 sm:gap-5">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          aria-label="Open sidebar"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={
            isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
          }
          className="hidden h-11 w-11 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100 lg:flex"
        >
          <Menu className="h-7 w-7" />
        </button>

        <h1 className="truncate text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
          {pageTitle}
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:bg-slate-50 sm:h-12 sm:w-12"
        >
          <Bell className="h-5 w-5 text-slate-600" />

          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-semibold text-white sm:right-2 sm:top-2 sm:h-5 sm:w-5 sm:text-[10px]">
            3
          </span>
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 transition hover:bg-slate-50 sm:gap-3 sm:px-3 sm:py-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white sm:h-11 sm:w-11 sm:text-base">
              {initial}
            </div>

            <div className="hidden text-left md:block">
              <p className="text-sm font-semibold text-slate-900">
                {companyName}
              </p>
            </div>

            <ChevronDown
              className={`hidden h-4 w-4 text-slate-500 transition-transform sm:block ${open ? 'rotate-180' : ''}`}
            />
          </button>

          {open && <ProfileDropdown onClose={() => setOpen(false)} />}
        </div>
      </div>
    </header>
  )
}