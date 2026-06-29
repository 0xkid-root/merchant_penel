'use client'

import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { getWalletAction, getWalletTransactionsAction, addFundsAction } from '../server-actions'
import { WalletData, WalletTransaction, AddFundsRequest, WalletState } from '../types'
import { PaginatedResponse } from '@/lib/types'

const INITIAL_STATE: WalletState = {
  wallet: null,
  transactions: [],
  isLoading: false,
  error: null,
}

export function useWallet() {
  const [state, setState] = useState<WalletState>(INITIAL_STATE)

  const fetchWallet = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await getWalletAction()

      if (!response.success) {
        const errorMsg = response.error?.message || 'Failed to fetch wallet'
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMsg,
        }))
        toast.error(errorMsg)
        return
      }

      setState(prev => ({
        ...prev,
        wallet: response.data,
        isLoading: false,
      }))
    } catch (error) {
      const errorMsg = 'An unexpected error occurred'
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMsg,
      }))
      toast.error(errorMsg)
    }
  }, [])

  const fetchTransactions = useCallback(async (page: number = 1, limit: number = 10) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await getWalletTransactionsAction(page, limit)

      if (!response.success) {
        const errorMsg = response.error?.message || 'Failed to fetch transactions'
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMsg,
        }))
        toast.error(errorMsg)
        return
      }

      setState(prev => ({
        ...prev,
        transactions: response.data?.items || [],
        isLoading: false,
      }))
    } catch (error) {
      const errorMsg = 'An unexpected error occurred'
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMsg,
      }))
      toast.error(errorMsg)
    }
  }, [])

  const addFunds = useCallback(async (request: AddFundsRequest) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await addFundsAction(request)

      if (!response.success) {
        const errorMsg = response.error?.message || 'Failed to add funds'
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMsg,
        }))
        toast.error(errorMsg)
        return
      }

      setState(prev => ({
        ...prev,
        isLoading: false,
      }))
      toast.success('Funds added successfully')
      
      // Refresh wallet data
      await fetchWallet()
    } catch (error) {
      const errorMsg = 'An unexpected error occurred'
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMsg,
      }))
      toast.error(errorMsg)
    }
  }, [fetchWallet])

  return {
    ...state,
    fetchWallet,
    fetchTransactions,
    addFunds,
  }
}
