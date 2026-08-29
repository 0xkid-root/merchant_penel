'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  IndianRupee,
  Landmark,
} from 'lucide-react'

import { directPayoutSchema, type DirectPayoutFormData } from '../schema/direct-payout.schema'

interface DirectPayoutFormProps {
  values: DirectPayoutFormData
  onContinue: (data: DirectPayoutFormData) => void
}

export default function DirectPayoutForm({
  values,
  onContinue,
}: DirectPayoutFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<DirectPayoutFormData>({
    resolver: zodResolver(directPayoutSchema),
    defaultValues: values,
    mode: 'onChange',
  })

  const ifscCode = watch('ifscCode')
  const bankName = watch('bankName')
  const remarks = watch('remarks')
  const accountNumber = watch('accountNumber')

  const onSubmit = (data: DirectPayoutFormData) => {
    onContinue(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
            <Landmark className="h-5 w-5 text-indigo-600" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Bank Account Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter beneficiary bank account details to create a direct payout.
            </p>
          </div>
        </div>
      </div>

      {/* Form content */}
      <div className="space-y-7 py-7">
        {/* Account holder + Mobile */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Account Holder Name <span className="text-red-500">*</span>
            </label>

            <input
              {...register('accountHolderName')}
              placeholder="Enter account holder name"
              className={`h-12 w-full rounded-xl border px-4 text-sm outline-none transition focus:ring-4 disabled:opacity-60 disabled:bg-slate-50 ${errors.accountHolderName
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-100 bg-white'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100 bg-white'
                }`}
            />
            {errors.accountHolderName && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.accountHolderName.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Mobile Number <span className="text-red-500">*</span>
            </label>

            <input
              {...register('mobile', {
                onChange: (e) => {
                  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10)
                }
              })}
              placeholder="Enter 10-digit mobile number"
              className={`h-12 w-full rounded-xl border px-4 text-sm outline-none transition focus:ring-4 disabled:opacity-60 disabled:bg-slate-50 ${errors.mobile
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-100 bg-white'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100 bg-white'
                }`}
            />
            {errors.mobile && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.mobile.message}
              </p>
            )}
          </div>
        </div>

        {/* Account number */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Bank Account Number <span className="text-red-500">*</span>
            </label>

            <input
              {...register('accountNumber', {
                onChange: (e) => {
                  e.target.value = e.target.value.replace(/\D/g, '')
                }
              })}
              placeholder="Enter account number"
              className={`h-12 w-full rounded-xl border px-4 text-sm text-slate-900 outline-none transition focus:ring-4 disabled:opacity-60 disabled:bg-slate-50 ${errors.accountNumber
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-100 bg-white'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100 bg-white'
                }`}
            />
            {errors.accountNumber && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.accountNumber.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Confirm Account Number <span className="text-red-500">*</span>
            </label>

            <input
              {...register('confirmAccountNumber', {
                onChange: (e) => {
                  e.target.value = e.target.value.replace(/\D/g, '')
                }
              })}
              placeholder="Re-enter account number"
              className={`h-12 w-full rounded-xl border px-4 text-sm text-slate-900 outline-none transition focus:ring-4 disabled:opacity-60 disabled:bg-slate-50 ${errors.confirmAccountNumber
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-100 bg-white'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100 bg-white'
                }`}
            />
            {errors.confirmAccountNumber && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.confirmAccountNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* IFSC */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              IFSC Code <span className="text-red-500">*</span>
            </label>

            <input
              {...register('ifscCode', {
                onChange: (e) => {
                  e.target.value = e.target.value.toUpperCase()
                }
              })}
              placeholder="Example: HDFC0001234"
              className={`h-12 w-full rounded-xl border px-4 text-sm uppercase text-slate-900 outline-none transition focus:ring-4 disabled:opacity-60 disabled:bg-slate-50 ${errors.ifscCode
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-100 bg-white'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100 bg-white'
                }`}
            />
            {errors.ifscCode && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.ifscCode.message}
              </p>
            )}


          </div>

          {/* Bank Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Bank Name <span className="text-red-500">*</span>
            </label>

            <input
              {...register('bankName')}
              placeholder="Enter bank name"
              className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 outline-none transition focus:ring-4 ${errors.bankName
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                }`}
            />
            {errors.bankName && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.bankName.message}
              </p>
            )}
          </div>
        </div>

        {/* Payment Mode + Amount */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Payment Mode <span className="text-red-500">*</span>
            </label>

            <select
              {...register('paymentMode')}
              className={`h-12 w-full rounded-xl border bg-white px-4 text-sm font-medium text-slate-800 outline-none transition focus:ring-4 ${errors.paymentMode
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                }`}
            >
              <option value="IMPS">IMPS (Immediate Transfer)</option>
              <option value="NEFT">NEFT (Standard Transfer)</option>
              <option value="RTGS">RTGS (High Value Transfer)</option>
            </select>
            {errors.paymentMode && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.paymentMode.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Payout Amount <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <IndianRupee className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                {...register('amount', {
                  onChange: (e) => {
                    e.target.value = e.target.value.replace(/[^\d.]/g, '')
                  }
                })}
                placeholder="Enter payout amount"
                className={`h-12 w-full rounded-xl border bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:ring-4 ${errors.amount
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                    : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                  }`}
              />
            </div>
            {errors.amount && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.amount.message}
              </p>
            )}
          </div>
        </div>

        {/* Remarks */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Remarks <span className="font-normal text-slate-400">(Optional)</span>
            </label>

            <input
              {...register('remarks')}
              placeholder="Add remarks"
              maxLength={250}
              className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 outline-none transition focus:ring-4 ${errors.remarks
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                }`}
            />
            <div className="mt-1.5 flex justify-between">
              {errors.remarks ? (
                <p className="text-xs font-medium text-red-500">
                  {errors.remarks.message}
                </p>
              ) : (
                <span></span>
              )}
              <p className="text-xs text-slate-400">
                {(remarks || '').length}/250
              </p>
            </div>
          </div>
        </div>


      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Please verify bank details carefully before continuing.
        </p>

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold text-white transition bg-indigo-600 hover:bg-indigo-700"
        >
          Continue to Review
        </button>
      </div>
    </form>
  )
}