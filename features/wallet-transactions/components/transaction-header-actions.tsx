'use client'

import { Download, SlidersHorizontal } from 'lucide-react'

import { PrimaryButton } from '@/components/buttons/primary-button'
import { SecondaryButton } from '@/components/buttons/secondary-button'

interface TransactionHeaderActionsProps {
  onExport?: () => void
  onFilter?: () => void
}

export default function TransactionHeaderActions({
  onExport,
  onFilter,
}: TransactionHeaderActionsProps) {
  return (
    <div className="flex items-center gap-3">

      <SecondaryButton onClick={onExport}>
        <Download className="h-4 w-4" />
        Export
      </SecondaryButton>

      <PrimaryButton onClick={onFilter}>
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </PrimaryButton>

    </div>
  )
}