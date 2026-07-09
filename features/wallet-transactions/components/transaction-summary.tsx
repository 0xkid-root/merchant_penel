'use client'

import { stats } from '../data/wallet-transactions'

export function TransactionSummary() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon

        return (
          <div
            key={index}
            className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5  transition-shadow hover:shadow-md sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-600">
                  {stat.title}
                </p>

                <h3 className="mt-3 break-words text-xl font-bold leading-tight text-slate-900 sm:mt-4 sm:text-2xl">
                  {stat.value}
                </h3>
              </div>

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14 ${stat.iconBg}`}
              >
                <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}