'use client'

import { ArrowDown, ArrowUp, Wallet2 } from 'lucide-react'
import { useWalletStatement } from '../hooks/useWalletStatement'
import { formatCurrency } from '@/lib/utils/formatCurrency'

export function TransactionSummary() {
  const { data, isLoading, isError } = useWalletStatement()

  const summaryData = data?.data

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-sm sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-full">
                <div className="h-4 w-24 rounded bg-slate-200 animate-pulse"></div>
                <div className="mt-3 h-8 w-32 rounded bg-slate-200 animate-pulse sm:mt-4 sm:h-10"></div>
              </div>
              <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-100 animate-pulse sm:h-14 sm:w-14"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const totalCredit = isError ? 0 : summaryData?.totalCredit || 0
  const totalDebit = isError ? 0 : summaryData?.totalDebit || 0
  const totalTransactions = isError ? 0 : summaryData?.ledgerList?.length || 0

  const stats = [
    {
      title: 'Total Credits',
      value: formatCurrency(totalCredit),
      icon: ArrowDown,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Total Debits',
      value: formatCurrency(totalDebit),
      icon: ArrowUp,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-600',
    },
    {
      title: 'Total Transactions',
      value: totalTransactions.toString(),
      icon: Wallet2,
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon

        return (
          <div
            key={index}
            className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-sm sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h3 className="mt-3 break-words text-2xl font-extrabold leading-tight text-slate-900 sm:mt-4 sm:text-3xl">
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