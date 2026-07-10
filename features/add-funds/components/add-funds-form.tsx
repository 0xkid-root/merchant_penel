'use client'

import { FormProvider } from 'react-hook-form'

import { useAddFunds } from '../hooks/use-add-funds'

import AmountInput from './amount-input'
import FormActions from './form-actions'
import PaymentMethodSelector from './payment-method-selector'
import PaymentProofUpload from './payment-proof-upload'
import ReferenceInput from './reference-input'
import RemarksInput from './remarks-input'
import TransactionDate from './transaction-date'
import VanCard from './van-card'

export function AddFundsForm() {
  const {
    form,
    submit,
    copyVan,
    uploadFile,
    fileName,
  } = useAddFunds()

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6"
      >
        <div className="border-b border-slate-200 pb-5">
          <h2 className="text-base font-semibold text-slate-900">
            Fund Request Details
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter your bank transfer details to submit a wallet funding request.
          </p>
        </div>

        <VanCard
          van="YESB000123456678"
          onCopy={copyVan}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <AmountInput control={form.control} />
          <PaymentMethodSelector control={form.control} />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ReferenceInput control={form.control} />
          <TransactionDate control={form.control} />
        </div>

        <RemarksInput control={form.control} />

        <PaymentProofUpload
          control={form.control}
          uploadFile={uploadFile}
          fileName={fileName}
        />

        <div className=" pt-5">
          <FormActions loading={form.formState.isSubmitting} />
        </div>
      </form>
    </FormProvider>
  )
}