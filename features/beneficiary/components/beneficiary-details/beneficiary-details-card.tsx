'use client'

import { BeneficiaryResponse } from '../../types/beneficiary.types'

interface Props {
  beneficiary: BeneficiaryResponse
}

export default function BeneficiaryDetailsCard({ beneficiary }: Props) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-900">
        Beneficiary Information
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Beneficiary Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Beneficiary Name
          </label>
          <input
            value={beneficiary.beneficiaryName || ''}
            readOnly
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none cursor-default"
          />
        </div>

        {/* Bank Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Bank Name
          </label>
          <input
            value={beneficiary.bankName || ''}
            readOnly
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none cursor-default"
          />
        </div>

        {/* Account Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Account Type
          </label>
          <input
            value={beneficiary.accountType || ''}
            readOnly
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none cursor-default"
          />
        </div>
      </div>
    </div>
  )
}
