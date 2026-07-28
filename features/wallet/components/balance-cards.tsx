'use client'

import {
  Lock,
  TrendingDown,
  TrendingUp,
  Wallet,
  AlertCircle
} from 'lucide-react'
import { useWalletSummary } from '../hooks/useWallet'
import { mapWalletSummary } from '../mappers/walletMapper'

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount)
}

export function BalanceCards() {
  const { data, isLoading, isError, refetch } = useWalletSummary()

  if (isLoading) {
    return (
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <article
            key={i}
            className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-full">
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200"></div>
                <div className="mt-3 h-8 w-32 animate-pulse rounded bg-slate-200"></div>
              </div>
              <div className="h-12 w-12 shrink-0 animate-pulse rounded-2xl bg-slate-200 sm:h-14 sm:w-14"></div>
            </div>
            <div className="my-5 border-t border-slate-100" />
            <div>
              <div className="h-4 w-32 animate-pulse rounded bg-slate-200"></div>
              <div className="mt-1 h-5 w-24 animate-pulse rounded bg-slate-200"></div>
            </div>
          </article>
        ))}
      </section>
    )
  }

  if (isError || !data) {
    return (
      <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-slate-900">Unable to load wallet summary</h3>
        <p className="mt-1 text-sm text-slate-500">Please try again.</p>
        <button
          onClick={() => refetch()}
          className="mt-4 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    )
  }

  const summary = mapWalletSummary(data)

  const cards = [
    {
      title: 'Available Balance',
      amount: formatCurrency(summary.availableBalance),
      subTitle: 'Withdrawable Balance',
      subAmount: formatCurrency(summary.withdrawableBalance),
      icon: Wallet,
      iconBg: 'bg-blue-50',
      iconColor: 'text-indigo-600',
    },
    {
      title: 'Hold Balance',
      amount: formatCurrency(summary.holdBalance),
      subTitle: 'Pending Amount',
      subAmount: formatCurrency(summary.holdBalance), // Using hold balance as pending amount based on previous hardcoded UI
      icon: Lock,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Lifetime Credit',
      amount: formatCurrency(summary.lifetimeCredit),
      subTitle: 'Successful Credit',
      subAmount: String(summary.successfulCreditCount),
      icon: TrendingUp,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Lifetime Debit',
      amount: formatCurrency(summary.lifetimeDebit),
      subTitle: 'Debit Transactions',
      subAmount: String(summary.debitTransactionCount),
      icon: TrendingDown,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-600',
    },
  ]

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <article
            key={card.title}
            className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h3 className="mt-3 break-words text-[22px] font-bold tracking-tight text-slate-900 sm:text-[24px]">
                  {card.amount}
                </h3>
              </div>

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:h-14 sm:w-14 ${card.iconBg}`}
              >
                <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${card.iconColor}`} />
              </div>
            </div>

            <div className="my-5 border-t border-slate-100" />

            <div>
              <p className="text-sm text-slate-500">{card.subTitle}</p>

              <p className="mt-1 text-base font-semibold text-slate-900">
                {card.subAmount}
              </p>
            </div>
          </article>
        )
      })}
    </section>
  )
}