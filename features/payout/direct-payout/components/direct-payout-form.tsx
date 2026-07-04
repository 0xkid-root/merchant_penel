'use client'

import { useMemo, useState } from 'react'
import {
  Building2,
  CheckCircle2,
  IndianRupee,
  Landmark,
  LoaderCircle,
  UserRound,
} from 'lucide-react'
import { toast } from 'sonner'

import { IFSC_BANK_DETAILS } from '../data/direct-payout-data'

import type { DirectPayoutFormValues } from './direct-payout-create-page'

interface DirectPayoutFormProps {
  values: DirectPayoutFormValues
  onChange: (values: DirectPayoutFormValues) => void
  onContinue: () => void
}

export default function DirectPayoutForm({
  values,
  onChange,
  onContinue,
}: DirectPayoutFormProps) {
  const [isCheckingIfsc, setIsCheckingIfsc] = useState(false)

  const isAccountNumberMatched =
    values.confirmAccountNumber !== '' &&
    values.accountNumber === values.confirmAccountNumber

  const isAccountNumberNotMatched =
    values.confirmAccountNumber !== '' &&
    values.accountNumber !== values.confirmAccountNumber

  const bankDetailsFound = Boolean(values.bankName && values.branchName)

  const amountNumber = Number(values.amount)

  const isFormValid = useMemo(() => {
    return (
      values.accountHolderName.trim().length >= 3 &&
      values.accountNumber.trim().length >= 8 &&
      values.confirmAccountNumber === values.accountNumber &&
      values.ifscCode.trim().length === 11 &&
      values.bankName.trim() !== '' &&
      values.branchName.trim() !== '' &&
      amountNumber > 0
    )
  }, [amountNumber, values])

  const updateField = (
    field: keyof DirectPayoutFormValues,
    value: string,
  ) => {
    onChange({
      ...values,
      [field]: value,
    })
  }

  const handleIfscChange = (value: string) => {
    const normalizedIfsc = value.toUpperCase().replace(/\s/g, '')

    onChange({
      ...values,
      ifscCode: normalizedIfsc,
      bankName: '',
      branchName: '',
    })
  }

  const handleVerifyIfsc = () => {
    const normalizedIfsc = values.ifscCode.trim().toUpperCase()

    if (normalizedIfsc.length !== 11) {
      toast.error('Enter a valid 11-character IFSC code')
      return
    }

    setIsCheckingIfsc(true)

    window.setTimeout(() => {
      const bankDetails = IFSC_BANK_DETAILS[normalizedIfsc]

      if (!bankDetails) {
        onChange({
          ...values,
          bankName: '',
          branchName: '',
        })

        toast.error('Bank details not found for this IFSC code')
        setIsCheckingIfsc(false)
        return
      }

      onChange({
        ...values,
        ifscCode: normalizedIfsc,
        bankName: bankDetails.bankName,
        branchName: bankDetails.branchName,
      })

      toast.success('Bank details verified successfully')
      setIsCheckingIfsc(false)
    }, 700)
  }

  const handleContinue = () => {
    if (!isFormValid) {
      toast.error('Please complete all required payout details')
      return
    }

    onContinue()
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-5 lg:px-6">
        <h2 className="text-base font-semibold text-slate-900">
          Bank Account Details
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter beneficiary bank account details to create a direct payout.
        </p>
      </div>

      <div className="space-y-6 px-5 py-6 lg:px-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label
              htmlFor="accountHolderName"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Account Holder Name
            </label>

            <div className="relative">
              <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                id="accountHolderName"
                value={values.accountHolderName}
                onChange={(event) =>
                  updateField('accountHolderName', event.target.value)
                }
                placeholder="Enter account holder name"
                className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="accountNumber"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Bank Account Number
            </label>

            <input
              id="accountNumber"
              value={values.accountNumber}
              onChange={(event) =>
                updateField(
                  'accountNumber',
                  event.target.value.replace(/\D/g, ''),
                )
              }
              inputMode="numeric"
              placeholder="Enter account number"
              className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label
              htmlFor="confirmAccountNumber"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Confirm Account Number
            </label>

            <div className="relative">
              <input
                id="confirmAccountNumber"
                value={values.confirmAccountNumber}
                onChange={(event) =>
                  updateField(
                    'confirmAccountNumber',
                    event.target.value.replace(/\D/g, ''),
                  )
                }
                inputMode="numeric"
                placeholder="Re-enter account number"
                className={`h-11 w-full rounded-xl border bg-white px-4 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                  isAccountNumberNotMatched
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                    : isAccountNumberMatched
                      ? 'border-emerald-400 focus:border-emerald-500 focus:ring-emerald-100'
                      : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                }`}
              />

              {isAccountNumberMatched ? (
                <CheckCircle2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
              ) : null}
            </div>

            {isAccountNumberNotMatched ? (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                Account numbers do not match.
              </p>
            ) : null}

            {isAccountNumberMatched ? (
              <p className="mt-1.5 text-xs font-medium text-emerald-600">
                Account numbers match.
              </p>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-4 flex items-center gap-2">
            <Landmark className="h-4 w-4 text-indigo-600" />

            <h3 className="text-sm font-semibold text-slate-900">
              Bank and Branch Details
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label
                htmlFor="ifscCode"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                IFSC Code
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="ifscCode"
                  value={values.ifscCode}
                  onChange={(event) => handleIfscChange(event.target.value)}
                  placeholder="Example: HDFC0001234"
                  maxLength={11}
                  className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium uppercase text-slate-900 outline-none transition placeholder:normal-case placeholder:font-normal placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />

                <button
                  type="button"
                  onClick={handleVerifyIfsc}
                  disabled={isCheckingIfsc}
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCheckingIfsc ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <Building2 className="h-4 w-4" />
                  )}

                  {isCheckingIfsc ? 'Checking...' : 'Verify IFSC'}
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Demo IFSC: HDFC0001234, SBIN0004567, ICIC0000789, UTIB0000100
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">
                Bank Name
              </p>

              <div className="flex h-11 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700">
                {values.bankName || 'Bank name will appear here'}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">
                Branch Name
              </p>

              <div className="flex h-11 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700">
                {values.branchName || 'Branch name will appear here'}
              </div>
            </div>
          </div>

          {bankDetailsFound ? (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Bank account routing details verified.
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="amount"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Payout Amount
            </label>

            <div className="relative">
              <IndianRupee className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                id="amount"
                value={values.amount}
                onChange={(event) =>
                  updateField(
                    'amount',
                    event.target.value.replace(/[^\d.]/g, ''),
                  )
                }
                inputMode="decimal"
                placeholder="Enter payout amount"
                className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="remarks"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Remarks <span className="font-normal text-slate-400">(Optional)</span>
            </label>

            <input
              id="remarks"
              value={values.remarks}
              onChange={(event) => updateField('remarks', event.target.value)}
              placeholder="Example: Vendor payment for July"
              maxLength={150}
              className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">
        <p className="text-xs text-slate-500">
          Verify all bank details carefully before continuing.
        </p>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!isFormValid}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Continue to Review
        </button>
      </div>
    </div>
  )
}