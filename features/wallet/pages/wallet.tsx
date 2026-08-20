'use client'

import { ArrowRight, Plus, Loader2, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { PrimaryButton } from '@/components/buttons/primary-button'
import { SecondaryButton } from '@/components/buttons/secondary-button'
import PageHeader from '@/components/layout/page-header'

import { BalanceCards } from '../components/balance-cards'
import { WalletTransactionsTable } from '../components/wallet-transactions-table'
import { useWalletDashboard } from '../hooks/useWalletDashboard'
import WalletPageSkeleton from '../components/wallet-page-skeleton'

export default function WalletPage() {
  const router = useRouter()
  const { data, isLoading, isError, refetch } = useWalletDashboard()

  const addFundsPage = () => {
    router.push('/add-funds')
  }

  const withdrawPage = () => {
    router.push('/withdrawal-request')
  }

  if (isLoading) {
    return <WalletPageSkeleton />
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-[450px] w-full items-center justify-center p-6">
        <div className="group flex w-full max-w-md flex-col items-center gap-5 rounded-3xl border border-slate-100 bg-white p-10 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 transition-transform group-hover:scale-105">
            <AlertCircle className="h-8 w-8 text-red-500" strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-tight text-slate-900">
              Dashboard Unavailable
            </h3>
            <p className="mx-auto max-w-[280px] text-sm leading-relaxed text-slate-500">
              We encountered a temporary issue while fetching your wallet details.
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="mt-4 rounded-xl bg-slate-900 px-8 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md active:scale-[0.98]"
          >
            Try Again
          </button>
        </div>
      </div>
    )
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
      <BalanceCards summary={data.summary} />

      <WalletTransactionsTable transactions={data.recentTransactions} />
    </div>
  )
}