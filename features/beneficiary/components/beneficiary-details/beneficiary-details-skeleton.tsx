import { Skeleton } from '@/components/ui/skeleton'

export function BeneficiaryDetailsSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Page Header Skeleton */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-9 w-9 rounded-lg" />
        <div>
          <Skeleton className="h-8 w-64 sm:h-9" />
          <Skeleton className="mt-2 h-5 w-80 sm:w-96" />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Side Skeleton */}
        <div className="col-span-12 space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-9">
          
          <div className="space-y-6">
            <Skeleton className="h-6 w-48" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Skeleton className="mb-2 h-4 w-32" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-32" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            </div>
          </div>

          <hr className="border-slate-200" />

          <div className="space-y-6">
            <Skeleton className="h-6 w-48" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Skeleton className="mb-2 h-4 w-32" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-32" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            </div>
          </div>

          <hr className="border-slate-200" />

          <div className="space-y-6">
            <Skeleton className="h-6 w-48" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Skeleton className="mb-2 h-4 w-32" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-32" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Side Skeleton */}
        <div className="col-span-12 xl:col-span-3">
          <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6">
            <Skeleton className="mb-8 h-6 w-48" />
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4">
                  <Skeleton className="h-11 w-11 rounded-xl" />
                  <div className="flex-1">
                    <Skeleton className="mb-2 h-4 w-24" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
