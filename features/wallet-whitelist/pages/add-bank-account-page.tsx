// features/wallet-whitelist/components/add-bank-account/add-bank-account-page.tsx

'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import AddBankAccountForm from './add-bank-account-form'
import AddBankAccountSidebar from './add-bank-account-sidebar'

export default function AddBankAccountPage() {
  return (
    <div className="space-y-6">
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

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-slate-900">
                Add Bank Account
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Add a new bank account for wallet withdrawals. All accounts are
                verified before approval.
              </p>
            </div>

            <AddBankAccountForm />
          </div>

          <div className="hidden border-l border-slate-200 xl:col-span-4 xl:block">
            <div className="pl-8">
              <AddBankAccountSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}