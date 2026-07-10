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
  const { form, submit, uploadFile, fileName } = useWithdrawal()

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6"
      >
        <AvailableBalanceCard balance={1482350} />

        <WithdrawalAmountInput control={form.control} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <BankAccountSelector control={form.control} />
          <PaymentMethodSelector control={form.control} />
        </div>

        <WithdrawalRemarks control={form.control} />

        <WithdrawalProofUpload
          control={form.control}
          uploadFile={uploadFile}
          fileName={fileName}
        />

        <WithdrawalActions loading={form.formState.isSubmitting} />
      </form>
    </FormProvider>
  )
}