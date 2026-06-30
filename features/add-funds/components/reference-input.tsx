'use client'

import { Controller, Control } from 'react-hook-form'
import { AddFundsSchema } from '../schema/add-funds.schema'

interface Props {
  control: Control<AddFundsSchema>
}

export default function ReferenceInput({ control }: Props) {
  return (
    <Controller
      name="referenceId"
      control={control}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">
            UTR / Reference ID
            <span className="text-red-500">*</span>
          </label>

          <input
            {...field}
            type="text"
            placeholder="Enter UTR / Transaction Reference Number"
            className={`h-14 w-full rounded-xl border px-4 text-sm outline-none transition ${
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