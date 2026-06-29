'use client'

import Link from 'next/link'
import { LayoutDashboard, Wallet, Plus, LogOut, CreditCard, ArrowUpRight, Zap, Users2, CheckCircle2, FileText, Bell, LogIn, HelpCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

const SIDEBAR_SECTIONS = [
  {
    title: null,
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' }
    ]
  },
  {
    title: 'WALLET',
    items: [
      { icon: Wallet, label: 'Wallet', href: '/wallet' },
      { icon: Plus, label: 'Add Funds', href: '/add-funds' },
      { icon: ArrowUpRight, label: 'Withdrawal', href: '/withdrawal' },
      { icon: CreditCard, label: 'Transactions', href: '/transactions' }
    ]
  },
  {
    title: 'PAYOUTS',
    items: [
      { icon: Zap, label: 'Single Payout', href: '/single-payout' },
      { icon: LogOut, label: 'Bulk Payout', href: '/bulk-payout' },
      { icon: FileText, label: 'Payout History', href: '/payout-history' },
      { icon: Users2, label: 'Beneficiaries', href: '/beneficiaries' }
    ]
  },
  {
    title: 'MANAGEMENT',
    items: [
      { icon: CheckCircle2, label: 'Whitelist', href: '/whitelist' },
      { icon: FileText, label: 'Reports', href: '/reports' },
      { icon: Bell, label: 'Notifications', href: '/notifications', badge: 3 }
    ]
  },
  {
    title: 'ACCOUNT',
    items: [
      { icon: LogIn, label: 'Profile', href: '/profile' },
      { icon: HelpCircle, label: 'Support', href: '/support' }
    ]
  }
]

export function DashboardSidebar() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    router.push('/')
  }

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-lg">
            <span className="text-white font-bold text-sm">⚡</span>
          </div>
          <h1 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '16px' }}>AtMoonPe</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {SIDEBAR_SECTIONS.map((section, idx) => (
          <div key={idx}>
            {section.title && (
              <h3 className="text-gray-500 uppercase tracking-wider mb-3" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '11px' }}>
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '15px' }}>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-red-500 text-white px-2 py-0.5 rounded-full" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '12px' }}>
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
      <div className="p-4 border-t border-gray-200 space-y-3">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-gray-600 mb-1" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '13px' }}>Demo Pvt. Ltd.</p>
          <p className="text-gray-500" style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '12px' }}>MID: M123456</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
