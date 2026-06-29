'use client'

import { Plus, ArrowRight } from 'lucide-react'
import { PrimaryButton } from '@/components/buttons/primary-button'
import { BalanceCards } from '../components/balance-cards'
import { BalanceTrendChart } from '../components/balance-trend-chart'
import { BalanceBreakdown } from '../components/balance-breakdown'
import { WalletTransactionsTable } from '../components/transactions-table'

export default function WalletPage() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '32px', margin: 0 }}>
            Wallet Overview
          </h1>
          <p className="text-gray-600" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '15px', margin: '8px 0 0 0' }}>
            Manage your wallet balance, funds and transactions
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <PrimaryButton>
            <Plus className="w-4 h-4" />
            Add Funds
          </PrimaryButton>
          <PrimaryButton>
            <ArrowRight className="w-4 h-4" />
            Withdrawal Request
          </PrimaryButton>
        </div>
      </div>

      {/* Balance Cards - Grid Layout */}
      <BalanceCards />

      {/* Charts Section - 2fr 1fr Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <BalanceTrendChart />
        <BalanceBreakdown />
      </div>

      {/* Transactions Table */}
      <WalletTransactionsTable />
    </div>
  )
}
