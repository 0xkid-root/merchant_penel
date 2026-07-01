'use client'

import { useFormContext } from 'react-hook-form'
import { AddBeneficiaryFormData } from '../../schema/add-beneficiary.schema'

export default function BeneficiaryOptionalDetails() {
  const { register } = useFormContext<AddBeneficiaryFormData>()

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Mobile Number */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Mobile Number (Optional)
          </label>

          <input
            {...register('mobileNumber')}
            placeholder="Enter mobile number"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600"
          />
        </div>

        {/* Email ID */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Email ID (Optional)
          </label>

          <input
            {...register('emailId')}
            placeholder="Enter email ID"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600"
          />
        </div>
      </div>
    </div>
  )
}