'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import PageFooter from '@/components/layout/page-footer'
import AppHeader from '@/components/layout/app-header'

export default function MerchantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')

    if (!isAuthenticated) {
      router.push('/')
    }
  }, [router])

  const toggleSidebar = () => {
    setIsSidebarCollapsed((previous) => !previous)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <DashboardSidebar collapsed={isSidebarCollapsed} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <AppHeader
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={toggleSidebar}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="flex min-h-full flex-col">
            <div className="flex-1">{children}</div>

            <PageFooter />
          </div>
        </main>
      </div>
    </div>
  )
}