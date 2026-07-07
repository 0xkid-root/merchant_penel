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
  Zap,
} from 'lucide-react'

interface DashboardSidebarProps {
  collapsed: boolean
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
}: DashboardSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    router.push('/')
  }

  return (
    <aside
      className={`flex h-screen shrink-0 flex-col border-r border-slate-200 bg-white transition-all duration-300 ${
        collapsed ? 'w-[84px]' : 'w-64'
      }`}
    >
      <div
        className={`flex h-[101px] items-center border-b border-slate-200 ${
          collapsed ? 'justify-center px-3' : 'px-5'
        }`}
      >
        <Image
          src="/atmoonpe-logo.png"
          alt="AtMoonPe"
          width={42}
          height={42}
          priority
          className="h-10 w-10 shrink-0 object-contain"
        />

        {!collapsed && (
          <span className="ml-3 whitespace-nowrap text-xl font-bold tracking-tight text-slate-900">
            AtMoonPe
          </span>
        )}
      </div>

      <nav
        className={`flex-1 overflow-y-auto py-5 ${
          collapsed ? 'px-3' : 'px-4'
        }`}
      >
        {SIDEBAR_SECTIONS.map((section, sectionIndex) => (
          <div
            key={section.title ?? `section-${sectionIndex}`}
            className="mb-7"
          >
            {!collapsed && section.title && (
              <h3 className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {section.title}
              </h3>
            )}

            {collapsed && section.title && (
              <div className="mb-4 border-t border-slate-200" />
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
                    title={collapsed ? item.label : undefined}
                    className={`group flex rounded-xl transition-all ${
                      collapsed
                        ? 'h-11 items-center justify-center px-0'
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

                    {!collapsed && (
                      <span className="whitespace-nowrap text-[15px] font-medium">
                        {item.label}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className={`border-t border-slate-200 ${collapsed ? 'p-3' : 'p-4'}`}>
        <button
          type="button"
          onClick={handleLogout}
          title={collapsed ? 'Logout' : undefined}
          className={`flex rounded-xl border border-red-100 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 ${
            collapsed
              ? 'h-11 w-full items-center justify-center'
              : 'w-full items-center justify-center gap-2 px-4 py-2.5'
          }`}
        >
          <LogOut className="h-4 w-4" />

          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}