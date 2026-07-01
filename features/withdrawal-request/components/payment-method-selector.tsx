
'use client'

import { Controller, Control } from 'react-hook-form'

import { WithdrawalSchema } from '../schema/withdrawal.schema'
import { PAYMENT_METHODS } from '../data/payment-method-data'

interface Props {
  control: Control<WithdrawalSchema>
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
            Payment Method
            <span className="text-red-500">*</span>
          </label>

          <select
            {...field}
            className={`w-full rounded-xl border px-4 py-3 text-sm ${
              fieldState.error
                ? 'border-red-500'
                : 'border-slate-300 focus:border-indigo-600'
            }`}
          >
            <option value="">
              Select Payment Method
            </option>

            {PAYMENT_METHODS.map((method) => (
              <option
                key={method.value}
                value={method.value}
              >
                {method.label}
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
