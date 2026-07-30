import { Skeleton } from '@/components/ui/skeleton'

export function TransactionTableSkeleton() {
  return (
    <section className="min-w-0">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-[1120px] w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  TXN ID
                </th>
                <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Type
                </th>
                <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Reference Type
                </th>
                <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Amount
                </th>
                <th className="min-w-[220px] px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Remarks
                </th>
                <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date & time
                </th>
                <th className="whitespace-nowrap px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <td className="px-4 py-4">
                    <Skeleton className="h-5 w-24" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-7 w-7 rounded-full" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Skeleton className="h-5 w-28" />
                  </td>
                  <td className="px-4 py-4">
                    <Skeleton className="h-5 w-24" />
                  </td>
                  <td className="px-4 py-4">
                    <Skeleton className="h-5 w-40" />
                  </td>
                  <td className="px-4 py-4">
                    <Skeleton className="h-5 w-32" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center">
                      <Skeleton className="h-8 w-8 rounded-lg" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
  )
}
