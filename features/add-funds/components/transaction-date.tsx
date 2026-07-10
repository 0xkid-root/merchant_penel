'use client'

import { Controller, Control } from 'react-hook-form'
import { AddFundsSchema } from '../schema/add-funds.schema'

interface Props {
  control: Control<AddFundsSchema>
}

export default function TransactionDate({ control }: Props) {
  return (
    <Controller
      name="transactionDate"
      control={control}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">
            Transaction Date <span className="text-red-500">*</span>
          </label>

          <input
            {...field}
            type="date"
            max={new Date().toISOString().split('T')[0]}
            className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 outline-none transition focus:ring-4 ${
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