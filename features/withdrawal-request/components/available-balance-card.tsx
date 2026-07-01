'use client'

import { Wallet } from 'lucide-react'

interface Props {
  balance: number
}

export default function AvailableBalanceCard({
  balance,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
          <Wallet className="h-6 w-6 text-indigo-600" />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500">
            Available Balance
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            ₹{balance.toLocaleString('en-IN')}
          </h2>
        </div>
      </div>
    </div>
  )
}
