'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  ArrowUpRight,
  CheckCircle2,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Users2,
  Wallet,
  X,
  Zap,
} from 'lucide-react'

interface DashboardSidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onCloseMobile: () => void
}

const SIDEBAR_SECTIONS = [
  {
    title: null,
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    ],
  },
  {
    title: 'Wallet',
    items: [
      { icon: Wallet, label: 'Wallet', href: '/wallet' },
      {
        icon: CreditCard,
        label: 'Wallet Transactions',
        href: '/wallet-transactions',
      },
    ],
  },
  {
    title: 'Payouts',
    items: [
      { icon: Zap, label: 'Single Payout', href: '/payout/single' },
      { icon: ArrowUpRight, label: 'Direct Payout', href: '/payout/direct' },
      { icon: LogOut, label: 'Bulk Payout', href: '/payout/bulk' },
      {
        icon: FileText,
        label: 'Payout History',
        href: '/payout/payout-history',
      },
      { icon: Users2, label: 'Beneficiaries', href: '/beneficiaries' },
    ],
  },
  {
    title: 'Management',
    items: [
      {
        icon: CheckCircle2,
        label: 'Whitelist',
        href: '/wallet-whitelist',
      },
    ],
  },
]

export function DashboardSidebar({
  collapsed,
  mobileOpen,
  onCloseMobile,
}: DashboardSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')

    onCloseMobile()
    router.push('/')
  }

  const handleNavigation = () => {
    onCloseMobile()
  }

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 lg:static lg:z-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          collapsed ? 'w-64 lg:w-[84px]' : 'w-64'
        } lg:translate-x-0`}
      >
        <div
          className={`flex h-[76px] shrink-0 items-center border-b border-slate-200 ${
            collapsed ? 'justify-between px-4 lg:justify-center lg:px-3' : 'px-5'
          }`}
        >
          <div className="flex items-center">
            <Image
              src="/atmoonpe-logo.png"
              alt="AtMoonPe"
              width={42}
              height={42}
              priority
              className="h-10 w-10 shrink-0 object-contain"
            />

            <span
              className={`ml-3 whitespace-nowrap text-xl font-bold tracking-tight text-slate-900 ${
                collapsed ? 'lg:hidden' : ''
              }`}
            >
              AtMoonPe
            </span>
          </div>

          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close sidebar"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav
          className={`flex-1 overflow-y-auto py-5 ${
            collapsed ? 'px-4 lg:px-3' : 'px-4'
          }`}
        >
          {SIDEBAR_SECTIONS.map((section, sectionIndex) => (
            <div
              key={section.title ?? `section-${sectionIndex}`}
              className="mb-7"
            >
              {section.title && (
                <h3
                  className={`mb-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500 ${
                    collapsed ? 'lg:hidden' : ''
                  }`}
                >
                  {section.title}
                </h3>
              )}

              {collapsed && section.title && (
                <div className="mb-4 hidden border-t border-slate-200 lg:block" />
              )}

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon

                  const active =
                    pathname === item.href ||
                    (item.href !== '/dashboard' &&
                      pathname.startsWith(`${item.href}/`))

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleNavigation}
                      title={collapsed ? item.label : undefined}
                      className={`group flex rounded-xl transition-all ${
                        collapsed
                          ? 'items-center gap-3 px-3 py-2.5 lg:h-11 lg:justify-center lg:px-0'
                          : 'items-center gap-3 px-3 py-2.5'
                      } ${
                        active
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 shrink-0 ${
                          active ? 'text-indigo-600' : 'text-slate-500'
                        }`}
                      />

                      <span
                        className={`whitespace-nowrap text-[15px] font-medium ${
                          collapsed ? 'lg:hidden' : ''
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div
          className={`border-t border-slate-200 ${
            collapsed ? 'p-4 lg:p-3' : 'p-4'
          }`}
        >
          <button
            type="button"
            onClick={handleLogout}
            title={collapsed ? 'Logout' : undefined}
            className={`flex w-full items-center justify-center rounded-xl border border-red-100 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 ${
              collapsed ? 'gap-2 px-4 py-2.5 lg:h-11 lg:px-0' : 'gap-2 px-4 py-2.5'
            }`}
          >
            <LogOut className="h-4 w-4" />

            <span className={collapsed ? 'lg:hidden' : ''}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}