'use client'

import { Controller, Control } from 'react-hook-form'
import { AddFundsSchema } from '../schema/add-funds.schema'

interface Props {
  control: Control<AddFundsSchema>
}

export default function RemarksInput({ control }: Props) {
  return (
    <Controller
      name="remarks"
      control={control}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <label className="text-sm font-medium text-slate-900">
              Remarks
            </label>

            <span className="text-xs text-slate-500">Optional</span>
          </div>

          <textarea
            {...field}
            rows={3}
            placeholder="Add any notes related to this payment..."
            className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
              fieldState.error
                ? 'border-red-500 focus:ring-red-100'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
            }`}
          />

          {fieldState.error ? (
            <p className="text-xs text-red-500">
              {fieldState.error.message}
            </p>
          ) : null}
        </div>
      )}
    />
  )
}