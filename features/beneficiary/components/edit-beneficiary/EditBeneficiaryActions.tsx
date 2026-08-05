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
        disabled={isSaving}
        className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Cancel
      </button>

      {/* Save */}
      <button
        type="submit"
        disabled={isSaving}
        className={`rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition flex items-center gap-2 ${
          isSaving ? 'cursor-not-allowed bg-slate-400' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {isSaving ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Updating...
          </>
        ) : (
          'Update Beneficiary'
        )}
      </button>
    </div>
  )
}
