'use client'

import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { CheckCircle2, ChevronDown, Info, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import type { AddBankAccountFormData } from '../../schema/add-bank.schema'

const BANK_OPTIONS = [
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'State Bank of India',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'IDFC FIRST Bank',
]

export default function BankAccountFields() {
  const {
    register,
    trigger,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<AddBankAccountFormData>()

  const [isVerifyingIfsc, setIsVerifyingIfsc] = useState(false)
  const [isIfscVerified, setIsIfscVerified] = useState(false)

  const ifscCode = watch('ifscCode')

  const handleVerifyIfsc = async () => {
    const isValid = await trigger('ifscCode')

    if (!isValid) {
      setIsIfscVerified(false)
      return
    }

    try {
      setIsVerifyingIfsc(true)

      // Replace this with real IFSC verification API later
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setValue('ifscCode', ifscCode.toUpperCase(), {
        shouldValidate: true,
      })

      setIsIfscVerified(true)

      toast.success('IFSC code verified successfully')
    } catch {
      setIsIfscVerified(false)
      toast.error('Unable to verify IFSC code')
    } finally {
      setIsVerifyingIfsc(false)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
      {/* Account Holder Name */}

      <div className="space-y-2">
        <label
          htmlFor="accountHolderName"
          className="flex items-center gap-1 text-sm font-semibold text-slate-800"
        >
          Account Holder Name
        </label>

        <input
          id="accountHolderName"
          placeholder="Enter account holder name as per bank records"
          {...register('accountHolderName')}
          className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-100 ${
            errors.accountHolderName
              ? 'border-red-400 focus:border-red-500'
              : 'border-slate-200 focus:border-indigo-600'
          }`}
        />

        {errors.accountHolderName && (
          <p className="text-xs font-medium text-red-500">
            {errors.accountHolderName.message}
          </p>
        )}
      </div>

      {/* Bank Name */}

      <div className="space-y-2">
        <label
          htmlFor="bankName"
          className="flex items-center gap-1 text-sm font-semibold text-slate-800"
        >
          Bank Name
        </label>

        <div className="relative">
          <select
            id="bankName"
            {...register('bankName')}
            className={`h-11 w-full appearance-none rounded-lg border bg-white px-3 pr-10 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-indigo-100 ${
              errors.bankName
                ? 'border-red-400 focus:border-red-500'
                : 'border-slate-200 focus:border-indigo-600'
            }`}
          >
            <option value="">Select bank</option>

            {BANK_OPTIONS.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>

          <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-slate-500" />
        </div>

        {errors.bankName && (
          <p className="text-xs font-medium text-red-500">
            {errors.bankName.message}
          </p>
        )}
      </div>

      {/* Account Number */}

      <div className="space-y-2">
        <label
          htmlFor="accountNumber"
          className="flex items-center gap-1 text-sm font-semibold text-slate-800"
        >
          Account Number

        </label>

        <input
          id="accountNumber"
          inputMode="numeric"
          autoComplete="off"
          placeholder="Enter account number"
          {...register('accountNumber')}
          onChange={(event) => {
            event.target.value = event.target.value.replace(/\D/g, '')
            register('accountNumber').onChange(event)
          }}
          className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-100 ${
            errors.accountNumber
              ? 'border-red-400 focus:border-red-500'
              : 'border-slate-200 focus:border-indigo-600'
          }`}
        />

        {errors.accountNumber && (
          <p className="text-xs font-medium text-red-500">
            {errors.accountNumber.message}
          </p>
        )}
      </div>

      {/* Confirm Account Number */}

      <div className="space-y-2">
        <label
          htmlFor="confirmAccountNumber"
          className="flex items-center gap-1 text-sm font-semibold text-slate-800"
        >
          Confirm Account Number
         
        </label>

        <input
          id="confirmAccountNumber"
          inputMode="numeric"
          autoComplete="off"
          placeholder="Re-enter account number"
          {...register('confirmAccountNumber')}
          onChange={(event) => {
            event.target.value = event.target.value.replace(/\D/g, '')
            register('confirmAccountNumber').onChange(event)
          }}
          className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-100 ${
            errors.confirmAccountNumber
              ? 'border-red-400 focus:border-red-500'
              : 'border-slate-200 focus:border-indigo-600'
          }`}
        />

        {errors.confirmAccountNumber && (
          <p className="text-xs font-medium text-red-500">
            {errors.confirmAccountNumber.message}
          </p>
        )}
      </div>

      {/* IFSC Code */}

      <div className="space-y-2">
        <label
          htmlFor="ifscCode"
          className="flex items-center gap-1 text-sm font-semibold text-slate-800"
        >
          IFSC Code
          
        </label>

        <div
          className={`flex h-11 overflow-hidden rounded-lg border bg-white transition focus-within:ring-2 focus-within:ring-indigo-100 ${
            errors.ifscCode
              ? 'border-red-400'
              : isIfscVerified
                ? 'border-green-400'
                : 'border-slate-200 focus-within:border-indigo-600'
          }`}
        >
          <input
            id="ifscCode"
            maxLength={11}
            placeholder="Enter IFSC code"
            {...register('ifscCode')}
            onChange={(event) => {
              event.target.value = event.target.value
                .toUpperCase()
                .replace(/\s/g, '')

              setIsIfscVerified(false)
              register('ifscCode').onChange(event)
            }}
            className="h-full min-w-0 flex-1 px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />

          <button
            type="button"
            onClick={handleVerifyIfsc}
            disabled={isVerifyingIfsc}
            className="flex min-w-[104px] items-center justify-center gap-1 border-l border-slate-200 px-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isVerifyingIfsc ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking
              </>
            ) : isIfscVerified ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Verified
              </>
            ) : (
              'Verify IFSC'
            )}
          </button>
        </div>

        {errors.ifscCode ? (
          <p className="text-xs font-medium text-red-500">
            {errors.ifscCode.message}
          </p>
        ) : (
          <p className="text-xs text-slate-500">
            Enter the IFSC code of the bank branch.
          </p>
        )}
      </div>

      {/* Branch Name */}

      <div className="space-y-2">
        <label
          htmlFor="branchName"
          className="text-sm font-semibold text-slate-800"
        >
          Branch Name <span className="font-normal text-slate-500">(Optional)</span>
        </label>

        <input
          id="branchName"
          placeholder="Enter branch name"
          {...register('branchName')}
          className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-100 ${
            errors.branchName
              ? 'border-red-400 focus:border-red-500'
              : 'border-slate-200 focus:border-indigo-600'
          }`}
        />

        {errors.branchName && (
          <p className="text-xs font-medium text-red-500">
            {errors.branchName.message}
          </p>
        )}
      </div>
    </div>
  )
}