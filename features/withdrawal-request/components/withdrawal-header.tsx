'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function WithdrawalHeader() {
  return (
    <div className="space-y-4">

      {/* Back Button */}
      <Link
        href="/wallet"
        className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Wallet
      </Link>

      {/* Heading */}
      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          Withdrawal Request
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Request a withdrawal from your wallet to your registered bank
          account. Your request will be reviewed by our team before
          processing.
        </p>

      </div>

    </div>
  )
}
