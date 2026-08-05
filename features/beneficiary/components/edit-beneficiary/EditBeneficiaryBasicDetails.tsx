'use client'

import { BeneficiaryResponse } from '../../types/beneficiary.types'

interface Props {
  beneficiary: BeneficiaryResponse
}

export default function EditBeneficiaryBasicDetails({ beneficiary }: Props) {
  return (
    <div className="space-y-8">
      {/* SECTION 1: Beneficiary Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Beneficiary Information</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Beneficiary Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">
              Beneficiary Name
            </label>
            <input
              type="text"
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
              type="text"
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
              type="text"
              value={beneficiary.accountType || ''}
              readOnly
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none cursor-default"
            />
          </div>
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* SECTION 2: Bank Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Bank Details</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Account Number */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">
              Account Number
            </label>
            <input
              type="text"
              value={beneficiary.accountNumber || ''}
              readOnly
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none cursor-default"
            />
          </div>

          {/* Confirm Account Number */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">
              Confirm Account Number
            </label>
            <input
              type="text"
              value={beneficiary.accountNumber || ''} // Reusing account number for confirm
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
              type="text"
              value={beneficiary.ifscCode || ''}
              readOnly
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 uppercase text-sm text-slate-700 outline-none cursor-default"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
