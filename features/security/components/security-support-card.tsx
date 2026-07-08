'use client'

import { CircleHelp, Headphones } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SecuritySupportCard() {
  const router = useRouter()

  return (
    <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
          <CircleHelp className="h-6 w-6 text-blue-600" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Need help with account security?
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            For changes to registered mobile number, business details, or payout
            authorization settings, please contact support.
          </p>

          <button
            type="button"
            onClick={() => router.push('/support')}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
          >
            <Headphones className="h-4 w-4" />
            Contact Support
          </button>
        </div>
      </div>
    </section>
  )
}