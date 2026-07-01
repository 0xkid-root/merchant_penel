'use client'

interface Props {
  currentPage: number
  totalPages: number
  totalRecords: number
  pageSize?: number
  onPageChange: (page: number) => void
}

export default function BeneficiariesPagination({
  currentPage,
  totalPages,
  totalRecords,
  pageSize = 10,
  onPageChange,
}: Props) {
  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalRecords)

  return (
    <div className="mt-6 flex items-center justify-between">

      <p className="text-sm text-slate-500">
        Showing {start} to {end} of {totalRecords} beneficiaries
      </p>

      <div className="flex items-center gap-2">

        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                page === currentPage
                  ? 'bg-indigo-600 text-white'
                  : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          )
        })}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  )
}