import { Skeleton } from '@/components/ui/skeleton'

export default function WalletPageSkeleton() {
  const balanceWidths = ["w-36", "w-44", "w-40"]
  const transactionWidths = [
    "w-40",
    "w-48",
    "w-36",
    "w-52",
    "w-44",
    "w-32",
    "w-56",
    "w-40"
  ]
  const amountWidths = ["w-24", "w-28", "w-20", "w-28", "w-24", "w-20", "w-24", "w-28"]
  const statusWidths = ["w-20", "w-16", "w-20", "w-16", "w-16", "w-20", "w-20", "w-16"]

  return (
    <div className="min-w-0 space-y-6 p-4 sm:space-y-7 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Skeleton className="w-52 h-8 mb-2" />
          <Skeleton className="w-72 h-4" />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Skeleton className="w-full sm:w-32 h-12" />
          <Skeleton className="w-full sm:w-44 h-12" />
        </div>
      </div>

      <hr className="border-slate-200 my-6" />

      {/* Balance Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {balanceWidths.map((width, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
            <Skeleton className={`${width} h-8 mb-4`} />
            <Skeleton className="w-32 h-4" />
          </div>
        ))}
      </div>

      <hr className="border-slate-200 my-6" />

      {/* Transaction Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Top toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center p-4 sm:p-6 border-b border-slate-200">
          <Skeleton className="w-full sm:w-72 h-10" />
          <Skeleton className="w-full sm:w-32 h-10" />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            {/* Header row - Static */}
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4"><div className="w-16 h-4 bg-slate-200 rounded"></div></th>
                <th className="px-6 py-4"><div className="w-32 h-4 bg-slate-200 rounded"></div></th>
                <th className="px-6 py-4"><div className="w-20 h-4 bg-slate-200 rounded"></div></th>
                <th className="px-6 py-4"><div className="w-24 h-4 bg-slate-200 rounded"></div></th>
                <th className="px-6 py-4"><div className="w-16 h-4 bg-slate-200 rounded"></div></th>
                <th className="px-6 py-4"><div className="w-12 h-4 bg-slate-200 rounded"></div></th>
              </tr>
            </thead>
            {/* Table rows - Animated */}
            <tbody className="divide-y divide-slate-100">
              {transactionWidths.map((txnWidth, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4"><Skeleton className="w-24 h-4" /></td>
                  <td className="px-6 py-4"><Skeleton className={`${txnWidth} h-4`} /></td>
                  <td className="px-6 py-4"><Skeleton className="w-20 h-6 rounded-full" /></td>
                  <td className="px-6 py-4"><Skeleton className={`${amountWidths[i]} h-4`} /></td>
                  <td className="px-6 py-4"><Skeleton className={`${statusWidths[i]} h-6 rounded-full`} /></td>
                  <td className="px-6 py-4 text-center"><Skeleton className="w-6 h-6 mx-auto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
