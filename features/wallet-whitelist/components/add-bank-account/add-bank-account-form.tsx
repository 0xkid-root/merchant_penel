'use client'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import {
  addBankAccountSchema,
  AddBankAccountFormData,
} from '../../schema/add-bank.schema'

import BankAccountFields from './bank-account-fields'
import BankAccountNotes from './bank-account-notes'
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

      // API call will come here later.
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
        className="space-y-6"
      >
        <BankAccountFields />

        <BankAccountNotes />

        <BankAccountUpload />

        <div className="flex items-center justify-end gap-4 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="rounded-lg border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-indigo-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </FormProvider>
  )
}