'use client'

import { useMemo } from 'react'
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  IndianRupee,
  Landmark,
  UserRound,
} from 'lucide-react'

import { PrimaryButton } from '@/components/buttons/primary-button'

import {
  SINGLE_PAYOUT_BENEFICIARIES,
  formatIndianCurrency,
} from '../data/single-payout-data'

import type {
  SinglePayoutBeneficiary,
  SinglePayoutFormData,
} from '../types/single-payout.types'

interface SinglePayoutFormProps {
  formData: SinglePayoutFormData
  selectedBeneficiary: SinglePayoutBeneficiary | null
  walletBalance: number
  minAmount: number
  maxAmount: number
  error: string | null
  onSelectBeneficiary: (beneficiaryId: number) => void
  onChange: (
    field: keyof SinglePayoutFormData,
    value: string | number | null,
  ) => void
  onContinue: () => void
}

export default function SinglePayoutForm({
  formData,
  selectedBeneficiary,
  walletBalance,
  minAmount,
  maxAmount,
  error,
  onSelectBeneficiary,
  onChange,
  onContinue,
}: SinglePayoutFormProps) {
  const amountNumber = Number(formData.amount || 0)

  const availableAfterPayout = useMemo(() => {
    return walletBalance - amountNumber
  }, [walletBalance, amountNumber])

  const handleBeneficiaryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const beneficiaryId = Number(event.target.value)

    if (!beneficiaryId) {
      onChange('beneficiaryId', null)
      return
    }

    onSelectBeneficiary(beneficiaryId)
  }

  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value.replace(/[^\d.]/g, '')

    onChange('amount', value)
  }

  const handleRemarksChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    onChange('remarks', event.target.value)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Create Single Payout
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Select a saved beneficiary and enter payout details to continue.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
              <IndianRupee className="h-5 w-5 text-white" />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-600">
                Available Wallet Balance
              </p>

              <p className="mt-1 text-xl font-bold text-slate-900">
                {formatIndianCurrency(walletBalance)}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-indigo-100 bg-white px-3 py-2 text-xs font-medium text-slate-600">
            Payout limit: {formatIndianCurrency(minAmount)} to{' '}
            {formatIndianCurrency(maxAmount)}
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className=" px-6 py-5">
          <h2 className="text-base font-semibold text-slate-900">
            Payout Details
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter beneficiary and payout information.
          </p>
        </div>

        <div className="space-y-6 p-4">
          <div>
            <label
              htmlFor="beneficiary"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Select Beneficiary
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="relative">
              <UserRound className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <select
                id="beneficiary"
                value={formData.beneficiaryId ?? ''}
                onChange={handleBeneficiaryChange}
                className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white pl-11 pr-10 text-sm font-medium text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              >
                <option value="">Choose a saved beneficiary</option>

                {SINGLE_PAYOUT_BENEFICIARIES.map((beneficiary) => (
                  <option key={beneficiary.id} value={beneficiary.id}>
                    {beneficiary.beneficiaryName} — {beneficiary.bankName}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {selectedBeneficiary && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Beneficiary Selected
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    This saved bank account will receive the payout.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Account Holder
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {selectedBeneficiary.accountHolderName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Bank Name
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {selectedBeneficiary.bankName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Account Number
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {selectedBeneficiary.maskedAccountNumber}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500">
                    IFSC Code
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {selectedBeneficiary.ifscCode}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="amount"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Payout Amount
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="relative">
              <IndianRupee className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                id="amount"
                type="text"
                inputMode="decimal"
                value={formData.amount}
                onChange={handleAmountChange}
                placeholder="Enter payout amount"
                className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-slate-500">
                Minimum {formatIndianCurrency(minAmount)} · Maximum{' '}
                {formatIndianCurrency(maxAmount)}
              </p>

              {amountNumber > 0 && (
                <p
                  className={`text-xs font-semibold ${
                    availableAfterPayout < 0
                      ? 'text-red-600'
                      : 'text-emerald-600'
                  }`}
                >
                  Balance after payout:{' '}
                  {formatIndianCurrency(
                    Math.max(availableAfterPayout, 0),
                  )}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="remarks"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Remarks
              <span className="ml-1 text-slate-400">(Optional)</span>
            </label>

            <textarea
              id="remarks"
              rows={4}
              maxLength={250}
              value={formData.remarks}
              onChange={handleRemarksChange}
              placeholder="Example: Vendor payment for June 2026"
              className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

            <p className="mt-2 text-right text-xs text-slate-400">
              {formData.remarks.length}/250
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />

              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}

          <div className="flex flex-col-reverse gap-3  pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Landmark className="h-4 w-4 text-slate-400" />
              Funds will be transferred to the selected beneficiary.
            </div>

            <PrimaryButton onClick={onContinue}>
              Continue to Review
              <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}