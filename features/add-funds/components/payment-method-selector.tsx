'use client'

import { Controller, Control } from 'react-hook-form'
import { AddFundsSchema } from '../schema/add-funds.schema'

const PAYMENT_METHODS = [
  { label: 'IMPS', value: 'IMPS' },
  { label: 'NEFT', value: 'NEFT' },
  { label: 'RTGS', value: 'RTGS' },
]

interface Props {
  control: Control<AddFundsSchema>
}

export default function PaymentMethodSelector({
  control,
}: Props) {
  return (
    <Controller
      name="paymentMethod"
      control={control}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">
            Payment Method <span className="text-red-500">*</span>
          </label>

          <select
            {...field}
            className={`h-14 w-full rounded-xl border px-4 text-sm outline-none ${
              fieldState.error
                ? 'border-red-500'
                : 'border-slate-300 focus:border-indigo-600'
            }`}
          >
            <option value="">Select Payment Method</option>

            {PAYMENT_METHODS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

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