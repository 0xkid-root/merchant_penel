'use client'

import { Copy, Info } from 'lucide-react'

interface VanCardProps {
  van: string
  onCopy: () => void
}

export default function VanCard({
  van,
  onCopy,
}: VanCardProps) {
  return (
    <section className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <label className="text-sm font-semibold text-slate-900">
          Virtual Account Number (VAN)
        </label>

        <Info className="h-4 w-4 text-slate-400" />
      </div>

      <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 sm:px-4">
        <span className="min-w-0 flex-1 break-all font-mono text-sm font-semibold tracking-wide text-slate-900">
          {van}
        </span>

        <button
          type="button"
          onClick={onCopy}
          aria-label="Copy virtual account number"
          title="Copy virtual account number"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
        >
          <Copy className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-3 text-xs leading-5 text-slate-500">
        Use this Virtual Account Number while transferring funds from your bank
        account.
      </p>
    </section>
  )
}