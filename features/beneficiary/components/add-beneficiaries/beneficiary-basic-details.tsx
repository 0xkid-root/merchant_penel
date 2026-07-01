'use client'

import { useFormContext } from 'react-hook-form'

import { AddBeneficiaryFormData } from '../../schema/add-beneficiary.schema'

interface Props {
  isVerifying: boolean
  isVerified: boolean
  onVerify: () => void
}

export default function BeneficiaryBasicDetails({
  isVerifying,
  isVerified,
  onVerify,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<AddBeneficiaryFormData>()

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Beneficiary Name */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Beneficiary Name
          </label>

          <input
            {...register('beneficiaryName')}
            placeholder="Enter beneficiary name"
            className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-indigo-600"
          />

          {errors.beneficiaryName && (
            <p className="mt-1 text-xs text-red-600">
              {errors.beneficiaryName.message}
            </p>
          )}
        </div>

        {/* Account Number */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Account Number
          </label>

          <input
            {...register('accountNumber')}
            placeholder="Enter account number"
            className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-indigo-600"
          />

          {errors.accountNumber && (
            <p className="mt-1 text-xs text-red-600">
              {errors.accountNumber.message}
            </p>
          )}
        </div>

        {/* Confirm Account */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Confirm Account Number
          </label>

          <input
            {...register('confirmAccountNumber')}
            placeholder="Re-enter account number"
            className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-indigo-600"
          />

          {errors.confirmAccountNumber && (
            <p className="mt-1 text-xs text-red-600">
              {errors.confirmAccountNumber.message}
            </p>
          )}
        </div>

        {/* IFSC */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            IFSC Code
          </label>

          <input
            {...register('ifscCode')}
            placeholder="Enter IFSC code"
            className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm uppercase outline-none transition focus:border-indigo-600"
          />

          {errors.ifscCode && (
            <p className="mt-1 text-xs text-red-600">
              {errors.ifscCode.message}
            </p>
          )}

          <p className="mt-2 text-xs text-slate-500">
            Enter the correct IFSC code to verify the beneficiary account.
          </p>
        </div>

      </div>

      {/* Verify Button */}

      <div className="mt-8 flex justify-end">

        <button
          type="button"
          onClick={onVerify}
          disabled={isVerifying || isVerified}
          className={`h-11 rounded-lg px-8 text-sm font-semibold text-white transition ${
            isVerified
              ? 'cursor-not-allowed bg-green-600'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isVerifying
            ? 'Verifying...'
            : isVerified
            ? 'Verified'
            : 'Verify Account'}
        </button>

      </div>

    </div>
  )
}