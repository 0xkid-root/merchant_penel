'use client'

import WithdrawalHeader from '../components/withdrawal-header'
import WithdrawalRequestForm from '../components/withdrawal-request-form'
import { WithdrawalLimitsInfo } from '../components/withdrawal-limits-info'

export default function WithdrawalRequestPage() {
  return (
    <div className="space-y-8 p-6">

      <WithdrawalHeader />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

        <WithdrawalRequestForm />

        <WithdrawalLimitsInfo />

      </div>

    </div>
  )
}