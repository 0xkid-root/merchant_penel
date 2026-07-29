'use client'

import { ChevronDown, Download } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface TransactionTableHeaderProps {
  selectedTransactionType?: 'CREDIT' | 'DEBIT'
  onTransactionTypeChange?: (type: 'CREDIT' | 'DEBIT' | undefined) => void
}

export default function TransactionTableHeader({
  selectedTransactionType,
  onTransactionTypeChange,
}: TransactionTableHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <h3 className="text-xl font-semibold leading-7 text-slate-900 sm:text-2xl">
        Recent Transactions </h3>
      <div className="grid w-full grid-cols-[minmax(0,1fr)_48px] gap-3 sm:flex sm:w-auto sm:items-center">
        <DropdownMenu>
          <DropdownMenuTrigger
            type="button"
            className="flex h-12 min-w-0 items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:justify-center"
          >
            <span className="truncate">
              {selectedTransactionType === 'CREDIT'
                ? 'Credit'
                : selectedTransactionType === 'DEBIT'
                ? 'Debit'
                : 'All Transactions'}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onTransactionTypeChange?.(undefined)}>
              All Transactions
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onTransactionTypeChange?.('CREDIT')}>
              Credit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onTransactionTypeChange?.('DEBIT')}>
              Debit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          type="button"
          aria-label="Export transactions"
          title="Export transactions"
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto sm:gap-2 sm:px-4"
        >
          <Download className="h-4 w-4 shrink-0" />

          <span className="hidden sm:inline">Export</span>
        </button>
      </div>
    </div>

  )
}
