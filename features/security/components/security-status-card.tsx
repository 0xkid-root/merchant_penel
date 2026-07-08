'use client'

import {
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react'

import type { SecurityStatusData } from '../types/security.types'

interface SecurityStatusCardProps {
  data: SecurityStatusData
}

export default function SecurityStatusCard({
  data,
}: SecurityStatusCardProps) {
  return (
    <aside className="rounded-3xl border border-emerald-200 bg-white p-6  sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-100">
          <ShieldCheck className="h-7 w-7 text-emerald-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Account Security Status
          </h2>

          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            {data.statusLabel}
          </div>
        </div>
      </div>

      <p className="mt-7 text-sm leading-7 text-slate-500">
        {data.description}
      </p>

      <div className="mt-7 border-t border-slate-200 pt-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-slate-500">
            Account access
          </span>

          <span className="text-sm font-semibold text-emerald-700">
            {data.accountAccess}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="text-sm text-slate-500">
            Password status
          </span>

          <span className="text-sm font-semibold text-emerald-700">
            {data.passwordStatus}
          </span>
        </div>
      </div>
    </aside>
  )
}