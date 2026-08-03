import { Skeleton } from '@/components/ui/skeleton'
import { BeneficiariesTableSkeleton } from './beneficiaries-table-skeleton'

export function BeneficiariesPageSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Page Header Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Skeleton className="h-8 w-64 sm:h-9" />
          <Skeleton className="mt-2 h-5 w-80 sm:w-96" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-24 rounded-xl" />
          <Skeleton className="h-10 w-36 rounded-xl" />
        </div>
      </div>

      {/* Filter Skeleton */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
          <Skeleton className="h-11 w-full rounded-xl" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
      </div>

      {/* Table & Pagination Skeleton */}
      <BeneficiariesTableSkeleton />
    </div>
  )
}
