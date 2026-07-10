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
    <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-end">
      <SecondaryButton
        type="button"
        onClick={onCancel}
        className="w-full sm:w-auto"
      >
        Cancel
      </SecondaryButton>

      <PrimaryButton
        type="submit"
        isLoading={loading}
        className="w-full sm:w-auto"
      >
        Submit Request
      </PrimaryButton>
    </div>
  )
}