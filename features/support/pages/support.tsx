'use client'

import { MessageSquare, Plus } from 'lucide-react'
import { PrimaryButton } from '@/components/buttons/primary-button'
import { EmptyState } from '@/components/common/empty-state'

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '32px' }}>
            Support
          </h1>
          <p className="text-gray-600 mt-1" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '15px' }}>
            Get help with your account and transactions
          </p>
        </div>
        <PrimaryButton>
          <Plus className="w-4 h-4" />
          Create Ticket
        </PrimaryButton>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <EmptyState 
          icon={MessageSquare} 
          title="No support tickets" 
          description="Contact our support team if you need any assistance."
        />
      </div>
    </div>
  )
}
