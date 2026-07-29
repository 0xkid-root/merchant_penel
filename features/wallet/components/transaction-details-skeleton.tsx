import { Skeleton } from '@/components/ui/skeleton'

export default function TransactionDetailsSkeleton() {
  const rowWidths = ["w-40", "w-32", "w-52", "w-36", "w-28", "w-44", "w-48", "w-24"]

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <Skeleton className="w-40 h-5 mb-6" />
        <Skeleton className="w-72 h-8 mb-2" />
        <Skeleton className="w-52 h-4" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
        {/* Top Summary Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          {/* Amount Section */}
          <div className="flex flex-col items-center justify-center flex-1">
            <Skeleton className="w-14 h-14 rounded-full mb-4" />
            <Skeleton className="w-20 h-6 rounded-full mb-3" />
            <Skeleton className="w-32 h-8 mb-2" />
            <Skeleton className="w-24 h-5 mb-3" />
            <Skeleton className="w-20 h-6 rounded-full" />
          </div>

          <div className="hidden md:block w-px h-40 bg-slate-100"></div>

          {/* Date & Time Section */}
          <div className="flex flex-col items-center justify-center flex-1">
            <Skeleton className="w-12 h-12 rounded-full mb-3" />
            <Skeleton className="w-20 h-4 mb-2" />
            <Skeleton className="w-24 h-5 mb-1" />
            <Skeleton className="w-16 h-5" />
          </div>

          <div className="hidden md:block w-px h-40 bg-slate-100"></div>

          {/* Reference ID Section */}
          <div className="flex flex-col items-center justify-center flex-1">
            <Skeleton className="w-12 h-12 rounded-full mb-3" />
            <Skeleton className="w-24 h-4 mb-2" />
            <Skeleton className="w-36 h-5 mb-3" />
            <Skeleton className="w-6 h-6" />
          </div>

          <div className="hidden md:block w-px h-40 bg-slate-100"></div>

          {/* Ledger Code Section */}
          <div className="flex flex-col items-center justify-center flex-1">
            <Skeleton className="w-12 h-12 rounded-full mb-3" />
            <Skeleton className="w-24 h-4 mb-2" />
            <Skeleton className="w-32 h-5 mb-3" />
            <Skeleton className="w-6 h-6" />
          </div>
        </div>

        <hr className="border-slate-200 my-8" />

        {/* Transaction Information Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-48 h-6" />
          </div>

          <div className="space-y-1">
            {rowWidths.map((valWidth, i) => (
              <div key={i} className="flex justify-between items-center py-4 border-b border-slate-100 last:border-0">
                <Skeleton className="w-32 h-5" />
                <div className="flex items-center gap-2">
                  <Skeleton className={`${valWidth} h-5`} />
                  {i < 3 && <Skeleton className="w-5 h-5" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-slate-200 my-8" />

        {/* Remarks Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-24 h-6" />
          </div>
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 min-h-[100px] flex flex-col gap-2">
            <Skeleton className="w-[90%] h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-[75%] h-4" />
            <Skeleton className="w-[55%] h-4" />
          </div>
        </div>

        <hr className="border-slate-200 my-8" />

        {/* Need Help Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-full shrink-0" />
            <div>
              <Skeleton className="w-28 h-5 mb-1" />
              <Skeleton className="w-72 h-4 mb-1" />
              <Skeleton className="w-48 h-4" />
            </div>
          </div>
          <Skeleton className="w-40 h-11 rounded-lg shrink-0" />
        </div>
      </div>
    </div>
  )
}
