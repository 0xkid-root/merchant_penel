'use client'

import { ArrowRight, Plus, Loader2, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { PrimaryButton } from '@/components/buttons/primary-button'
import { SecondaryButton } from '@/components/buttons/secondary-button'
import PageHeader from '@/components/layout/page-header'

import { BalanceCards } from '../components/balance-cards'
import { WalletTransactionsTable } from '../components/wallet-transactions-table'
import { useWallet } from '../hooks/useWallet'

export default function WalletPage() {
  const router = useRouter()
  const { isLoading, isError, refetch } = useWallet()

  const addFundsPage = () => {
    router.push('/add-funds')
  }

  const withdrawPage = () => {
    router.push('/withdrawal-request')
  }

  if (isLoading) {
      return (
          <div className="flex h-[400px] w-full items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                  <p className="text-sm font-medium text-slate-500">Loading wallet...</p>
              </div>
          </div>
      )
  }

  if (isError) {
      return (
          <div className="flex h-[400px] w-full items-center justify-center p-6">
              <div className="flex max-w-sm flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                      <h3 className="text-lg font-bold text-slate-900">Unable to load wallet</h3>
                      <p className="mt-1 text-sm text-slate-500">
                          Please try again.
                      </p>
                  </div>
                  <button
                      onClick={() => refetch()}
                      className="mt-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                      Retry
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
      <BalanceCards />

      <WalletTransactionsTable />
    </div>
  )
}