'use client'

import { useFormContext } from 'react-hook-form'

import { AddBeneficiaryFormData } from '../../schema/add-beneficiary.schema'

interface Props {
  isVerified?: boolean
}

export default function BeneficiaryBasicDetails({ isVerified }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<AddBeneficiaryFormData>()

  return (
    <>
      {/* Beneficiary Name and Bank Name */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Beneficiary Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Beneficiary Name
          </label>

          <input
            {...register('beneficiaryName')}
            disabled={isVerified}
            placeholder="Enter beneficiary name"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600 disabled:opacity-50 disabled:bg-slate-50"
          />

          {errors.beneficiaryName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.beneficiaryName.message}
            </p>
          )}
        </div>

        {/* Bank Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Bank Name <span className="text-red-500">*</span>
          </label>

          <input
            {...register('bankName')}
            disabled={isVerified}
            placeholder="Enter bank name"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600"
          />

          {errors.bankName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.bankName.message}
            </p>
          )}
        </div>
      </div>

      {/* Account + Confirm */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Account Number
          </label>

          <input
            {...register('accountNumber')}
            disabled={isVerified}
            placeholder="Enter account number"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600 disabled:opacity-50 disabled:bg-slate-50"
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
            disabled={isVerified}
            placeholder="Re-enter account number"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600 disabled:opacity-50 disabled:bg-slate-50"
          />

          {errors.confirmAccountNumber && (
            <p className="mt-1 text-xs text-red-500">
              {errors.confirmAccountNumber.message}
            </p>
          )}
        </div>

      </div>

      {/* IFSC and Account Type */}

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* IFSC */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            IFSC Code
          </label>

          <input
            {...register('ifscCode')}
            disabled={isVerified}
            placeholder="Enter IFSC code"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 uppercase text-sm outline-none transition focus:border-indigo-600 disabled:opacity-50 disabled:bg-slate-50"
          />

          {errors.ifscCode && (
            <p className="mt-1 text-xs text-red-500">
              {errors.ifscCode.message}
            </p>
          )}

          <p className="mt-2 text-xs text-slate-500">
            Bank verification requires a valid Account Number and IFSC Code.          </p>
        </div>

        {/* Account Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Account Type
          </label>

          <select
            {...register('accountType')}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600"
          >
            <option value="SAVINGS">Savings Account</option>
            <option value="CURRENT">Current Account</option>
          </select>

          {errors.accountType && (
            <p className="mt-1 text-xs text-red-500">
              {errors.accountType.message}
            </p>
          )}
        </div>
      </div>
    </>
  )
}