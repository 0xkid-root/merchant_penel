'use client'

import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { SecondaryButton } from '@/components/buttons/secondary-button'
import PageHeader from '@/components/layout/page-header'

import WalletWhitelistTable from '../components/wallet-whitelist-table'

export default function WalletWhitelistPage() {
  const router = useRouter()

  const handleAddBankAccount = () => {
    router.push('/wallet-whitelist/add-bank-account')
  }

  return (
    <div className="min-h-full bg-slate-50 px-4 py-5 lg:px-6">
      <div className="mx-auto max-w-[1440px]">
        <PageHeader
          title="Wallet Whitelist"
          subtitle="Manage your approved bank accounts for wallet withdrawals and fund transfers."
          actions={
            <SecondaryButton onClick={handleAddBankAccount}>
              <Plus className="h-4 w-4" />
              Add Bank Account
            </SecondaryButton>
          }
        />

        <div className="mt-6">
          <WalletWhitelistTable />
        </div>
      </div>
    </div>
  )
}