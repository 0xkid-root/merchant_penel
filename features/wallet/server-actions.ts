'use server'

import { ApiResponse, PaginatedResponse } from '@/lib/types'
import { WalletData, WalletTransaction, AddFundsRequest } from './types'

// Get wallet data
export async function getWalletAction(): Promise<ApiResponse<WalletData>> {
  try {
    await new Promise(resolve => setTimeout(resolve, 500))

    const mockWallet: WalletData = {
      id: '1',
      balance: 14823500,
      availableBalance: 14823500,
      lockedBalance: 0,
      currency: 'INR',
      lastUpdated: new Date(),
    }

    return {
      success: true,
      data: mockWallet,
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'WALLET_FETCH_FAILED',
        message: 'Failed to fetch wallet data',
      },
    }
  }
}

// Get wallet transactions
export async function getWalletTransactionsAction(
  page: number = 1,
  limit: number = 10
): Promise<ApiResponse<PaginatedResponse<WalletTransaction>>> {
  try {
    await new Promise(resolve => setTimeout(resolve, 500))

    const mockTransactions: WalletTransaction[] = [
      {
        id: '1',
        type: 'CREDIT',
        amount: 100000,
        description: 'Bank Transfer',
        status: 'SUCCESS',
        createdAt: new Date(),
      },
      {
        id: '2',
        type: 'DEBIT',
        amount: 25000,
        description: 'Payout to beneficiary',
        status: 'SUCCESS',
        createdAt: new Date(Date.now() - 86400000),
      },
      {
        id: '3',
        type: 'HOLD',
        amount: 50000,
        description: 'Pending payout',
        status: 'PENDING',
        createdAt: new Date(Date.now() - 172800000),
      },
    ]

    return {
      success: true,
      data: {
        items: mockTransactions,
        total: mockTransactions.length,
        page,
        limit,
        totalPages: 1,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'TRANSACTIONS_FETCH_FAILED',
        message: 'Failed to fetch transactions',
      },
    }
  }
}

// Add funds
export async function addFundsAction(request: AddFundsRequest): Promise<ApiResponse<any>> {
  try {
    if (!request.amount || request.amount <= 0) {
      return {
        success: false,
        error: {
          code: 'INVALID_AMOUNT',
          message: 'Invalid amount',
        },
      }
    }

    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      success: true,
      data: {
        message: 'Funds added successfully',
        transactionId: 'TXN' + Date.now(),
        amount: request.amount,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'ADD_FUNDS_FAILED',
        message: 'Failed to add funds',
      },
    }
  }
}
