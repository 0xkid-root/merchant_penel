'use client'

import { PrimaryButton } from '@/components/buttons/primary-button'
import { SecondaryButton } from '@/components/buttons/secondary-button'

interface FormActionsProps {
  loading?: boolean
  onCancel?: () => void
}

export default function FormActions({
  loading = false,
  onCancel,
}: FormActionsProps) {
  return (
    <div className="flex items-center justify-end gap-4 pt-6">

      <SecondaryButton
        type="button"
        onClick={onCancel}
      >
        Cancel
      </SecondaryButton>

      <PrimaryButton
        type="submit"
        isLoading={loading}
      >
        Submit Request
      </PrimaryButton>

    </div>
  )
}
