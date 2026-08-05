'use client'

export default function EditBeneficiaryBasicDetails() {
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
              defaultValue="Gaurav Kumar"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600"
            />
          </div>

          {/* Bank Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">
              Bank Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              defaultValue="KVB Bank"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600"
            />
          </div>

          {/* Account Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">
              Account Type
            </label>
            <select
              defaultValue="SAVINGS"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600"
            >
              <option value="SAVINGS">Savings Account</option>
              <option value="CURRENT">Current Account</option>
            </select>
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
              defaultValue="123456789012"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600"
            />
          </div>

          {/* Confirm Account Number */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">
              Confirm Account Number
            </label>
            <input
              type="text"
              defaultValue="123456789012"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600"
            />
          </div>

          {/* IFSC Code */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">
              IFSC Code
            </label>
            <input
              type="text"
              defaultValue="KVBL0001234"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 uppercase text-sm outline-none transition focus:border-indigo-600"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
