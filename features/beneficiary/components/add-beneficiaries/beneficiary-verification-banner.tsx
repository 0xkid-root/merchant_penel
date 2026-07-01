'use client'

import { CheckCircle2 } from 'lucide-react'

export default function BeneficiaryVerificationBanner() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-green-500 p-2 text-white">
          <CheckCircle2 className="h-5 w-5" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-green-700">
            Account Verified Successfully
          </h3>

          <p className="text-sm text-slate-600">
            Bank details fetched and verified.
          </p>
        </div>
      </div>

      <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
        Verified
      </span>
    </div>
  )
}