'use client'

import { useFormContext } from 'react-hook-form'

import { AddBeneficiaryFormData } from '../../schema/add-beneficiary.schema'

export default function BeneficiaryBasicDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AddBeneficiaryFormData>()

  return (
    <>
      {/* Beneficiary Name */}

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-slate-900">
          Beneficiary Name
        </label>

        <input
          {...register('beneficiaryName')}
          placeholder="Enter beneficiary name"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600"
        />

        {errors.beneficiaryName && (
          <p className="mt-1 text-xs text-red-500">
            {errors.beneficiaryName.message}
          </p>
        )}
      </div>

      {/* Account + Confirm */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Account Number
          </label>

          <input
            {...register('accountNumber')}
            placeholder="Enter account number"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600"
          />

          {errors.accountNumber && (
            <p className="mt-1 text-xs text-red-500">
              {errors.accountNumber.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Confirm Account Number
          </label>

          <input
            {...register('confirmAccountNumber')}
            placeholder="Re-enter account number"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600"
          />

          {errors.confirmAccountNumber && (
            <p className="mt-1 text-xs text-red-500">
              {errors.confirmAccountNumber.message}
            </p>
          )}
        </div>

      </div>

      {/* IFSC */}

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium text-slate-900">
          IFSC Code
        </label>

        <input
          {...register('ifscCode')}
          placeholder="Enter IFSC code"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 uppercase text-sm outline-none transition focus:border-indigo-600"
        />

        {errors.ifscCode && (
          <p className="mt-1 text-xs text-red-500">
            {errors.ifscCode.message}
          </p>
        )}

        <p className="mt-2 text-xs text-slate-500">
          Enter correct IFSC code to auto-verify account.
        </p>
      </div>
    </>
  )
}