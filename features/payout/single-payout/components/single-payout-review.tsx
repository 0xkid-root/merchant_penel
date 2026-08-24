'use client'

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  FileText,
  IndianRupee,
  Landmark,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

import { PrimaryButton } from '@/components/buttons/primary-button'
import { SecondaryButton } from '@/components/buttons/secondary-button'

import { formatCurrency } from '@/lib/utils/formatCurrency'

import type { BeneficiaryResponse } from '@/features/beneficiary/types/beneficiary.types'

interface SinglePayoutReviewProps {
  beneficiary: BeneficiaryResponse
  amount: number
  paymentMode: string
  remarks: string
  charges: number
  totalDebit: number
  isLoading: boolean
  onBack: () => void
  onContinue: () => void
}

export default function SinglePayoutReview({
  beneficiary,
  amount,
  paymentMode,
  remarks,
  charges,
  totalDebit,
  isLoading,
  onBack,
  onContinue,
}: SinglePayoutReviewProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Review Payout
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Please verify all payout details before requesting OTP.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-150 bg-white">
        <div className="border-b border-slate-150 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
              <CheckCircle2 className="h-5 w-5 text-indigo-600" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Payout Summary
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Confirm beneficiary and transaction details.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-4">
          {/* Beneficiary details */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <UserRound className="h-4 w-4 text-indigo-600" />

              <h3 className="text-sm font-semibold text-slate-900">
                Beneficiary Details
              </h3>
            </div>

            <div className="">
              <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Beneficiary Name
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {beneficiary.beneficiaryName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Account Holder Name
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {beneficiary.verifiedAccountName || beneficiary.beneficiaryName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Bank Name
                  </p>

                  <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <Building2 className="h-4 w-4 text-slate-400" />
                    {beneficiary.bankName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Account Type
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {beneficiary.accountType}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Account Number
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {beneficiary.accountNumber
                      ? `XXXXXX${beneficiary.accountNumber.slice(-4)}`
                      : 'N/A'}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500">
                    IFSC Code
                  </p>

                  <p className="mt-1 text-sm font-semibold tracking-wide text-slate-900">
                    {beneficiary.ifscCode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction details */}
          <div className='border-t border-slate-200 '>
            <div className="mb-4 flex items-center gap-2 mt-2">
              <FileText className="h-4 w-4 text-indigo-600"/>

              <h3 className="text-sm font-semibold text-slate-900">
                Transaction Details
              </h3>
            </div>

            <div className="overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-150 bg-white px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                    <IndianRupee className="h-4 w-4 text-indigo-600" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Payout Amount
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Amount to be sent to beneficiary
                    </p>
                  </div>
                </div>

                <p className="text-lg font-bold text-slate-900">
                  {formatCurrency(amount)}
                </p>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Payout Charges
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Transaction processing charges
                  </p>
                </div>

                <p className="text-sm font-semibold text-slate-900">
                  {formatCurrency(charges)}
                </p>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Payment Mode
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Transfer network
                  </p>
                </div>

                <p className="text-sm font-semibold text-slate-900">
                  {paymentMode}
                </p>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-indigo-900">
                    Total Debit From Wallet
                  </p>

                  <p className="mt-0.5 text-xs text-indigo-600">
                    Total amount deducted from wallet balance
                  </p>
                </div>

                <p className="text-lg font-bold text-indigo-700">
                  {formatCurrency(totalDebit)}
                </p>
              </div>
            </div>
          </div>

          {/* Remarks */}
          {remarks && (
            <div>
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-indigo-600" />

                <h3 className="text-sm font-semibold text-slate-900">
                  Remarks
                </h3>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
                <p className="text-sm leading-6 text-slate-700">{remarks}</p>
              </div>
            </div>
          )}

    

          {/* Footer actions */}
          <div className="flex flex-col-reverse gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Landmark className="h-4 w-4 text-slate-400" />
              Please verify the bank details before proceeding.
            </div>

            <div className="flex items-center gap-3">
              <SecondaryButton onClick={onBack} disabled={isLoading}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </SecondaryButton>

              <PrimaryButton onClick={onContinue} disabled={isLoading}>
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}