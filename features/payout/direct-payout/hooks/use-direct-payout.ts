'use client'

import { useState } from 'react'

import type {
  DirectPayoutFormData,
  DirectPayoutStep,
  DirectPayoutTransaction,
} from '../types/direct-payout.types'

const INITIAL_FORM_DATA: DirectPayoutFormData = {
  accountHolderName: '',
  accountNumber: '',
  confirmAccountNumber: '',
  ifscCode: '',
  bankName: '',
  branchName: '',
  amount: '',
  remarks: '',
}

export function useDirectPayout() {
  const [step, setStep] = useState<DirectPayoutStep>('form')
  const [formData, setFormData] =
    useState<DirectPayoutFormData>(INITIAL_FORM_DATA)

  const [transaction, setTransaction] =
    useState<DirectPayoutTransaction | null>(null)

  const updateFormData = (
    field: keyof DirectPayoutFormData,
    value: string,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  const resetDirectPayout = () => {
    setStep('form')
    setFormData(INITIAL_FORM_DATA)
    setTransaction(null)
  }

  return {
    step,
    formData,
    transaction,
    setStep,
    setFormData,
    setTransaction,
    updateFormData,
    resetDirectPayout,
  }
}