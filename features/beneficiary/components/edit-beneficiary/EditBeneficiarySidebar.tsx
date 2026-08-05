'use client'

import { Pencil } from 'lucide-react'

export default function EditBeneficiarySidebar() {
  return (
    <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold text-slate-900">
        Edit Information
      </h3>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
            <Pencil className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              Update Details
            </h4>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Update beneficiary contact details or account type. Bank information is protected after verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
