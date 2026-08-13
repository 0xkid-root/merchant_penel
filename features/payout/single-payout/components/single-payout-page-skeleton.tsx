import { Skeleton } from '@/components/ui/skeleton'
import { SinglePayoutTableSkeleton } from './single-payout-table-skeleton'

export function SinglePayoutPageSkeleton() {
  return (
    <div className="min-w-0 space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Page Header Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Skeleton className="h-8 w-48 sm:h-9" />
          <Skeleton className="mt-2 h-5 w-64 sm:w-80" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
      </div>

      {/* Wallet Balance Skeleton */}
      <div className="w-full">
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>

      {/* Table Section Skeleton */}
      <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-4 py-5 sm:px-6">
          <Skeleton className="h-6 w-48" />
        </div>

        {/* Filter Skeleton */}
        <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <Skeleton className="h-11 w-full lg:max-w-md rounded-xl" />
          <div className="flex w-full gap-3 sm:w-auto">
            <Skeleton className="h-11 min-w-0 flex-1 sm:min-w-40 rounded-xl" />
            <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
          </div>
        </div>

        {/* Table Skeleton */}
        <SinglePayoutTableSkeleton />

        {/* Pagination Skeleton */}
        <div className="mt-4 flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Skeleton className="h-5 w-48" />
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Skeleton className="h-10 w-10 rounded-xl" />
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-10 w-10 rounded-xl" />
            ))}
            <Skeleton className="h-10 w-10 rounded-xl" />
          </div>
        </div>
      </section>
    </div>
  )
}
