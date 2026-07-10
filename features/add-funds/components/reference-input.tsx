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
            UTR / Reference ID <span className="text-red-500">*</span>
          </label>

          <input
            {...field}
            type="text"
            placeholder="Enter UTR or transaction reference"
            className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
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