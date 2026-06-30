'use client'

import { FormProvider } from 'react-hook-form'

import { useAddFunds } from '../hooks/use-add-funds'

import VanCard from './van-card'
import AmountInput from './amount-input'
import PaymentMethodSelector from './payment-method-selector'
import ReferenceInput from './reference-input'
import TransactionDate from './transaction-date'
import RemarksInput from './remarks-input'
import PaymentProofUpload from './payment-proof-upload'
import FormActions from './form-actions'

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
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6"
      >
        {/* VAN */}
        <VanCard
          van="YESB000123456678"
          onCopy={copyVan}
        />

        {/* Amount + Payment Method */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <AmountInput control={form.control} />
          <PaymentMethodSelector control={form.control} />
        </div>

        {/* Reference + Transaction Date */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ReferenceInput control={form.control} />
          <TransactionDate control={form.control} />
        </div>

        {/* Remarks */}
        <RemarksInput control={form.control} />

        {/* Upload */}
        <PaymentProofUpload
          control={form.control}
          uploadFile={uploadFile}
          fileName={fileName}
        />

        {/* Buttons */}
        <FormActions
          loading={form.formState.isSubmitting}
        />
      </form>
    </FormProvider>
  )
}