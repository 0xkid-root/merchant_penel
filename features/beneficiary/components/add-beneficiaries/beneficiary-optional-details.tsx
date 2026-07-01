'use client'

import { useFormContext } from 'react-hook-form'

import { AddBeneficiaryFormData } from '../../schema/add-beneficiary.schema'

export default function BeneficiaryOptionalDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AddBeneficiaryFormData>()

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h3 className="mb-6 text-lg font-semibold text-slate-900">
        Additional Details
      </h3>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Mobile Number */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Mobile Number
          </label>

          <div className="flex overflow-hidden rounded-lg border border-slate-300">

            <select className="border-r border-slate-300 bg-slate-50 px-3 text-sm outline-none">
              <option>+91</option>
            </select>

            <input
              {...register('mobileNumber')}
              type="text"
              placeholder="Enter mobile number"
              className="h-11 w-full px-4 text-sm outline-none"
            />

          </div>

          {errors.mobileNumber && (
            <p className="mt-1 text-xs text-red-600">
              {errors.mobileNumber.message}
            </p>
          )}
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email ID
          </label>

          <input
            {...register('emailId')}
            type="email"
            placeholder="Enter email address"
            className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-indigo-600"
          />

          {errors.emailId && (
            <p className="mt-1 text-xs text-red-600">
              {errors.emailId.message}
            </p>
          )}
        </div>

        {/* Remarks */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Remarks
          </label>

          <textarea
            {...register('remarks')}
            rows={2}
            placeholder="Enter remarks"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600 resize-none"
          />

          {errors.remarks && (
            <p className="mt-1 text-xs text-red-600">
              {errors.remarks.message}
            </p>
          )}
        </div>

      </div>

    </div>
  )
}