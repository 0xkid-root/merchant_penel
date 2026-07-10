'use client'

import Link from 'next/link'
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Headphones,
} from 'lucide-react'

const infoItems = [
  {
    icon: CheckCircle2,
    title: 'Use your Virtual Account Number',
    description:
      'Transfer funds only to the Virtual Account Number shown in this form.',
    iconClassName: 'text-emerald-600',
    backgroundClassName: 'bg-emerald-50',
  },
  {
    icon: Clock3,
    title: 'Review time',
    description:
      'Fund requests are generally reviewed within 30 minutes during working hours.',
    iconClassName: 'text-blue-600',
    backgroundClassName: 'bg-blue-50',
  },
  {
    icon: AlertTriangle,
    title: 'Account name verification',
    description:
      'The sender account name should match your registered business name.',
    iconClassName: 'text-amber-600',
    backgroundClassName: 'bg-amber-50',
  },
  {
    icon: AlertTriangle,
    title: 'Avoid incorrect details',
    description:
      'Incorrect transfer reference or amount details may delay wallet credit.',
    iconClassName: 'text-red-600',
    backgroundClassName: 'bg-red-50',
  },
]

export function PaymentNotes() {
  return (
    <aside className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
        <h2 className="text-base font-semibold text-slate-900">
          Important Information
        </h2>

        <div className="mt-5 space-y-3">
          {infoItems.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className={`flex gap-3 rounded-xl p-4 ${item.backgroundClassName}`}
              >
                <Icon
                  className={`mt-0.5 h-5 w-5 shrink-0 ${item.iconClassName}`}
                />

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
        <h2 className="text-base font-semibold text-slate-900">
          Need Help?
        </h2>

        <div className="mt-4 flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
            <Headphones className="h-5 w-5 text-indigo-600" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">
              Support Available
            </p>

            <p className="mt-1 text-sm leading-5 text-slate-500">
              Contact support if you face any issue while submitting your fund
              request.
            </p>
          </div>
        </div>

        <Link
          href="/support"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
        >
          Contact Support
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </aside>
  )
}