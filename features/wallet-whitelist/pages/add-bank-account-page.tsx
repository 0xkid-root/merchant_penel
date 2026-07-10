'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import PageHeader from '@/components/layout/page-header'

import AddBankAccountForm from '../components/add-bank-account/add-bank-account-form'
import AddBankAccountSidebar from '../components/add-bank-account/add-bank-account-sidebar'

export default function AddBankAccountPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex items-center gap-2 text-sm">
        <Link
          href="/wallet-whitelist"
          className="font-medium text-slate-500 transition hover:text-indigo-600"
        >
          Wallet Whitelist
        </Link>

        <ChevronRight className="h-4 w-4 text-slate-400" />

        <span className="font-semibold text-slate-900">
          Add Bank Account
        </span>
      </div>

      <PageHeader
        title="Add Bank Account"
        subtitle="Add a new bank account for wallet withdrawals. All accounts are verified before approval."
      />

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <AddBankAccountForm />

        <div className="hidden xl:block">
          <AddBankAccountSidebar />
        </div>
      </div>
    </div>
  )
}