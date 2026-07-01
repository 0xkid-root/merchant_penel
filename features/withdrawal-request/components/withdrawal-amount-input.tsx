'use client'

import { Controller, Control } from 'react-hook-form'
import { WithdrawalSchema } from '../schema/withdrawal.schema'

interface Props {
  control: Control<WithdrawalSchema>
}

export default function WithdrawalAmountInput({
  control,
}: Props) {
  return (
    <Controller
      name="amount"
      control={control}
      render={({ field, fieldState }) => (
        <div className="space-y-2">

          <label className="text-sm font-medium text-slate-900">
            Withdrawal Amount
            <span className="text-red-500">*</span>
          </label>

          <div
            className={`flex items-center rounded-xl border px-4 py-3 ${
              fieldState.error
                ? 'border-red-500'
                : 'border-slate-300 focus-within:border-indigo-600'
            }`}
          >
            <span className="mr-2 text-slate-500">
              ₹
            </span>

            <input
              {...field}
              placeholder="Enter Amount"
              className="flex-1 bg-transparent text-sm outline-none"
            />
          </div>

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
