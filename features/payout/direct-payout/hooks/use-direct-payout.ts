'use client'

import { useMemo, useState, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useVerifyOtp } from '../../hooks/useVerifyOtp'
import { useProcessDirectPayout } from './useProcessDirectPayout'
import { useDirectPayoutSendOtp } from './useDirectPayoutSendOtp'

import { formatCurrency } from '@/lib/utils/formatCurrency'
import { useWalletBalance } from '@/features/wallet/hooks/useWalletBalance'
import { useAuthStore } from '@/lib/store/authStore'

import {
  DirectPayoutFormData,
  DirectPayoutResultData,
  DirectPayoutState,
  DirectPayoutStatus,
  DirectPayoutPaymentMode,
  INITIAL_FORM_DATA,
  INITIAL_STATE,
} from '../types/direct-payout.types'

const DIRECT_PAYOUT_CHARGES = 0 
const DIRECT_PAYOUT_MIN_AMOUNT = 1
const DIRECT_PAYOUT_MAX_AMOUNT = 1000000
const FALLBACK_RESEND_SECONDS = 180

function extractApiError(error: unknown): string {
  if (isAxiosError(error)) {
    const message = error.response?.data?.message
    if (typeof message === 'string' && message.trim()) {
      return message
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message
  }

  return 'An unexpected error occurred. Please try again.'
}

function normalizePayoutStatus(value: unknown): DirectPayoutStatus {
  const normalized = String(value ?? '').trim().toUpperCase()
  if (normalized === 'SUCCESS') return 'SUCCESS'
  if (normalized === 'FAILED') return 'FAILED'
  if (normalized === 'PENDING') return 'PENDING'
  return 'PENDING' // Safe fallback
}

export function useDirectPayout() {
  const queryClient = useQueryClient()
  const user = useAuthStore((s) => s.user)
  const [state, setState] = useState<DirectPayoutState>(INITIAL_STATE)
  const [error, setError] = useState<string | null>(null)

  const { mutateAsync: verifyOtpMutation } = useVerifyOtp()
  const { mutateAsync: processDirectPayoutMutation } = useProcessDirectPayout()
  const { mutateAsync: sendOtpMutation } = useDirectPayoutSendOtp()

  const { data: walletBalance = 0 } = useWalletBalance()

  const amountNumber = Number(state.formData.amount)
  const isAmountValid = Number.isFinite(amountNumber) && amountNumber > 0

  const totalDebit = useMemo(() => {
    return isAmountValid ? amountNumber + DIRECT_PAYOUT_CHARGES : 0
  }, [amountNumber, isAmountValid])

  const goToReview = (data: DirectPayoutFormData) => {
    const amountString = data.amount.trim()
    const currentAmount = Number(amountString)

    if (!Number.isFinite(currentAmount) || currentAmount <= 0 || !/^\d+(\.\d{1,2})?$/.test(amountString)) {
      setError('Please enter a valid positive payout amount.')
      return
    }

    const currentTotalDebit = currentAmount + DIRECT_PAYOUT_CHARGES

    if (currentAmount < DIRECT_PAYOUT_MIN_AMOUNT) {
      setError(`Minimum payout amount is ₹${DIRECT_PAYOUT_MIN_AMOUNT.toLocaleString('en-IN')}.`)
      return
    }

    if (currentAmount > DIRECT_PAYOUT_MAX_AMOUNT) {
      setError(`Maximum payout amount is ${formatCurrency(DIRECT_PAYOUT_MAX_AMOUNT)}.`)
      return
    }

    if (currentTotalDebit > walletBalance) {
      setError(
        `Insufficient wallet balance. You need ${formatCurrency(currentTotalDebit - walletBalance)} more.`,
      )
      return
    }

    setError(null)
    setState((previous) => ({
      ...previous,
      formData: data,
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
    if (state.isLoading) return

    // If timer is still active, don't resend, just move to OTP step
    if (state.otpExpiryTime && Date.now() < state.otpExpiryTime) {
      setState((previous) => ({ ...previous, currentStep: 'otp' }))
      return
    }

    if (!user?.email) {
      setError('Authenticated user email is missing.')
      return
    }

    setError(null)
    setState((previous) => ({ ...previous, isLoading: true }))

    try {
      const response = await sendOtpMutation({
        beneficiaryName: state.formData.accountHolderName,
        accountNumber: state.formData.accountNumber,
        ifscCode: state.formData.ifscCode,
        bankName: state.formData.bankName,
        mobile: state.formData.mobile,
        email: user.email,
        amount: amountNumber,
        paymentMode: (state.formData.paymentMode || 'IMPS') as DirectPayoutPaymentMode,
        remarks: state.formData.remarks || undefined,
      })

      if (response.success) {
        const remaining = response.data?.remainingSeconds ?? FALLBACK_RESEND_SECONDS
        setState((previous) => ({
          ...previous,
          currentStep: 'otp',
          isLoading: false,
          remainingSeconds: remaining,
          otpExpiryTime: Date.now() + remaining * 1000,
          otp: '', // clear old OTP
        }))
      } else {
        throw new Error(response.message || 'Failed to send OTP')
      }
    } catch (err: unknown) {
      setState((previous) => ({ ...previous, isLoading: false }))
      setError(extractApiError(err))
    }
  }

  const resendOtp = async (): Promise<number> => {
    if (state.isLoading) return 0
    if (state.otpExpiryTime && Date.now() < state.otpExpiryTime) {
      return state.remainingSeconds
    }

    if (!user?.email) {
      const msg = 'Authenticated user email is missing.'
      setError(msg)
      throw new Error(msg)
    }

    setError(null)
    setState((previous) => ({ ...previous, isLoading: true }))

    try {
      const response = await sendOtpMutation({
        beneficiaryName: state.formData.accountHolderName,
        accountNumber: state.formData.accountNumber,
        ifscCode: state.formData.ifscCode,
        bankName: state.formData.bankName,
        mobile: state.formData.mobile,
        email: user.email,
        amount: amountNumber,
        paymentMode: (state.formData.paymentMode || 'IMPS') as DirectPayoutPaymentMode,
        remarks: state.formData.remarks || undefined,
      })

      if (response.success) {
        const newRemaining = response.data?.remainingSeconds ?? FALLBACK_RESEND_SECONDS
        setState((previous) => ({
          ...previous,
          isLoading: false,
          remainingSeconds: newRemaining,
          otpExpiryTime: Date.now() + newRemaining * 1000,
          otp: '',
        }))
        return newRemaining
      } else {
        throw new Error(response.message || 'Failed to resend OTP')
      }
    } catch (err: unknown) {
      setState((previous) => ({ ...previous, isLoading: false }))
      const extractedError = extractApiError(err)
      setError(extractedError)
      throw new Error(extractedError)
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
    if (state.isLoading) return

    if (!/^\d{6}$/.test(otp)) {
      const msg = 'Please enter a valid 6-digit numeric OTP.'
      setError(msg)
      throw new Error(msg)
    }

    if (!user?.email) {
      const msg = 'Authenticated user email is missing.'
      setError(msg)
      throw new Error(msg)
    }

    // Capture form data before async operations
    const currentFormData = state.formData
    const payoutAmount = Number(currentFormData.amount)

    setError(null)
    setState((previous) => ({ ...previous, isLoading: true, otp }))

    let otpResponse
    try {
      otpResponse = await verifyOtpMutation({
        email: user.email,
        otp,
        moduleName: 'PAYOUT',
      })
    } catch (error) {
      setState((previous) => ({
        ...previous,
        isLoading: false,
      }))
      const extracted = extractApiError(error)
      setError(extracted)
      throw new Error(extracted)
    }

    if (!otpResponse.success || otpResponse.data !== true) {
      setState((previous) => ({
        ...previous,
        isLoading: false,
      }))
      const msg = otpResponse.message || 'Invalid OTP'
      setError(msg)
      throw new Error(msg)
    }

    try {

      // 2. Process Payout
      const payoutResponse = await processDirectPayoutMutation({
        beneficiaryName: currentFormData.accountHolderName,
        mobile: currentFormData.mobile,
        email: user.email,
        accountNumber: currentFormData.accountNumber,
        confirmAccountNumber: currentFormData.confirmAccountNumber,
        bankName: currentFormData.bankName,
        ifscCode: currentFormData.ifscCode,
        amount: payoutAmount,
        paymentMode: (currentFormData.paymentMode || 'IMPS') as DirectPayoutPaymentMode,
        remarks: currentFormData.remarks || undefined,
      })

      const normalizedStatus = normalizePayoutStatus(payoutResponse.status)

      const result: DirectPayoutResultData = {
        status: normalizedStatus,
        payoutId: payoutResponse.transactionId || `DP-${Date.now()}`,
        message: payoutResponse.message || 'Your payout has been processed.',
      }

      setState((previous) => ({
        ...previous,
        currentStep: 'result',
        isLoading: false,
        result,
        otpExpiryTime: null,
        remainingSeconds: 0
      }))

      queryClient.invalidateQueries({ queryKey: ['wallet-balance'] })
      queryClient.invalidateQueries({ queryKey: ['direct-payouts'] })
      
    } catch (err: unknown) {
      const extractedMsg = extractApiError(err)
      
      setState((previous) => ({
        ...previous, 
        isLoading: false,
        result: {
          status: 'FAILED',
          payoutId: '',
          message: 'We could not process this payout.',
          failureReason: extractedMsg,
        },
        currentStep: 'result'
      }))
    }
  }

  const resetPayout = () => {
    setError(null)
    setState({
      currentStep: 'form',
      formData: { ...INITIAL_FORM_DATA },
      otp: '',
      isLoading: false,
      result: null,
      remainingSeconds: 0,
      otpExpiryTime: null,
    })
  }

  // Timer Effect
  useEffect(() => {
    if (!state.otpExpiryTime) return

    const tick = () => {
      const remaining = Math.max(0, Math.ceil((state.otpExpiryTime! - Date.now()) / 1000))
      setState((prev) => {
        if (prev.remainingSeconds === remaining) return prev
        return { ...prev, remainingSeconds: remaining }
      })
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [state.otpExpiryTime])

  return {
    state,
    error,
    walletBalance,
    amountNumber,
    totalDebit,
    charges: DIRECT_PAYOUT_CHARGES,
    goToReview,
    goBackToForm,
    sendOtp,
    resendOtp,
    goBackToReview,
    verifyOtpAndCreatePayout,
    resetPayout,
  }
}