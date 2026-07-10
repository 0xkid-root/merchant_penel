'use client'

import { Controller, type Control } from 'react-hook-form'

import type { AddFundsSchema } from '../schema/add-funds.schema'

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
            className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 outline-none transition ${
              fieldState.error
                ? 'border-red-500 focus:ring-4 focus:ring-red-100'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'
            }`}
          >
            <option value="">Select payment method</option>

            {PAYMENT_METHODS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          {fieldState.error ? (
            <p className="text-xs text-red-500">
              {fieldState.error.message}
            </p>
          ) : (
            <p className="text-xs text-slate-500">
              Select the method used for the bank transfer.
            </p>
          )}
        </div>
      )}
    />
  )
}