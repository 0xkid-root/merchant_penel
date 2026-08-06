'use client'

import { useWalletWhitelistDetails } from '../hooks/useWalletWhitelistDetails'
import WalletWhitelistDetailsCard from '../components/wallet-whitelist-details/wallet-whitelist-details-card'
import WalletWhitelistBankDetails from '../components/wallet-whitelist-details/wallet-whitelist-bank-details'
import WalletWhitelistDocumentDetails from '../components/wallet-whitelist-details/wallet-whitelist-document-details'
import WalletWhitelistDetailsSidebar from '../components/wallet-whitelist-details/wallet-whitelist-details-sidebar'
import { WalletWhitelistDetailsSkeleton } from '../components/wallet-whitelist-details/wallet-whitelist-details-skeleton'

interface Props {
  walletWhitelistId: number
}

export default function WalletWhitelistDetailsPage({ walletWhitelistId }: Props) {
  const query = useWalletWhitelistDetails(walletWhitelistId)
  const { data: response, isLoading, isError, isPending } = query

  // In React Query v5, isPending is true when enabled is false and no data exists.
  if (isLoading || isPending) {
    return <WalletWhitelistDetailsSkeleton />
  }

  if (isError || !response?.data) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-6">
        <div className="text-center">
          <p className="text-slate-500">Failed to load wallet whitelist details. Please try again later.</p>
          <p className="text-xs mt-2 text-slate-400">ID: {walletWhitelistId}</p>
        </div>
      </div>
    )
  }

  const walletWhitelist = response.data

  return (
    <div className="space-y-3 p-4 md:p-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => window.history.back()}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">Wallet Whitelist Details</h1>
          <p className="text-xs md:text-sm text-slate-500">
            View information for this whitelisted bank account.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 xl:col-span-9">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-4">
            <WalletWhitelistDetailsCard walletWhitelist={walletWhitelist} />
            <hr className="border-slate-200" />
            <WalletWhitelistBankDetails walletWhitelist={walletWhitelist} />
            <hr className="border-slate-200" />
            <WalletWhitelistDocumentDetails walletWhitelist={walletWhitelist} />
          </div>
        </div>

        <div className="col-span-12 xl:col-span-3">
          <WalletWhitelistDetailsSidebar walletWhitelist={walletWhitelist} />
        </div>
      </div>
    </div>
  )
}
