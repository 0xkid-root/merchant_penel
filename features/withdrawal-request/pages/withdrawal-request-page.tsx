'use client'

import WithdrawalHeader from '../components/withdrawal-header'
import WithdrawalRequestForm from '../components/withdrawal-request-form'
import { WithdrawalLimitsInfo } from '../components/withdrawal-limits-info'
import PageHeader from '@/components/layout/page-header'

export default function WithdrawalRequestPage() {
    return (
        <div className="space-y-8 p-6">

            <PageHeader
                backHref="/wallet"
                backLabel="Back to Wallet"
                title="Withdrawal Request"
                subtitle="Request a withdrawal from your wallet to your registered bank account."
            />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

                <WithdrawalRequestForm />

                <WithdrawalLimitsInfo />

            </div>

        </div>
    )
}