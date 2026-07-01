'use client'

import { FormProvider } from 'react-hook-form'

import { useWithdrawal } from '../hooks/use-withdrawal'

import AvailableBalanceCard from './available-balance-card'
import WithdrawalAmountInput from './withdrawal-amount-input'
import BankAccountSelector from './bank-account-selector'
import PaymentMethodSelector from './payment-method-selector'
import WithdrawalRemarks from './withdrawal-remarks'
import WithdrawalProofUpload from './withdrawal-proof-upload'
import WithdrawalActions from './withdrawal-actions'

export default function WithdrawalRequestForm() {
  const {
    form,
    submit,
    uploadFile,
    fileName,
  } = useWithdrawal()

  return (
    <FormProvider {...form}>

      <form
        onSubmit={form.handleSubmit(submit)}
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >

        {/* Available Balance */}
        <AvailableBalanceCard
          balance={1482350}
        />

        {/* Withdrawal Amount */}
        <WithdrawalAmountInput
          control={form.control}
        />

        {/* Bank Account */}
        <BankAccountSelector
          control={form.control}
        />

        {/* Payment Method */}
        <PaymentMethodSelector
          control={form.control}
        />

        {/* Remarks */}
        <WithdrawalRemarks
          control={form.control}
        />

        {/* Supporting Document */}
        <WithdrawalProofUpload
          control={form.control}
          uploadFile={uploadFile}
          fileName={fileName}
        />

        {/* Submit / Cancel */}
        <WithdrawalActions
          loading={form.formState.isSubmitting}
        />

      </form>

    </FormProvider>
  )
}