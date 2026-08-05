'use client'

import { Skeleton } from '@/components/ui/skeleton'

export default function WalletWhitelistTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {/* Header Skeleton */}
      <div className="border-b border-slate-200 px-5 py-5 lg:px-6">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-56 rounded" />
            <Skeleton className="h-4 w-72 rounded" />
          </div>
          <Skeleton className="h-4 w-32 rounded" />
        </div>
      </div>

      {/* Filters Skeleton */}
      <div className="border-b border-slate-200 bg-slate-50/60 px-5 py-4 lg:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Skeleton className="h-11 w-full rounded-xl sm:w-44" />
            <Skeleton className="h-11 w-24 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {Array.from({ length: 6 }).map((_, i) => (
                <th key={i} className="px-5 py-3 text-left">
                  <Skeleton className="h-4 w-24 rounded" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                {Array.from({ length: 6 }).map((_, j) => (
                  <td key={j} className="px-5 py-4">
                    <Skeleton className="h-4 w-3/4 rounded" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Skeleton */}
      <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">
        <Skeleton className="h-4 w-48 rounded" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>
    </div>
  )
}
