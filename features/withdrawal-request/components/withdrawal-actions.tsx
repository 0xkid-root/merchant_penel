'use client'

interface Props {
  loading: boolean
}

export default function WithdrawalActions({
  loading,
}: Props) {
  return (
    <div className="flex items-center justify-end gap-4 border-t border-slate-200 pt-6">

      <button
        type="reset"
        className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? 'Submitting...'
          : 'Submit Withdrawal Request'}
      </button>

    </div>
  )
}
