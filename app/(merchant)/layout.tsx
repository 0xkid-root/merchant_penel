'use client'

import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import PageFooter from '@/components/layout/page-footer'
import AppHeader from '@/components/layout/app-header'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function MerchantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')

    if (!isAuthenticated) {
      router.push('/')
    }
  }, [router])

  return (
    <div className="flex h-screen bg-gray-50">

      <DashboardSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">

        <AppHeader />

        <main className="flex-1 overflow-y-auto">

          <div className="min-h-full flex flex-col">

            <div className="flex-1">
              {children}
            </div>

            <PageFooter />

          </div>

        </main>

      </div>

    </div>
  )
}