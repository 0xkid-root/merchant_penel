'use client'

import {
  Wallet,
  Lock,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'

export function BalanceCards() {
  const cards = [
    {
      title: 'Available Balance',
      amount: '₹14,82,350.00',
      subTitle: 'Withdrawable Balance',
      subAmount: '₹14,32,350.00',
      icon: Wallet,
      iconBg: 'bg-blue-50',
      iconColor: 'text-indigo-600',
    },
    {
      title: 'Hold Balance',
      amount: '₹50,000.00',
      subTitle: 'Pending Amount',
      subAmount: '₹50,000.00',
      icon: Lock,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Lifetime Credit',
      amount: '₹28,45,300.00',
      subTitle: 'Successful Credit',
      subAmount: '32',
      icon: TrendingUp,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Lifetime Debit',
      amount: '₹13,62,950.00',
      subTitle: 'Debit Transactions',
      subAmount: '48',
      icon: TrendingDown,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon

        return (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            {/* Top */}
            <div className="flex items-start justify-between">

              <div>

                <p className="text-[15px] font-medium text-slate-600">
                  {card.title}
                </p>

                <h3 className="mt-4 text-[24px] font-bold leading-none text-slate-900">
                  {card.amount}
                </h3>

              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${card.iconBg}`}
              >
                <Icon className={`h-6 w-6 ${card.iconColor}`} />
              </div>

            </div>

            {/* Divider */}
            <div className="my-5 border-t border-slate-100" />

            {/* Bottom */}
            <div>

              <p className="text-sm text-slate-500">
                {card.subTitle}
              </p>

              <p className="mt-1 text-base font-semibold text-slate-900">
                {card.subAmount}
              </p>

            </div>

          </div>
        )
      })}
    </div>
  )
}