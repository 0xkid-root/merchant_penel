'use client'

interface Props {
  onCancel: () => void
  isSaving: boolean
}

export default function EditBeneficiaryActions({ onCancel, isSaving }: Props) {
  return (
    <div className="flex justify-end gap-4 border-t border-slate-200 pt-6">
      {/* Cancel */}
      <button
        type="button"
        onClick={onCancel}
        className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        Cancel
      </button>

      {/* Save */}
      <button
        type="submit"
        disabled={isSaving}
        className={`rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition ${
          isSaving ? 'cursor-not-allowed bg-slate-400' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {isSaving ? 'Updating...' : 'Update Beneficiary'}
      </button>
    </div>
  )
}
