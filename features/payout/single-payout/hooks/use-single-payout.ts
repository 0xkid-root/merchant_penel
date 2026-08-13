'use client'

import { useMemo, useState } from 'react'

import {
    calculateSinglePayoutTotalDebit,
    getSinglePayoutBeneficiaryById,
    SINGLE_PAYOUT_CHARGES,
    SINGLE_PAYOUT_MAX_AMOUNT,
    SINGLE_PAYOUT_MIN_AMOUNT,
    SINGLE_PAYOUT_WALLET_BALANCE,
} from '../data/single-payout-data'

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
    remarks: '',
}

const INITIAL_STATE: SinglePayoutState = {
    currentStep: 'form',
    selectedBeneficiary: null,
    formData: INITIAL_FORM_DATA,
    otp: '',
    isLoading: false,
    result: null,
}

export function useSinglePayout() {
    const [state, setState] = useState<SinglePayoutState>(INITIAL_STATE)
    const [error, setError] = useState<string | null>(null)

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

    const selectBeneficiary = (beneficiaryId: number) => {
        const beneficiary = getSinglePayoutBeneficiaryById(beneficiaryId)

        setError(null)

        setState((previous) => ({
            ...previous,
            selectedBeneficiary: beneficiary ?? null,
            formData: {
                ...previous.formData,
                beneficiaryId,
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

        if (totalDebit > SINGLE_PAYOUT_WALLET_BALANCE) {
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
        setError(null)

        setState((previous) => ({
            ...previous,
            isLoading: true,
        }))

        try {
            // TODO: Replace this timeout with your backend send OTP API.
            await new Promise((resolve) => setTimeout(resolve, 800))

            setState((previous) => ({
                ...previous,
                currentStep: 'otp',
                isLoading: false,
            }))
        } catch {
            setState((previous) => ({
                ...previous,
                isLoading: false,
            }))

            setError('Unable to send OTP. Please try again.')
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
        if (otp.length !== 6) {
            setError('Please enter the 6-digit OTP.')
            return
        }

        setError(null)

        setState((previous) => ({
            ...previous,
            isLoading: true,
        }))

        try {
            // Later: send `otp` in your backend API request.
            await new Promise((resolve) => setTimeout(resolve, 1200))

            const result: SinglePayoutResult = {
                status: 'SUCCESS',
                payoutId: `SP-${Date.now()}`,
                message: 'Your payout has been processed successfully.',
            }

            setState((previous) => ({
                ...previous,
                currentStep: 'result',
                isLoading: false,
                result,
            }))
        } catch {
            const result: SinglePayoutResult = {
                status: 'FAILED',
                payoutId: '',
                message:
                    'We could not process this payout. Please check the details and try again.',
            }

            setState((previous) => ({
                ...previous,
                currentStep: 'result',
                isLoading: false,
                result,
            }))
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

        walletBalance: SINGLE_PAYOUT_WALLET_BALANCE,
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
        goBackToReview,
        verifyOtpAndCreatePayout,

        resetPayout,
        setCurrentStep,
    }
}