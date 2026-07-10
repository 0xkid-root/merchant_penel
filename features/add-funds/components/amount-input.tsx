'use client'

import { Controller, type Control } from 'react-hook-form'

import type { AddFundsSchema } from '../schema/add-funds.schema'

interface Props {
  control: Control<AddFundsSchema>
}

export default function AmountInput({ control }: Props) {
  return (
    <Controller
      name="amount"
      control={control}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">
            Amount <span className="text-red-500">*</span>
          </label>

          <div
            className={`flex h-11 items-center rounded-xl border bg-white px-4 transition ${
              fieldState.error
                ? 'border-red-500 focus-within:ring-4 focus-within:ring-red-100'
                : 'border-slate-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100'
            }`}
          >
            <span className="mr-2 text-base font-medium text-slate-500">
              ₹
            </span>

            <input
              {...field}
              inputMode="decimal"
              type="text"
              placeholder="Enter amount"
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          {fieldState.error ? (
            <p className="text-xs text-red-500">
              {fieldState.error.message}
            </p>
          ) : (
            <p className="text-xs text-slate-500">
              Enter the exact amount transferred from your bank account.
            </p>
          )}
        </div>
      )}
    />
  )
}