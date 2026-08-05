'use client'

export default function EditBeneficiaryOptionalDetails() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">Contact Details</h3>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Mobile Number */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            defaultValue="9876543210"
            placeholder="Enter mobile number"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600"
          />
        </div>

        {/* Email ID */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Email ID <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            defaultValue="gaurav@example.com"
            placeholder="Enter email ID"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600"
          />
        </div>
      </div>
    </div>
  )
}
