'use client'

import { ArrowRight, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { PrimaryButton } from '@/components/buttons/primary-button'
import { SecondaryButton } from '@/components/buttons/secondary-button'
import PageHeader from '@/components/layout/page-header'

import { BalanceCards } from '../components/balance-cards'
import { WalletTransactionsTable } from '../components/wallet-transactions-table'

export default function WalletPage() {
  const router = useRouter()

  const addFundsPage = () => {
    router.push('/add-funds')
  }

  const withdrawPage = () => {
    router.push('/withdrawal-request')
  }

  return (
    <div className="min-w-0 space-y-6 p-4 sm:space-y-7 sm:p-6 lg:p-8">

      <PageHeader
        title="Wallet Overview"
        subtitle="Manage your wallet balance, funds and transactions"
        actions={
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">
            <SecondaryButton
              onClick={addFundsPage}
              className="h-12 w-full justify-center sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              Add Funds
            </SecondaryButton>

            <PrimaryButton
              onClick={withdrawPage}
              className="h-12 w-full justify-center sm:w-auto"
            >
              <ArrowRight className="h-4 w-4" />
              Withdrawal Request
            </PrimaryButton>
          </div>
        }
      />
      <BalanceCards />

      <WalletTransactionsTable />
    </div>
  )
}