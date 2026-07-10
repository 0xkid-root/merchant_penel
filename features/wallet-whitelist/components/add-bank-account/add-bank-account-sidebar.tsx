'use client'

import {
  BadgeCheck,
  Building2,
  Clock3,
  ShieldCheck,
} from 'lucide-react'
import BankAccountNotes from './bank-account-notes'

export default function AddBankAccountSidebar() {
  const points = [
    {
      icon: ShieldCheck,
      title: 'Secure verification',
      description:
        'Your bank account details are verified securely before approval.',
    },
    {
      icon: Building2,
      title: 'Wallet withdrawals',
      description:
        'Approved bank accounts can be used for wallet withdrawal requests.',
    },
    {
      icon: Clock3,
      title: 'Fast review process',
      description:
        'Most bank account requests are reviewed within 1 to 2 business days.',
    },
  ]

  return (
    <aside className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
          <BadgeCheck className="h-5 w-5 text-indigo-600" />
        </div>

        <h2 className="mt-4 text-base font-semibold text-slate-900">
          Why do we need this?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Adding a verified bank account helps you securely withdraw wallet
          balance to your registered business account.
        </p>

        <div className="mt-5 space-y-5 border-t border-slate-100 pt-5">
          {points.map((point) => {
            const Icon = point.icon

            return (
              <div key={point.title} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                  <Icon className="h-4 w-4 text-indigo-600" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    {point.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {point.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-amber-900">
          Important
        </p>

        <p className="mt-1 text-xs leading-5 text-amber-800">
          The bank account holder name should match your registered business
          name. Incorrect details may cause rejection.
        </p>

      </div> */}
      <BankAccountNotes/>
    </aside>
  )
}