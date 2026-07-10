'use client'

import WithdrawalRequestForm from '../components/withdrawal-request-form'
import { WithdrawalLimitsInfo } from '../components/withdrawal-limits-info'
import PageHeader from '@/components/layout/page-header'

export default function WithdrawalRequestPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      <PageHeader
        backHref="/wallet"
        backLabel="Back to Wallet"
        title="Withdrawal Request"
        subtitle="Request a withdrawal from your wallet to your registered bank account."
      />

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <WithdrawalRequestForm />
        <WithdrawalLimitsInfo />
      </div>
    </div>
  )
}