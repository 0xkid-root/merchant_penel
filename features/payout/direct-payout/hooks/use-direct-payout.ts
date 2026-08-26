'use client'

import { useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { directPayoutApi } from '../api/directPayoutApi'
import { otpApi } from '../../api/otpApi'

import { formatCurrency } from '@/lib/utils/formatCurrency'
import { useWalletBalance } from '@/features/wallet/hooks/useWalletBalance'
import { useAuthStore } from '@/lib/store/authStore'

import type {
  DirectPayoutFormData,
  DirectPayoutStep,
} from '../types/direct-payout.types'

const INITIAL_FORM_DATA: DirectPayoutFormData = {
  accountHolderName: '',
  accountNumber: '',
  confirmAccountNumber: '',
  ifscCode: '',
  bankName: '',
  branchName: '', // Left for type compatibility if needed, though removed from form
  amount: '',
  remarks: '',
}

export interface DirectPayoutResultData {
  status: 'SUCCESS' | 'PENDING' | 'FAILED'
  payoutId: string
  message: string
  failureReason?: string
}

export interface DirectPayoutState {
  currentStep: DirectPayoutStep
  formData: DirectPayoutFormData
  otp: string
  isLoading: boolean
  result: DirectPayoutResultData | null
  remainingSeconds: number
  otpExpiryTime: number | null
}

const INITIAL_STATE: DirectPayoutState = {
  currentStep: 'form',
  formData: INITIAL_FORM_DATA,
  otp: '',
  isLoading: false,
  result: null,
  remainingSeconds: 0,
  otpExpiryTime: null,
}

// Flat charge for direct payout
const DIRECT_PAYOUT_CHARGES = 0 
const DIRECT_PAYOUT_MIN_AMOUNT = 1
const DIRECT_PAYOUT_MAX_AMOUNT = 1000000

export function useDirectPayout() {
  const queryClient = useQueryClient()
  const user = useAuthStore((s) => s.user)
  const [state, setState] = useState<DirectPayoutState>(INITIAL_STATE)
  const [error, setError] = useState<string | null>(null)

  const { data: walletBalance = 0 } = useWalletBalance()

  const amountNumber = Number(state.formData.amount || 0)

  // Direct Payout Total Debit calculation
  const totalDebit = useMemo(() => {
    return amountNumber + DIRECT_PAYOUT_CHARGES
  }, [amountNumber])

  const updateFormData = (
    field: keyof DirectPayoutFormData,
    value: string,
  ) => {
    setError(null)
    setState((previous) => ({
      ...previous,
      formData: {
        ...previous.formData,
        [field]: value,
      },
    }))
  }

  const validatePayoutForm = () => {
    if (!state.formData.amount || amountNumber <= 0) {
      setError('Please enter a valid payout amount.')
      return false
    }

    if (amountNumber < DIRECT_PAYOUT_MIN_AMOUNT) {
      setError(`Minimum payout amount is ₹${DIRECT_PAYOUT_MIN_AMOUNT.toLocaleString('en-IN')}.`)
      return false
    }

    if (amountNumber > DIRECT_PAYOUT_MAX_AMOUNT) {
      setError(`Maximum payout amount is ${formatCurrency(DIRECT_PAYOUT_MAX_AMOUNT)}.`)
      return false
    }

    if (totalDebit > walletBalance) {
      setError(
        `Insufficient wallet balance. You need ${formatCurrency(
          totalDebit - walletBalance,
        )} more.`,
      )
      return false
    }

    return true
  }

  const goToReview = () => {
    if (!validatePayoutForm()) return
    setError(null)
    setState((previous) => ({
      ...previous,
      currentStep: 'review',
    }))
  }

  const goBackToForm = () => {
    setError(null)
    setState((previous) => ({
      ...previous,
      currentStep: 'form',
    }))
  }

  const sendOtp = async () => {
    if (state.otpExpiryTime && Date.now() < state.otpExpiryTime) {
      const remaining = Math.floor((state.otpExpiryTime - Date.now()) / 1000)
      setState((previous) => ({
        ...previous,
        currentStep: 'otp',
        remainingSeconds: remaining > 0 ? remaining : 180,
      }))
      return
    }

    setError(null)
    setState((previous) => ({ ...previous, isLoading: true }))

    try {
      const response = await directPayoutApi.sendOtp({
        beneficiaryName: state.formData.accountHolderName,
        accountNumber: state.formData.accountNumber,
        ifscCode: state.formData.ifscCode,
        bankName: state.formData.bankName,
        mobile: user?.mobile || '',
        email: user?.email || '',
        amount: amountNumber,
        paymentMode: state.formData.paymentMode || 'IMPS',
        remarks: state.formData.remarks || '',
      })

      if (response.success) {
        const remaining = response.data.remainingSeconds || 180
        setState((previous) => ({
          ...previous,
          currentStep: 'otp',
          isLoading: false,
          remainingSeconds: remaining,
          otpExpiryTime: Date.now() + remaining * 1000,
        }))
      } else {
        throw new Error(response.message || 'Failed to send OTP')
      }
    } catch (err: any) {
      setState((previous) => ({ ...previous, isLoading: false }))
      setError(err.message || 'Unable to send OTP. Please try again.')
    }
  }

  const resendOtp = async (): Promise<number> => {
    setError(null)
    try {
      const response = await directPayoutApi.sendOtp({
        beneficiaryName: state.formData.accountHolderName,
        accountNumber: state.formData.accountNumber,
        ifscCode: state.formData.ifscCode,
        bankName: state.formData.bankName,
        mobile: user?.mobile || '',
        email: user?.email || '',
        amount: amountNumber,
        paymentMode: state.formData.paymentMode || 'IMPS',
        remarks: state.formData.remarks || '',
      })

      if (response.success) {
        const newRemaining = response.data.remainingSeconds || 180
        setState((previous) => ({
          ...previous,
          remainingSeconds: newRemaining,
          otpExpiryTime: Date.now() + newRemaining * 1000,
        }))
        return newRemaining
      } else {
        throw new Error(response.message || 'Failed to resend OTP')
      }
    } catch (err: any) {
      setError(err.message || 'Unable to resend OTP. Please try again.')
      throw err
    }
  }

  const goBackToReview = () => {
    setError(null)
    setState((previous) => ({
      ...previous,
      currentStep: 'review',
      otp: '',
    }))
  }

  const verifyOtpAndCreatePayout = async (otp: string) => {
    if (otp.length !== 6) {
      throw new Error('Please enter the 6-digit OTP.')
    }

    setError(null)
    setState((previous) => ({ ...previous, isLoading: true }))

    try {
      // 1. Verify OTP
      const otpResponse = await otpApi.verifyOtp({
        email: user?.email || '',
        otp,
        moduleName: 'PAYOUT',
      })

      if (!otpResponse.success) {
        throw new Error(otpResponse.message || 'Invalid OTP')
      }

      // 2. Process Payout
      try {
        const payoutResponse = await directPayoutApi.processDirectPayout({
          beneficiaryName: state.formData.accountHolderName,
          accountNumber: state.formData.accountNumber,
          confirmAccountNumber: state.formData.confirmAccountNumber,
          bankName: state.formData.bankName,
          ifscCode: state.formData.ifscCode,
          amount: amountNumber,
          paymentMode: state.formData.paymentMode || 'IMPS',
          remarks: state.formData.remarks || '',
          email: user?.email || '',
          mobile: user?.mobile || '',
        })

        if (payoutResponse.status === 'SUCCESS' || payoutResponse.status === 'PENDING') {
          const result: DirectPayoutResultData = {
            status: (payoutResponse.status as any) || 'SUCCESS',
            payoutId: payoutResponse.transactionId || `DP-${Date.now()}`,
            message: payoutResponse.message || 'Your payout has been processed successfully.',
          }

          setState((previous) => ({
            ...previous,
            currentStep: 'result',
            isLoading: false,
            result,
          }))

          queryClient.invalidateQueries({ queryKey: ['wallet-balance'] })
          queryClient.invalidateQueries({ queryKey: ['direct-payouts'] })
        } else {
          throw new Error(payoutResponse.message || 'Payout processing failed')
        }
      } catch (payoutErr: any) {
        const result: DirectPayoutResultData = {
          status: 'FAILED',
          payoutId: '',
          message: payoutErr.message || 'We could not process this payout.',
          failureReason: payoutErr.message,
        }

        setState((previous) => ({
          ...previous,
          currentStep: 'result',
          isLoading: false,
          result,
        }))
      }
    } catch (otpErr: any) {
      setState((previous) => ({ ...previous, isLoading: false }))
      throw otpErr
    }
  }

  const resetPayout = () => {
    setError(null)
    setState(INITIAL_STATE)
  }

  return {
    state,
    error,
    walletBalance,
    amountNumber,
    totalDebit,
    charges: DIRECT_PAYOUT_CHARGES,
    updateFormData,
    goToReview,
    goBackToForm,
    sendOtp,
    resendOtp,
    goBackToReview,
    verifyOtpAndCreatePayout,
    resetPayout,
    setFormData: (data: DirectPayoutFormData) => setState(prev => ({...prev, formData: data}))
  }
}