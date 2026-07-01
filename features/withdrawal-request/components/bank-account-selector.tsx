'use client'

import { Controller, Control } from 'react-hook-form'

import { WithdrawalSchema } from '../schema/withdrawal.schema'
import { BANK_ACCOUNTS } from '../data/bank-account-data'

interface Props {
  control: Control<WithdrawalSchema>
}

export default function BankAccountSelector({
  control,
}: Props) {
  return (
    <Controller
      name="bankAccount"
      control={control}
      render={({ field, fieldState }) => (
        <div className="space-y-2">

          <label className="text-sm font-medium text-slate-900">
            Bank Account
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
              Select Bank Account
            </option>

            {BANK_ACCOUNTS.map((bank) => (
              <option
                key={bank.id}
                value={bank.id}
              >
                {bank.bank} ({bank.accountNumber})
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
