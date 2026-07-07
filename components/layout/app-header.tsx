'use client'

import { useState } from 'react'
import { Bell, ChevronDown, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'

import ProfileDropdown from './profile-dropdown'
import { getPageTitle } from '@/lib/utils/get-page-title'

interface AppHeaderProps {
  isSidebarCollapsed: boolean
  onToggleSidebar: () => void
}

export default function AppHeader({
  isSidebarCollapsed,
  onToggleSidebar,
}: AppHeaderProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const pageTitle = getPageTitle(pathname)

  return (
    <header className="sticky top-0 z-30 flex h-[101px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-10">
      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={
            isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
          }
          className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100"
        >
          <Menu className="h-7 w-7" />
        </button>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:bg-slate-50"
        >
          <Bell className="h-5 w-5 text-slate-600" />

          <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-semibold text-white">
            3
          </span>
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 transition hover:bg-slate-50"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-base font-bold text-white">
              D
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-900">
                Demo Pvt. Ltd.
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

          {open && <ProfileDropdown onClose={() => setOpen(false)} />}
        </div>
      </div>
    </header>
  )
}