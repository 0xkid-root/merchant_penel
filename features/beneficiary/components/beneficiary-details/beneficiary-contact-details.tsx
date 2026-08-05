'use client'

import { BeneficiaryResponse } from '../../types/beneficiary.types'

interface Props {
  beneficiary: BeneficiaryResponse
}

export default function BeneficiaryContactDetails({ beneficiary }: Props) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-900">
        Contact Details
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Mobile Number */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Mobile Number
          </label>
          <input
            value={beneficiary.mobile || ''}
            readOnly
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none cursor-default"
          />
        </div>

        {/* Email ID */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Email ID
          </label>
          <input
            value={beneficiary.email || ''}
            readOnly
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none cursor-default"
          />
        </div>
      </div>
    </div>
  )
}
