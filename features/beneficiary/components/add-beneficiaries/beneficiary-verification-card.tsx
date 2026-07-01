'use client'

import { CheckCircle } from 'lucide-react'

import { BankDetails } from './types'

interface Props {
  bankDetails: BankDetails
}

export default function BeneficiaryVerificationCard({
  bankDetails,
}: Props) {
  return (
    <div className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>

          <div>

            <h3 className="text-base font-semibold text-green-700">
              Account Verified Successfully
            </h3>

            <p className="mt-1 text-sm text-green-600">
              Bank details fetched and verified successfully.
            </p>

          </div>

        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Verified
        </span>

      </div>

      {/* Bank Details */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Account Holder
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-900">
            {bankDetails.accountHolderName}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Bank Name
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-900">
            {bankDetails.bankName}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Branch
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-900">
            {bankDetails.branchName}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Account Type
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-900">
            {bankDetails.accountType}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            UPI ID
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-900">
            {bankDetails.upiId || '-'}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Verification Status
          </p>

          <p className="mt-1 text-sm font-semibold text-green-600">
            {bankDetails.verificationStatus}
          </p>
        </div>

      </div>

    </div>
  )
}