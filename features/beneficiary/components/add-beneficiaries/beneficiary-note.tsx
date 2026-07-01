'use client'

import { AlertCircle } from 'lucide-react'

export default function BeneficiaryNote() {
  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">

      <div className="flex items-start gap-3">

        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
          <AlertCircle className="h-5 w-5 text-blue-600" />
        </div>

        <div>

          <h3 className="text-sm font-semibold text-blue-900">
            Important Note
          </h3>

          <p className="mt-2 text-sm leading-6 text-blue-700">
            Bank details are verified using the Penny Drop verification
            process. Only verified beneficiaries can receive payouts.
            Please ensure the beneficiary name, account number and IFSC
            code are correct before proceeding.
          </p>

        </div>

      </div>

    </div>
  )
}