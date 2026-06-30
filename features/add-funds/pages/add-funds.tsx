'use client'

import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { AddFundsForm } from '../components/add-funds-form'
import { PaymentNotes } from '../components/payment-note'
export default function AddFundsPage() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', padding: '24px' }}>
      {/* Header with Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Link href="/wallet" className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px' }}>Back to Wallet</span>
          </Link>
        </div>
        
        <div>
          <h1 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '32px', margin: 0, marginBottom: '8px' }}>
            Add Funds
          </h1>
          <p className="text-gray-600 " >
            Raise a request to add money to your wallet. The request will be reviewed by our team.
          </p>
        </div>
      </div>

      {/* Main Content - 2 Column Layout */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column - Form */}
        <AddFundsForm />

        {/* Right Column - Info & Help */}
        <PaymentNotes />
      </div>
    </div>
  )
}
