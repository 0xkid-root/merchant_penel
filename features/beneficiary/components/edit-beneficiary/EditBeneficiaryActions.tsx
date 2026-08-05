'use client'

export default function EditBeneficiaryActions() {
  return (
    <div className="flex justify-end gap-4 border-t border-slate-200 pt-6">
      {/* Cancel */}
      <button
        type="button"
        className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        onClick={() => window.history.back()}
      >
        Cancel
      </button>

      {/* Save */}
      <button
        type="button"
        className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Update Beneficiary
      </button>
    </div>
  )
}
