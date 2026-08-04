'use client'

interface Props {
  isVerified: boolean
  isSaving?: boolean
  onCancel: () => void
}

export default function BeneficiaryActions({
  isVerified,
  isSaving,
  onCancel,
}: Props) {
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
        disabled={!isVerified || isSaving}
        className={`rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition ${
          isVerified && !isSaving
            ? 'bg-indigo-600 hover:bg-indigo-700'
            : 'cursor-not-allowed bg-slate-400'
        }`}
      >
        {isSaving ? 'Saving...' : 'Save Beneficiary'}
      </button>

    </div>
  )
}