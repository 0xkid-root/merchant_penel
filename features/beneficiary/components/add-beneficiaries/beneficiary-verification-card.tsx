'use client'

import { CheckCircle2 } from 'lucide-react'

import { BankDetails } from '../types'

interface Props {
  isVerified: boolean
  bankDetails: BankDetails | null
}

export default function BeneficiaryVerificationCard({
  isVerified,
  bankDetails,
}: Props) {
  if (!isVerified || !bankDetails) return null

  return (
    <>
      {/* Success Banner */}

      <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-emerald-700">
                Account Verified Successfully
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Bank details fetched and verified.
              </p>
            </div>

          </div>

          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
            Verified ✓
          </span>

        </div>

      </div>

      {/* Bank Details */}

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">

        <div className="grid grid-cols-3 divide-x divide-slate-200">

          <div className="p-6">
            <p className="mb-2 text-sm font-medium text-slate-700">
              Account Holder Name
            </p>

            <p className="text-sm font-semibold text-slate-900">
              {bankDetails.accountHolderName}
            </p>
          </div>

          <div className="p-6">
            <p className="mb-2 text-sm font-medium text-slate-700">
              Bank Name
            </p>

            <p className="text-sm font-semibold text-slate-900">
              {bankDetails.bankName}
            </p>
          </div>

          <div className="p-6">
            <p className="mb-2 text-sm font-medium text-slate-700">
              Branch Name
            </p>

            <p className="text-sm font-semibold text-slate-900">
              {bankDetails.branchName}
            </p>
          </div>

        </div>

        <div className="border-t border-slate-200">

          <div className="grid grid-cols-3 divide-x divide-slate-200">

            <div className="p-6">
              <p className="mb-2 text-sm font-medium text-slate-700">
                Account Type
              </p>

              <p className="text-sm font-semibold text-slate-900">
                {bankDetails.accountType}
              </p>
            </div>

            <div className="p-6">
              <p className="mb-2 text-sm font-medium text-slate-700">
                UPI ID (if available)
              </p>

              <p className="text-sm font-semibold text-slate-900">
                {bankDetails.upiId}
              </p>
            </div>

            <div className="p-6">
              <p className="mb-2 text-sm font-medium text-slate-700">
                Verification Status
              </p>

              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                {bankDetails.verificationStatus} ✓
              </span>
            </div>

          </div>

        </div>

      </div>
    </>
  )
}