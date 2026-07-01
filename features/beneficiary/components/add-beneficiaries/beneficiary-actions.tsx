'use client'

interface Props {
  isVerified: boolean
  onCancel: () => void
}

export default function BeneficiaryActions({
  isVerified,
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
        disabled={!isVerified}
        className={`rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition ${
          isVerified
            ? 'bg-indigo-600 hover:bg-indigo-700'
            : 'cursor-not-allowed bg-slate-400'
        }`}
      >
        Save Beneficiary
      </button>

    </div>
  )
}