'use client'

import { Download, Plus } from 'lucide-react'

import PageHeader from '@/components/layout/page-header'
import { PrimaryButton } from '@/components/buttons/primary-button'
import { SecondaryButton } from '@/components/buttons/secondary-button'

interface Props {
  onAddBeneficiary: () => void
  onExport: () => void
}

export default function BeneficiariesHeader({
  onAddBeneficiary,
  onExport,
}: Props) {
  return (
    <PageHeader
      title="Beneficiaries"
      subtitle="Manage your beneficiaries for payouts."
      actions={
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <SecondaryButton
            onClick={onExport}
            className="h-11 w-full justify-center sm:w-auto"
          >
            <Download className="h-4 w-4" />
            Export
          </SecondaryButton>

          <PrimaryButton
            onClick={onAddBeneficiary}
            className="h-11 w-full justify-center sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Add Beneficiary
          </PrimaryButton>
        </div>
      }
    />
  )
}