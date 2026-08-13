import { Skeleton } from '@/components/ui/skeleton'

export function SinglePayoutTableSkeleton() {
  return (
    <div className="min-w-0 overflow-x-auto">
      <table className="w-full min-w-[1080px] border-collapse">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Payout ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Beneficiary
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Bank Account
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Amount
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Created At
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, i) => (
            <tr key={i} className="border-b border-slate-100 last:border-b-0">
              <td className="px-4 py-4">
                <Skeleton className="h-5 w-24" />
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </td>
              <td className="px-4 py-4">
                <Skeleton className="h-5 w-32 mb-1" />
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="h-5 w-20" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="h-5 w-28" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="h-6 w-20 rounded-full" />
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center justify-center">
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
