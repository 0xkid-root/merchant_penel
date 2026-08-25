'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CheckCircle2,
  IndianRupee,
  Landmark,
} from 'lucide-react'
import { toast } from 'sonner'

import { IFSC_BANK_DETAILS } from '../data/direct-payout-data'
import { directPayoutSchema, type DirectPayoutFormData } from '../schema/direct-payout.schema'

interface DirectPayoutFormProps {
  values: DirectPayoutFormData
  onChange: (values: DirectPayoutFormData) => void
  onContinue: () => void
}

export default function DirectPayoutForm({
  values,
  onChange,
  onContinue,
}: DirectPayoutFormProps) {
  const [isCheckingIfsc, setIsCheckingIfsc] = useState(false)

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
  const branchName = watch('branchName')
  const remarks = watch('remarks')

  const handleVerifyIfsc = async () => {
    const isIfscValid = await trigger('ifscCode')
    if (!isIfscValid) {
      toast.error('Enter a valid 11-character IFSC code')
      return
    }

    setIsCheckingIfsc(true)

    window.setTimeout(() => {
      const normalizedIfsc = ifscCode.trim().toUpperCase()
      const bankDetails = IFSC_BANK_DETAILS[normalizedIfsc]

      if (!bankDetails) {
        setValue('bankName', '', { shouldValidate: true })
        setValue('branchName', '', { shouldValidate: true })

        toast.error('Bank details not found for this IFSC code')
        setIsCheckingIfsc(false)
        return
      }

      setValue('bankName', bankDetails.bankName, { shouldValidate: true })
      setValue('branchName', bankDetails.branchName, { shouldValidate: true })

      toast.success('Bank details verified successfully')
      setIsCheckingIfsc(false)
    }, 700)
  }

  const onSubmit = (data: DirectPayoutFormData) => {
    onChange(data)
    onContinue()
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
        {/* Account holder */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Account Holder Name <span className="text-red-500">*</span>
          </label>

          <input
            {...register('accountHolderName')}
            placeholder="Enter account holder name"
            className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 outline-none transition focus:ring-4 ${
              errors.accountHolderName
                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
            }`}
          />
          {errors.accountHolderName && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.accountHolderName.message}
            </p>
          )}
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
              className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 outline-none transition focus:ring-4 ${
                errors.accountNumber
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
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
              className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 outline-none transition focus:ring-4 ${
                errors.confirmAccountNumber
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
            />
            {errors.confirmAccountNumber && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.confirmAccountNumber.message}
              </p>
            )}
          </div>
        </div>

        <div>
          {/* IFSC */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              IFSC Code <span className="text-red-500">*</span>
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <input
                  {...register('ifscCode', {
                    onChange: (e) => {
                      e.target.value = e.target.value.toUpperCase()
                      setValue('bankName', '', { shouldValidate: true })
                      setValue('branchName', '', { shouldValidate: true })
                    }
                  })}
                  placeholder="Example: HDFC0001234"
                  className={`h-12 w-full rounded-xl border bg-white px-4 text-sm uppercase text-slate-900 outline-none transition focus:ring-4 ${
                    errors.ifscCode
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                      : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                  }`}
                />
                {errors.ifscCode && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.ifscCode.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleVerifyIfsc}
                disabled={isCheckingIfsc}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Landmark className="h-4 w-4" />
                {isCheckingIfsc ? 'Verifying...' : 'Verify IFSC'}
              </button>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Demo IFSC: HDFC0001234, SBIN0004567, ICIC0000789, UTIB0000100
            </p>
          </div>

          {/* Bank + branch */}
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Bank Name
              </label>

              <input
                {...register('bankName')}
                readOnly
                placeholder="Verified bank name"
                className={`h-12 w-full rounded-xl border bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none ${
                  errors.bankName ? 'border-red-300' : 'border-slate-200'
                }`}
              />
              {errors.bankName && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.bankName.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Branch Name
              </label>

              <input
                {...register('branchName')}
                readOnly
                placeholder="Verified branch name"
                className={`h-12 w-full rounded-xl border bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none ${
                  errors.branchName ? 'border-red-300' : 'border-slate-200'
                }`}
              />
              {errors.branchName && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.branchName.message}
                </p>
              )}
            </div>
          </div>

          {/* Small success alert, not card */}
          {bankName && branchName ? (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              Bank account routing details verified.
            </div>
          ) : null}
        </div>

        {/* Amount + payment mode */}
        <div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                  className={`h-12 w-full rounded-xl border bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:ring-4 ${
                    errors.amount
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

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Payment Mode <span className="text-red-500">*</span>
              </label>

              <select
                {...register('paymentMode')}
                className={`h-12 w-full rounded-xl border bg-white px-4 text-sm font-medium text-slate-800 outline-none transition focus:ring-4 ${
                  errors.paymentMode
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
          </div>
        </div>

        {/* Remarks */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Remarks <span className="font-normal text-slate-400">(Optional)</span>
          </label>

          <input
            {...register('remarks')}
            placeholder="Add remarks"
            maxLength={250}
            className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 outline-none transition focus:ring-4 ${
              errors.remarks
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

      {/* Footer */}
      <div className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Verify all bank details carefully before continuing.
        </p>

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Continue to Review
        </button>
      </div>
    </form>
  )
}