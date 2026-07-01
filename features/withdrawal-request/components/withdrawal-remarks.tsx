'use client'

import { Controller, Control } from 'react-hook-form'
import { WithdrawalSchema } from '../schema/withdrawal.schema'

interface Props {
  control: Control<WithdrawalSchema>
}

export default function WithdrawalRemarks({
  control,
}: Props) {
  return (
    <Controller
      name="remarks"
      control={control}
      render={({ field, fieldState }) => (
        <div className="space-y-2">

          <label className="text-sm font-medium text-slate-900">
            Remarks
          </label>

          <textarea
            {...field}
            rows={4}
            placeholder="Enter remarks (optional)"
            className={`w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition ${
              fieldState.error
                ? 'border-red-500'
                : 'border-slate-300 focus:border-indigo-600'
            }`}
          />

          {fieldState.error && (
            <p className="text-xs text-red-500">
              {fieldState.error.message}
            </p>
          )}

        </div>
      )}
    />
  )
}
