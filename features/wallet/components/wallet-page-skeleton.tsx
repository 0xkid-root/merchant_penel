export default function WalletPageSkeleton() {
  return (
    <div className="min-w-0 space-y-6 p-4 sm:space-y-7 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="w-48 h-8 bg-slate-200 rounded mb-2 animate-pulse"></div>
          <div className="w-72 h-4 bg-slate-200 rounded animate-pulse"></div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="w-full sm:w-32 h-12 bg-slate-200 rounded-lg animate-pulse"></div>
          <div className="w-full sm:w-44 h-12 bg-slate-200 rounded-lg animate-pulse"></div>
        </div>
      </div>

      <hr className="border-slate-200 my-6" />

      {/* Balance Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-24 h-4 bg-slate-200 rounded animate-pulse"></div>
              <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse"></div>
            </div>
            <div className="w-40 h-8 bg-slate-200 rounded mb-4 animate-pulse"></div>
            <div className="w-32 h-4 bg-slate-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>

      <hr className="border-slate-200 my-6" />

      {/* Transaction Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Top toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center p-4 sm:p-6 border-b border-slate-200">
          <div className="w-full sm:w-64 h-10 bg-slate-200 rounded-lg animate-pulse"></div>
          <div className="w-full sm:w-32 h-10 bg-slate-200 rounded-lg animate-pulse"></div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            {/* Header row */}
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
            {/* Table rows */}
            <tbody className="divide-y divide-slate-100">
              {Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4"><div className="w-24 h-4 bg-slate-200 rounded animate-pulse"></div></td>
                  <td className="px-6 py-4"><div className="w-36 h-4 bg-slate-200 rounded animate-pulse"></div></td>
                  <td className="px-6 py-4"><div className="w-20 h-6 bg-slate-200 rounded-full animate-pulse"></div></td>
                  <td className="px-6 py-4"><div className="w-24 h-4 bg-slate-200 rounded animate-pulse"></div></td>
                  <td className="px-6 py-4"><div className="w-20 h-6 bg-slate-200 rounded-full animate-pulse"></div></td>
                  <td className="px-6 py-4 text-center"><div className="w-6 h-6 mx-auto bg-slate-200 rounded animate-pulse"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
