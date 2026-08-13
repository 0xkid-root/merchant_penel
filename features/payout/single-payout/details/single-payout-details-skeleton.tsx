import { Skeleton } from '@/components/ui/skeleton'

function DetailItemSkeleton({ valueWidth = 'w-32', valueHeight = 'h-5' }: { valueWidth?: string, valueHeight?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className={`${valueHeight} ${valueWidth}`} />
    </div>
  )
}

export function SinglePayoutDetailsSkeleton() {
  return (
    <div className="min-w-0 space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Page Header Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Skeleton className="h-8 w-48 sm:h-9" />
          <Skeleton className="mt-2 h-5 w-64 sm:w-80" />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="p-6 sm:p-8">
          {/* Top Summary Area */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
            <DetailItemSkeleton valueWidth="w-32" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-7 w-24 rounded-full" />
            </div>
            <DetailItemSkeleton valueHeight="h-8" valueWidth="w-36" />
            <DetailItemSkeleton valueWidth="w-20" />
          </div>

          <hr className="my-8 border-slate-200" />

          {/* Transaction Details */}
          <div>
            <Skeleton className="mb-6 h-6 w-40" />
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              <DetailItemSkeleton valueWidth="w-36" />
              <DetailItemSkeleton valueWidth="w-20" />
              <DetailItemSkeleton valueWidth="w-44" />
            </div>
          </div>

          <hr className="my-8 border-slate-200" />

          {/* Beneficiary / Bank Details */}
          <div>
            <Skeleton className="mb-6 h-6 w-48" />
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              <DetailItemSkeleton valueWidth="w-32" />
              <DetailItemSkeleton valueWidth="w-40" />
              <DetailItemSkeleton valueWidth="w-44" />
              <DetailItemSkeleton valueWidth="w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
