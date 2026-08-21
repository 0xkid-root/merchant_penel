'use client'

import { useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { singlePayoutApi } from '../api/singlePayoutApi'
import { otpApi } from '../../api/otpApi'

import {
    calculateSinglePayoutTotalDebit,
    SINGLE_PAYOUT_CHARGES,
    SINGLE_PAYOUT_MAX_AMOUNT,
    SINGLE_PAYOUT_MIN_AMOUNT,
} from '../utils/single-payout-utils'

import { useWalletBalance } from '@/features/wallet/hooks/useWalletBalance'
import { useAuthStore } from '@/lib/store/authStore'

import type {
    SinglePayoutFormData,
    SinglePayoutResult,
    SinglePayoutState,
    SinglePayoutStep,
} from '../types/single-payout.types'
import { StringifyOptions } from 'querystring'

const INITIAL_FORM_DATA: SinglePayoutFormData = {
    beneficiaryId: null,
    amount: '',
    paymentMode: 'IMPS',
    remarks: '',
}

const INITIAL_STATE: SinglePayoutState = {
    currentStep: 'form',
    selectedBeneficiary: null,
    formData: INITIAL_FORM_DATA,
    otp: '',
    isLoading: false,
    result: null,
    remainingSeconds: 0,
}

export function useSinglePayout() {
    const queryClient = useQueryClient()
    const user = useAuthStore((s) => s.user)
    const [state, setState] = useState<SinglePayoutState>(INITIAL_STATE)
    const [error, setError] = useState<string | null>(null)

    const { data: walletBalance = 0 } = useWalletBalance()

    const amountNumber = Number(state.formData.amount || 0)

    const totalDebit = useMemo(() => {
        return calculateSinglePayoutTotalDebit(amountNumber)
    }, [amountNumber])

    const updateFormData = (
        field: keyof SinglePayoutFormData,
        value: string | number | null,
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

    const selectBeneficiary = (beneficiary: any | null) => {
        setError(null)

        setState((previous) => ({
            ...previous,
            selectedBeneficiary: beneficiary,
            formData: {
                ...previous.formData,
                beneficiaryId: beneficiary?.id ?? null,
            },
        }))
    }

    const validatePayoutForm = () => {
        if (!state.formData.beneficiaryId || !state.selectedBeneficiary) {
            setError('Please select a beneficiary.')
            return false
        }

        if (!state.formData.amount || amountNumber <= 0) {
            setError('Please enter a valid payout amount.')
            return false
        }

        if (amountNumber < SINGLE_PAYOUT_MIN_AMOUNT) {
            setError(
                `Minimum payout amount is ₹${SINGLE_PAYOUT_MIN_AMOUNT.toLocaleString(
                    'en-IN',
                )}.`,
            )
            return false
        }

        if (amountNumber > SINGLE_PAYOUT_MAX_AMOUNT) {
            setError(
                `Maximum payout amount is ₹${SINGLE_PAYOUT_MAX_AMOUNT.toLocaleString(
                    'en-IN',
                )}.`,
            )
            return false
        }

        if (totalDebit > walletBalance) {
            setError('Insufficient wallet balance for this payout.')
            return false
        }

        return true
    }

    const goToReview = () => {
        if (!validatePayoutForm()) {
            return
        }

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
        if (!state.formData.beneficiaryId) return

        setError(null)
        setState((previous) => ({
            ...previous,
            isLoading: true,
        }))

        try {
            const response = await singlePayoutApi.sendOtp({
                beneficiaryId: state.formData.beneficiaryId,
                amount: amountNumber,
                paymentMode: state.formData.paymentMode || 'IMPS',
                remarks: state.formData.remarks || '',
                email: user?.email || '',
            })

            if (response.success) {
                setState((previous) => ({
                    ...previous,
                    currentStep: 'otp',
                    isLoading: false,
                    remainingSeconds: response.data.remainingSeconds || 180,
                }))
            } else {
                throw new Error(response.message || 'Failed to send OTP')
            }
        } catch (err: any) {
            setState((previous) => ({
                ...previous,
                isLoading: false,
            }))
            setError(err.message || 'Unable to send OTP. Please try again.')
        }
    }

    const resendOtp = async (): Promise<number> => {
        if (!state.formData.beneficiaryId) throw new Error('No beneficiary selected')

        setError(null)
        try {
            const response = await singlePayoutApi.sendOtp({
                beneficiaryId: state.formData.beneficiaryId,
                amount: amountNumber,
                paymentMode: state.formData.paymentMode || 'IMPS',
                remarks: state.formData.remarks || '',
                email: user?.email || '',
            })

            if (response.success) {
                const newRemaining = response.data.remainingSeconds || 180
                setState((previous) => ({
                    ...previous,
                    remainingSeconds: newRemaining,
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

    const updateOtp = (otp: string) => {
        setError(null)

        setState((previous) => ({
            ...previous,
            otp,
        }))
    }

    const verifyOtpAndCreatePayout = async (otp: string) => {
        if (!state.formData.beneficiaryId) {
            throw new Error('No beneficiary selected')
        }

        if (otp.length !== 6) {
            throw new Error('Please enter the 6-digit OTP.')
        }

        setError(null)
        setState((previous) => ({
            ...previous,
            isLoading: true,
        }))

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

            // 2. Process Payout (Since OTP succeeded)
            try {
                const payoutResponse = await singlePayoutApi.processSinglePayout({
                    beneficiaryId: state.formData.beneficiaryId,
                    amount: amountNumber,
                    paymentMode: state.formData.paymentMode || 'IMPS',
                    remarks: state.formData.remarks || '',
                })

                if (payoutResponse.status === 'SUCCESS' || payoutResponse.status === 'PENDING') {
                    const result: SinglePayoutResult = {
                        status: (payoutResponse.status as any) || 'SUCCESS',
                        payoutId: payoutResponse.transactionId || `SP-${Date.now()}`,
                        message: payoutResponse.message || 'Your payout has been processed successfully.',
                    }

                    setState((previous) => ({
                        ...previous,
                        currentStep: 'result',
                        isLoading: false,
                        result,
                    }))

                    // Invalidate queries to refresh wallet balance and recent payouts list in the UI
                    queryClient.invalidateQueries({ queryKey: ['wallet-balance'] })
                    queryClient.invalidateQueries({ queryKey: ['single-payouts'] })
                } else {
                    throw new Error(payoutResponse.message || 'Payout processing failed')
                }
            } catch (payoutErr: any) {
                // OTP was correct, but payout failed -> Go to result screen with FAILED status
                const result: SinglePayoutResult = {
                    status: 'FAILED',
                    payoutId: '',
                    message: payoutErr.message || 'We could not process this payout. Please check the details and try again.',
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
            // OTP verification failed -> Throw to let UI show toast and keep user on OTP screen
            setState((previous) => ({
                ...previous,
                isLoading: false,
            }))
            throw otpErr
        }
    }
    const resetPayout = () => {
        setError(null)
        setState(INITIAL_STATE)
    }

    const setCurrentStep = (step: SinglePayoutStep) => {
        setError(null)

        setState((previous) => ({
            ...previous,
            currentStep: step,
        }))
    }

    return {
        state,
        error,

        walletBalance,
        minAmount: SINGLE_PAYOUT_MIN_AMOUNT,
        maxAmount: SINGLE_PAYOUT_MAX_AMOUNT,
        charges: SINGLE_PAYOUT_CHARGES,
        amountNumber,
        totalDebit,

        updateFormData,
        selectBeneficiary,
        updateOtp,

        goToReview,
        goBackToForm,

        sendOtp,
        resendOtp,
        goBackToReview,
        verifyOtpAndCreatePayout,

        resetPayout,
        setCurrentStep,
    }
}