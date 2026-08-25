import { Skeleton } from '@/components/ui/skeleton'

export function PayoutHistoryTableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1200px] border-collapse">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Transaction ID
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Beneficiary
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Bank Details
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Type
            </th>
            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Amount
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Created At
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {[...Array(10)].map((_, i) => (
            <tr key={i} className="transition hover:bg-slate-50/80">
              <td className="px-5 py-4">
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-5 rounded-md" />
                </div>
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-4 w-28" />
              </td>
              <td className="px-5 py-4">
                <Skeleton className="h-6 w-16 rounded-md" />
              </td>
              <td className="px-5 py-4">
                <div className="flex justify-end">
                  <Skeleton className="h-5 w-24" />
                </div>
              </td>
              <td className="px-5 py-4">
                <Skeleton className="h-5 w-32" />
              </td>
              <td className="px-5 py-4">
                <Skeleton className="h-6 w-20 rounded-full" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
