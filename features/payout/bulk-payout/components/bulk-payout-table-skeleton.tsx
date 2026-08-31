import { Skeleton } from '@/components/ui/skeleton'

export function BulkPayoutTableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1100px] border-collapse">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Batch ID
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              File Name
            </th>
            <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              Records
            </th>
            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Total Amount
            </th>
            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Beneficiaries
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>
            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {[...Array(10)].map((_, i) => (
            <tr key={i} className="transition hover:bg-slate-50/80">
              <td className="px-5 py-4">
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-7 w-7 rounded-md" />
                </div>
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
                  <div>
                    <Skeleton className="mb-1 h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 text-center">
                <div className="flex justify-center">
                  <Skeleton className="h-5 w-10" />
                </div>
              </td>
              <td className="px-5 py-4 text-right">
                <div className="flex flex-col items-end">
                  <Skeleton className="mb-1 h-5 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </td>
              <td className="px-5 py-4 text-right">
                <div className="flex flex-col items-end">
                  <Skeleton className="mb-1 h-5 w-12" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </td>
              <td className="px-5 py-4">
                <Skeleton className="h-6 w-24 rounded-full" />
              </td>
              <td className="px-5 py-4 text-right">
                <div className="flex justify-end">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
