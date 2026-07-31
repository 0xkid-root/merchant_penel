'use client'

import { Download, SlidersHorizontal, Loader2, ChevronDown } from 'lucide-react'

import { PrimaryButton } from '@/components/buttons/primary-button'
import { SecondaryButton } from '@/components/buttons/secondary-button'
import { useWalletExport } from '../hooks/useWalletExport'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

interface TransactionHeaderActionsProps {
  onFilter?: () => void
  filters?: {
    search?: string
    transactionType?: string
    fromDate?: string
    toDate?: string
  }
}

export default function TransactionHeaderActions({
  onFilter,
  filters,
}: TransactionHeaderActionsProps) {
  const { mutate: exportTransactions, isPending } = useWalletExport()

  const handleExport = (format: 'CSV' | 'EXCEL') => {
    exportTransactions({
      search: filters?.search || undefined,
      transactionType: filters?.transactionType === 'ALL' ? undefined : filters?.transactionType,
      fromDate: filters?.fromDate || undefined,
      toDate: filters?.toDate || undefined,
      exportFormat: format
    })
  }

  return (
    <div className="flex items-center gap-3">

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <SecondaryButton disabled={isPending}>
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              Export
              <ChevronDown className="h-4 w-4 ml-1" />
            </SecondaryButton>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleExport('CSV')}>
            CSV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport('EXCEL')}>
            Excel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <PrimaryButton onClick={onFilter}>
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </PrimaryButton>

    </div>
  )
}