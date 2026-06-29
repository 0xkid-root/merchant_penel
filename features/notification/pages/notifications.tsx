'use client'

import { Bell } from 'lucide-react'
import { EmptyState } from '@/components/common/empty-state'

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '32px' }}>
          Notifications
        </h1>
        <p className="text-gray-600 mt-1" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '15px' }}>
          Stay updated with your transaction alerts
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <EmptyState icon={Bell} title="No notifications" description="You&apos;re all caught up! Check back later for updates." />
      </div>
    </div>
  )
}
