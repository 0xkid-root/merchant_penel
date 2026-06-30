'use client'

export default function TransactionPagination() {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-6 py-5">

      <p className="text-sm text-slate-500">
        Showing 1 to 5 of 24 transactions
      </p>

      <div className="flex items-center gap-2">

        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50">
          ←
        </button>

        {[1, 2, 3, 4].map((page) => (
          <button
            key={page}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
              page === 1
                ? 'bg-indigo-600 text-white'
                : 'border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {page}
          </button>
        ))}

        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50">
          →
        </button>

      </div>

    </div>
  )
}