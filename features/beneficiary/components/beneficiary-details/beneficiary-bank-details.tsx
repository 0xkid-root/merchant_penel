'use client'

import { BeneficiaryResponse } from '../../types/beneficiary.types'

interface Props {
  beneficiary: BeneficiaryResponse
}

export default function BeneficiaryBankDetails({ beneficiary }: Props) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-900">
        Bank Details
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Account Number */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Account Number
          </label>
          <input
            value={beneficiary.accountNumber || ''}
            readOnly
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none cursor-default"
          />
        </div>

        {/* IFSC Code */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            IFSC Code
          </label>
          <input
            value={beneficiary.ifscCode || ''}
            readOnly
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none cursor-default uppercase"
          />
        </div>
      </div>
    </div>
  )
}
