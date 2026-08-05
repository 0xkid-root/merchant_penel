'use client'

import { useFormContext } from 'react-hook-form'
import { EditBeneficiaryFormData } from '../../schema/edit-beneficiary.schema'

export default function EditBeneficiaryOptionalDetails() {
  const { register, formState: { errors } } = useFormContext<EditBeneficiaryFormData>()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">Contact Details</h3>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Mobile Number */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            {...register('mobile')}
            type="text"
            placeholder="Enter mobile number"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600"
          />
          {errors.mobile && (
            <p className="mt-1 text-xs text-red-500">
              {errors.mobile.message}
            </p>
          )}
        </div>

        {/* Email ID */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Email ID <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="Enter email ID"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
