'use client'

import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { AddFundsForm } from '../components/add-funds-form'
import { PaymentNotes } from '../components/payment-note'
import PageHeader from '@/components/layout/page-header'

export default function AddFundsPage() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', padding: '24px' }}>
      {/* Header with Breadcrumb */}
      <PageHeader
        backHref="/wallet"
        backLabel="Back to Wallet"
        title="Add Funds"
        subtitle="Raise a request to add money to your wallet."
      />

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
