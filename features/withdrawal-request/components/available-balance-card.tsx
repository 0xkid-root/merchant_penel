'use client'

import { Wallet } from 'lucide-react'

interface Props {
  balance: number
}

export default function AvailableBalanceCard({ balance }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 sm:h-12 sm:w-12">
          <Wallet className="h-5 w-5 text-indigo-600 sm:h-6 sm:w-6" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">
            Available Balance
          </p>

          <h2 className="mt-1 break-all text-2xl font-bold text-slate-900 sm:text-3xl">
            ₹{balance.toLocaleString('en-IN')}
          </h2>
        </div>
      </div>
    </div>
  )
}