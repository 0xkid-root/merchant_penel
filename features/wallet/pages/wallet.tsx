'use client'

import { Plus, ArrowRight } from 'lucide-react'
import { PrimaryButton } from '@/components/buttons/primary-button'
import { SecondaryButton } from '@/components/buttons/secondary-button'
import { useRouter } from 'next/navigation'


import { BalanceCards } from '../components/balance-cards'
import { WalletTransactionsTable } from '../components/wallet-transactions-table'
import PageHeader from '@/components/layout/page-header'

export default function WalletPage() {
  const router = useRouter()


  const addfundsPage = ()=>{
    router.push('/add-funds')
  }

  const withdrawPage = ()=>{
    router.push('/withdrawal-request')
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', padding: '24px' }}>
      {/* Header */}

      <PageHeader
        title="Wallet Overview"
        subtitle="Manage your wallet balance, funds and transactions"
        actions={
          <>
            <SecondaryButton
              onClick={addfundsPage}
            >
              <Plus className="h-4 w-4" />
              Add Funds
            </SecondaryButton>

            <PrimaryButton
              onClick={withdrawPage}
            >
              <ArrowRight className="h-4 w-4" />
              Withdrawal Request
            </PrimaryButton>
          </>
        }
      />

      {/* Balance Cards - Grid Layout */}
      <BalanceCards />

      {/* Charts Section - 2fr 1fr Grid */}
      {/* <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <BalanceTrendChart />
        <BalanceBreakdown />
      </div> */}

      {/* Transactions Table */}
      <WalletTransactionsTable />
    </div>
  )
}
