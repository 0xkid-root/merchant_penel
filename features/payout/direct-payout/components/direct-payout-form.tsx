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
  <div>
    {/* Header */}
    <div className="border-b border-slate-200 pb-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
          <Landmark className="h-5 w-5 text-indigo-600" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Bank Account Details
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter beneficiary bank account details to create a direct payout.
          </p>
        </div>
      </div>
    </div>

    {/* Form content */}
    <div className="space-y-7 py-7">
      {/* Account holder */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Account Holder Name
        </label>

        <input
          value={values.accountHolderName}
          onChange={(event) =>
            onChange({
              ...values,
              accountHolderName: event.target.value,
            })
          }
          placeholder="Enter account holder name"
          className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      {/* Account number */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Bank Account Number
          </label>

          <input
            value={values.accountNumber}
            onChange={(event) =>
              onChange({
                ...values,
                accountNumber: event.target.value.replace(/\D/g, ''),
              })
            }
            placeholder="Enter account number"
            className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Confirm Account Number
          </label>

          <input
            value={values.confirmAccountNumber}
            onChange={(event) =>
              onChange({
                ...values,
                confirmAccountNumber: event.target.value.replace(/\D/g, ''),
              })
            }
            placeholder="Re-enter account number"
            className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>
      </div>

      <div >


        {/* IFSC */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            IFSC Code
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={values.ifscCode}
              onChange={(event) =>
                onChange({
                  ...values,
                  ifscCode: event.target.value.toUpperCase(),
                  bankName: '',
                  branchName: '',
                })
              }
              placeholder="Example: HDFC0001234"
              className="h-12 flex-1 rounded-xl border border-slate-300 bg-white px-4 text-sm uppercase text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

            <button
              type="button"
              onClick={handleVerifyIfsc}
              disabled={isCheckingIfsc}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Landmark className="h-4 w-4" />
              {isCheckingIfsc ? 'Verifying...' : 'Verify IFSC'}
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            Demo IFSC: HDFC0001234, SBIN0004567, ICIC0000789, UTIB0000100
          </p>
        </div>

        {/* Bank + branch */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Bank Name
            </label>

            <input
              value={values.bankName}
              readOnly
              placeholder="Verified bank name"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Branch Name
            </label>

            <input
              value={values.branchName}
              readOnly
              placeholder="Verified branch name"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none"
            />
          </div>
        </div>

        {/* Small success alert, not card */}
        {values.bankName && values.branchName ? (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            Bank account routing details verified.
          </div>
        ) : null}
      </div>

      {/* Amount + remarks */}
      <div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Payout Amount
            </label>

            <input
              value={values.amount}
              onChange={(event) =>
                onChange({
                  ...values,
                  amount: event.target.value.replace(/[^\d.]/g, ''),
                })
              }
              placeholder="Enter payout amount"
              className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Remarks <span className="font-normal text-slate-400">(Optional)</span>
            </label>

            <input
              value={values.remarks}
              onChange={(event) =>
                onChange({
                  ...values,
                  remarks: event.target.value,
                })
              }
              placeholder="Add remarks"
              className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="flex flex-col gap-3  pt-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Verify all bank details carefully before continuing.
      </p>

      <button
        type="button"
        onClick={handleContinue}
        className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Continue to Review
      </button>
    </div>
  </div>
)
}