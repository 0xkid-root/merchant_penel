'use client'

import { Search } from 'lucide-react'

interface TransactionSearchProps {
  value: string
  onChange: (value: string) => void
}

export default function TransactionSearch({ value, onChange }: TransactionSearchProps) {
  return (
    <div className="px-6 py-5">
      <div className="relative">
        <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search transaction ID, remark..."
          className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-slate-300"
        />
      </div>
    </div>
  )
}