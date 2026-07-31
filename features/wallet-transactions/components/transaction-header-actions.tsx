'use client'

import { Download, SlidersHorizontal, Loader2 } from 'lucide-react'

import { PrimaryButton } from '@/components/buttons/primary-button'
import { SecondaryButton } from '@/components/buttons/secondary-button'
import { useWalletExport } from '../hooks/useWalletExport'

interface TransactionHeaderActionsProps {
  onFilter?: () => void
  filters?: {
    search?: string
    transactionType?: string
  }
}

export default function TransactionHeaderActions({
  onFilter,
  filters,
}: TransactionHeaderActionsProps) {
  const { mutate: exportTransactions, isPending } = useWalletExport()

  const handleExport = () => {
    exportTransactions({
      search: filters?.search || undefined,
      transactionType: filters?.transactionType === 'ALL' ? undefined : filters?.transactionType,
      exportFormat: 'CSV'
    })
  }

  return (
    <div className="flex items-center gap-3">

      <SecondaryButton onClick={handleExport} disabled={isPending}>
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        {isPending ? 'Exporting...' : 'Export CSV'}
      </SecondaryButton>

      <PrimaryButton onClick={onFilter}>
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </PrimaryButton>

    </div>
  )
}