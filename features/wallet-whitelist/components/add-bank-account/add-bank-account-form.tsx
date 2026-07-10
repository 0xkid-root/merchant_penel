'use client'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import {
  addBankAccountSchema,
  type AddBankAccountFormData,
} from '../../schema/add-bank.schema'

import BankAccountFields from './bank-account-fields'
import BankAccountUpload from './bank-account-upload'

export default function AddBankAccountForm() {
  const router = useRouter()

  const methods = useForm<AddBankAccountFormData>({
    resolver: zodResolver(addBankAccountSchema),
    mode: 'onBlur',
    defaultValues: {
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      confirmAccountNumber: '',
      ifscCode: '',
      branchName: '',
      cancelledCheque: null,
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCancel = () => {
    methods.reset()
    router.push('/wallet-whitelist')
  }

  const onSubmit = async (data: AddBankAccountFormData) => {
    try {
      setIsSubmitting(true)

      console.log('Add Bank Account Data:', data)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success('Bank account request submitted successfully')
      router.push('/wallet-whitelist')
    } catch {
      toast.error('Unable to submit bank account request')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6"
      >
        <div className="border-b border-slate-200 pb-5">
          <h2 className="text-base font-semibold text-slate-900">
            Bank Account Details
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter the account details exactly as registered with your bank.
          </p>
        </div>

        <BankAccountFields />

        <div className=" pt-6">
          <BankAccountUpload />
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-11 w-full rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </FormProvider>
  )
}