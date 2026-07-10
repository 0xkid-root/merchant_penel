'use client'

import { Controller, type Control } from 'react-hook-form'
import type { WithdrawalSchema } from '../schema/withdrawal.schema'
import { BANK_ACCOUNTS } from '../data/bank-account-data'

interface Props {
  control: Control<WithdrawalSchema>
}

export default function BankAccountSelector({ control }: Props) {
  return (
    <Controller
      name="bankAccount"
      control={control}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">
            Bank Account <span className="text-red-500">*</span>
          </label>

          <select
            {...field}
            className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 outline-none transition ${
              fieldState.error
                ? 'border-red-500 focus:ring-4 focus:ring-red-100'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'
            }`}
          >
            <option value="">Select bank account</option>

            {BANK_ACCOUNTS.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.bank} ({bank.accountNumber})
              </option>
            ))}
          </select>

          {fieldState.error ? (
            <p className="text-xs text-red-500">
              {fieldState.error.message}
            </p>
          ) : (
            <p className="text-xs text-slate-500">
              Select the registered bank account to receive funds.
            </p>
          )}
        </div>
      )}
    />
  )
}