
'use client'

import { Copy, Info } from 'lucide-react'
import { toast } from 'sonner'

interface VanCardProps {
  van: string
  onCopy: () => void
}

export default function VanCard({ van,onCopy }: VanCardProps) {

  
  return (
    <div className="space-y-2">

      <div className="flex items-center gap-2">

        <label className="text-sm font-medium text-slate-900">
          Virtual Account Number (VAN)
        </label>

        <Info className="h-4 w-4 text-slate-400" />

      </div>

      <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">

        <span className="font-mono text-sm font-semibold text-slate-900">
          {van}
        </span>

        <button
          type="button"
          onClick={onCopy}
          className="ml-auto rounded-lg p-2 transition hover:bg-slate-200"
        >
          <Copy className="h-4 w-4 text-slate-600" />
        </button>

      </div>

      <p className="text-xs text-slate-500">
        Use this Virtual Account Number to transfer funds.
      </p>

    </div>
  )
}

