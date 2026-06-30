'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Wallet,
  Plus,
  LogOut,
  CreditCard,
  ArrowUpRight,
  Zap,
  Users2,
  CheckCircle2,
  FileText,
  Bell,
  User,
  HelpCircle,
} from 'lucide-react'

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
      { icon: Plus, label: 'Add Funds', href: '/add-funds' },
      { icon: ArrowUpRight, label: 'Withdrawal', href: '/withdrawal' },
      { icon: CreditCard, label: 'Transactions', href: '/transactions' },
    ],
  },
  {
    title: 'Payouts',
    items: [
      { icon: Zap, label: 'Single Payout', href: '/single-payout' },
      { icon: LogOut, label: 'Bulk Payout', href: '/bulk-payout' },
      { icon: FileText, label: 'Payout History', href: '/payout-history' },
      { icon: Users2, label: 'Beneficiaries', href: '/beneficiaries' },
    ],
  },
  {
    title: 'Management',
    items: [
      { icon: CheckCircle2, label: 'Whitelist', href: '/whitelist' },
      { icon: FileText, label: 'Reports', href: '/reports' },
      
    ],
  },
  
]

export function DashboardSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    router.push('/')
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">

      {/* Logo */}

      <div className="border-b border-slate-200 px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">

            <span className="text-lg font-bold text-white">⚡</span>

          </div>

          <h1 className="text-base font-bold text-slate-900">
            AtMoonPe
          </h1>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto px-4 py-5">

        {SIDEBAR_SECTIONS.map((section) => (
          <div key={section.title} className="mb-7">

            {section.title && (
              <h3 className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {section.title}
              </h3>
            )}

            <div className="space-y-1">

              {section.items.map((item) => {
                const Icon = item.icon

                const active = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 transition-all ${
                      active
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <Icon
                        className={`h-5 w-5 ${
                          active
                            ? 'text-indigo-600'
                            : 'text-slate-500'
                        }`}
                      />

                      <span className="text-[15px] font-medium">
                        {item.label}
                      </span>

                    </div>

                    {item.badge && (
                      <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-semibold text-white">
                        {item.badge}
                      </span>
                    )}

                  </Link>
                )
              })}

            </div>

          </div>
        ))}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-200 p-4">

        <button
          onClick={handleLogout}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>

      </div>

    </aside>
  )
}