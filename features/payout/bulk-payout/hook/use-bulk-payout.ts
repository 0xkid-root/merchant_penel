import { useState, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { useWalletBalance } from '@/features/wallet/hooks/useWalletBalance'
import { useAuthStore } from '@/lib/store/authStore'
import { useVerifyOtp } from '../../hooks/useVerifyOtp'

import { useBulkPayoutPreview } from './useBulkPayoutPreview'
import { useBulkPayoutSendOtp } from './useBulkPayoutSendOtp'
import { useProcessBulkPayout } from './useProcessBulkPayout'

import type {
  BulkPayoutState,
  BulkPayoutResultData,
} from '../types/bulk-payout.types'
import { INITIAL_BULK_PAYOUT_STATE } from '../types/bulk-payout.types'

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

export function useBulkPayout() {
  const queryClient = useQueryClient()
  const user = useAuthStore((s) => s.user)

  const [state, setState] = useState<BulkPayoutState>(INITIAL_BULK_PAYOUT_STATE)
  const [error, setError] = useState<string | null>(null)

  const { data: walletBalance = 0 } = useWalletBalance()

  const { mutateAsync: previewMutation } = useBulkPayoutPreview()
  const { mutateAsync: sendOtpMutation } = useBulkPayoutSendOtp()
  const { mutateAsync: verifyOtpMutation } = useVerifyOtp()
  const { mutateAsync: processPayoutMutation } = useProcessBulkPayout()

  const handleUpload = async (file: File) => {
    if (state.isLoading) return

    setError(null)
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      const previewRes = await previewMutation(file)
      
      setState((prev) => ({
        ...prev,
        file,
        preview: previewRes,
        currentStep: 'validation',
        isLoading: false,
      }))
    } catch (err: unknown) {
      setState((prev) => ({ ...prev, isLoading: false }))
      setError(extractApiError(err))
    }
  }

  const goBackToUpload = () => {
    setError(null)
    setState((prev) => ({
      ...prev,
      currentStep: 'upload',
      file: null,
      preview: null,
    }))
  }

  const goToReview = () => {
    if (!state.preview) return

    if (state.preview.totalAmount > walletBalance) {
      setError('Insufficient wallet balance to process this bulk payout.')
      return
    }

    setError(null)
    setState((prev) => ({ ...prev, currentStep: 'review' }))
  }

  const goBackToValidation = () => {
    setError(null)
    setState((prev) => ({ ...prev, currentStep: 'validation' }))
  }

  const sendOtp = async () => {
    if (state.isLoading) return
    if (!state.preview) {
      setError('Missing payout summary data.')
      return
    }
    
    // If timer is still active, don't resend, just move to OTP step
    if (state.otpExpiryTime && Date.now() < state.otpExpiryTime) {
      setState((prev) => ({ ...prev, currentStep: 'otp' }))
      return
    }

    if (!user?.email) {
      setError('Authenticated user email is missing.')
      return
    }

    setError(null)
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      const response = await sendOtpMutation({
        email: user.email,
        totalAmount: state.preview.totalAmount,
        totalTransactions: state.preview.totalTransactions,
        totalBeneficiaries: state.preview.totalBeneficiaries,
      })

      if (response.success) {
        const remaining = response.data?.remainingSeconds ?? FALLBACK_RESEND_SECONDS
        setState((prev) => ({
          ...prev,
          currentStep: 'otp',
          isLoading: false,
          remainingSeconds: remaining,
          otpExpiryTime: Date.now() + remaining * 1000,
          otp: '',
        }))
      } else {
        throw new Error(response.message || 'Failed to send OTP')
      }
    } catch (err: unknown) {
      setState((prev) => ({ ...prev, isLoading: false }))
      setError(extractApiError(err))
    }
  }

  const resendOtp = async (): Promise<number> => {
    if (state.isLoading) return 0
    if (state.otpExpiryTime && Date.now() < state.otpExpiryTime) {
      return state.remainingSeconds
    }

    if (!user?.email || !state.preview) {
      const msg = 'Missing required information to send OTP.'
      setError(msg)
      throw new Error(msg)
    }

    setError(null)
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      const response = await sendOtpMutation({
        email: user.email,
        totalAmount: state.preview.totalAmount,
        totalTransactions: state.preview.totalTransactions,
        totalBeneficiaries: state.preview.totalBeneficiaries,
      })

      if (response.success) {
        const newRemaining = response.data?.remainingSeconds ?? FALLBACK_RESEND_SECONDS
        setState((prev) => ({
          ...prev,
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
      setState((prev) => ({ ...prev, isLoading: false }))
      const extractedError = extractApiError(err)
      setError(extractedError)
      throw new Error(extractedError)
    }
  }

  const goBackToReview = () => {
    setError(null)
    setState((prev) => ({ ...prev, currentStep: 'review', otp: '' }))
  }

  const verifyOtpAndCreatePayout = async (otpValue: string) => {
    if (state.isLoading) return

    if (!/^\d{6}$/.test(otpValue)) {
      const msg = 'Please enter a valid 6-digit numeric OTP.'
      setError(msg)
      throw new Error(msg)
    }

    if (!user?.email || !state.file) {
      const msg = 'Missing required information to process payout.'
      setError(msg)
      throw new Error(msg)
    }

    setError(null)
    setState((prev) => ({ ...prev, isLoading: true, otp: otpValue }))

    // 1. Verify OTP
    let otpResponse
    try {
      otpResponse = await verifyOtpMutation({
        email: user.email,
        otp: otpValue,
        moduleName: 'PAYOUT',
      })
    } catch (err: unknown) {
      setState((prev) => ({ ...prev, isLoading: false }))
      const extracted = extractApiError(err)
      setError(extracted)
      throw new Error(extracted)
    }

    if (!otpResponse.success || otpResponse.data !== true) {
      setState((prev) => ({ ...prev, isLoading: false }))
      const msg = otpResponse.message || 'Invalid OTP'
      setError(msg)
      throw new Error(msg)
    }

    // 2. Process Payout
    try {
      const processRes = await processPayoutMutation({
        file: state.file,
        makerRemark: state.makerRemark,
      })

      const result: BulkPayoutResultData = {
        status: processRes.status,
        bulkPayoutId: processRes.bulkPayoutId,
        bulkReferenceId: processRes.bulkReferenceId,
        totalTransactions: processRes.totalTransactions,
        message: processRes.message || 'Your bulk payout has been processed.',
      }

      setState((prev) => ({
        ...prev,
        currentStep: 'result',
        isLoading: false,
        result,
        otpExpiryTime: null,
        remainingSeconds: 0,
      }))

      queryClient.invalidateQueries({ queryKey: ['wallet-balance'] })
      queryClient.invalidateQueries({ queryKey: ['bulk-payouts'] })

    } catch (err: unknown) {
      const extractedMsg = extractApiError(err)

      setState((prev) => ({
        ...prev,
        isLoading: false,
        result: {
          status: 'FAILED',
          bulkPayoutId: null,
          bulkReferenceId: '',
          totalTransactions: 0,
          message: 'We could not process this bulk payout.',
          failureReason: extractedMsg,
        },
        currentStep: 'result',
      }))
    }
  }

  const resetPayout = () => {
    setError(null)
    setState(INITIAL_BULK_PAYOUT_STATE)
  }

  // Timer Effect
  useEffect(() => {
    if (!state.otpExpiryTime) return

    const tick = () => {
      const remaining = Math.max(
        0,
        Math.ceil((state.otpExpiryTime! - Date.now()) / 1000)
      )
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
    handleUpload,
    goBackToUpload,
    goToReview,
    goBackToValidation,
    sendOtp,
    resendOtp,
    goBackToReview,
    verifyOtpAndCreatePayout,
    resetPayout,
  }
}
