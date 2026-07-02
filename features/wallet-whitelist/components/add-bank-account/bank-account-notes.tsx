'use client'

import { AlertCircle } from 'lucide-react'

export default function BankAccountNotes() {
  const notes = [
    'Account must belong to your registered business.',
    'Ensure account details exactly match your bank records.',
    'Incorrect account details may lead to rejection or payout delays.',
    'Only approved bank accounts can be used for wallet withdrawals.',
  ]

  return (
    <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-5">
      <div className="flex items-start gap-3">
        {/* Icon */}

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
          <AlertCircle className="h-5 w-5 text-indigo-600" />
        </div>

        {/* Content */}

        <div className="flex-1">
          <h3 className="text-sm font-semibold text-slate-900">
            Important Notes
          </h3>

          <ul className="mt-3 space-y-2">
            {notes.map((note) => (
              <li
                key={note}
                className="flex items-start gap-2 text-sm text-slate-600"
              >
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-indigo-600" />

                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}