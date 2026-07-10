'use client'

import { AddFundsForm } from '../components/add-funds-form'
import { PaymentNotes } from '../components/payment-note'
import PageHeader from '@/components/layout/page-header'

export default function AddFundsPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      <PageHeader
        backHref="/wallet"
        backLabel="Back to Wallet"
        title="Add Funds"
        subtitle="Raise a request to add money to your wallet."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <AddFundsForm />
        <PaymentNotes />
      </div>
    </div>
  )
}