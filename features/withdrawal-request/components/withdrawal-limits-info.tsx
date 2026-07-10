'use client'

import {
  AlertTriangle,
  Clock,
  FileText,
  HelpCircle,
  Shield,
} from 'lucide-react'
import Link from 'next/link'

const informationItems = [
  {
    icon: Shield,
    title: 'Registered account only',
    description:
      'Withdrawals are processed only to your registered bank account.',
    iconClass: 'bg-green-100 text-green-600',
  },
  {
    icon: Clock,
    title: 'Review time',
    description:
      'Requests are usually reviewed within 30 minutes during working hours.',
    iconClass: 'bg-blue-100 text-blue-600',
  },
  {
    icon: FileText,
    title: 'KYC verification',
    description:
      'Ensure your selected bank account is active and KYC verified.',
    iconClass: 'bg-amber-100 text-amber-600',
  },
  {
    icon: AlertTriangle,
    title: 'Correct information required',
    description:
      'Incorrect details may result in rejection or processing delays.',
    iconClass: 'bg-red-100 text-red-600',
  },
]

export function WithdrawalLimitsInfo() {
  const dailyLimit = 500000
  const usedToday = 120000
  const remainingLimit = dailyLimit - usedToday

  return (
    <aside className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h3 className="text-base font-semibold text-slate-900">
          Important Information
        </h3>

        <div className="mt-5 space-y-4">
          {informationItems.map((item) => {
            const Icon = item.icon

            return (
              <div key={item.title} className="flex gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${item.iconClass}`}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800">
                    {item.title}
                  </p>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h3 className="text-base font-semibold text-slate-900">
          Withdrawal Limits
        </h3>

        <div className="mt-5 divide-y divide-slate-100">
          <div className="flex items-center justify-between gap-4 py-3 pt-0">
            <span className="text-sm text-slate-500">
              Daily Withdrawal Limit
            </span>

            <span className="text-sm font-semibold text-slate-900">
              ₹{dailyLimit.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 py-3">
            <span className="text-sm text-slate-500">Used Today</span>

            <span className="text-sm font-semibold text-slate-900">
              ₹{usedToday.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 py-3 pb-0">
            <span className="text-sm text-slate-500">Remaining Limit</span>

            <span className="text-sm font-semibold text-indigo-600">
              ₹{remainingLimit.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
            <HelpCircle className="h-5 w-5 text-indigo-600" />
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Need Help?
            </h3>

            <p className="mt-2 text-sm leading-5 text-slate-500">
              If you face any issue while withdrawing funds, our support team
              is available to help.
            </p>

            <Link
              href="/support"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
            >
              Contact Support
              <span>↗</span>
            </Link>
          </div>
        </div>
      </section>
    </aside>
  )
}