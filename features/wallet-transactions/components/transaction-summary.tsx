'use client'

import { stats } from '../data/wallet-transactions'

export function TransactionSummary() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon

        return (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            {/* Top */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[15px] font-medium text-slate-600">
                  {stat.title}
                </p>

                <h3 className="mt-4 text-[24px] font-bold leading-none text-slate-900">
                  {stat.value}
                </h3>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${stat.iconBg}`}
              >
                <Icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}