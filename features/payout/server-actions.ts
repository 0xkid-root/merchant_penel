'use server'

import { ApiResponse, PaginatedResponse } from '@/lib/types'
import { PayoutData, CreatePayoutRequest, PayoutListResponse } from './types'

// Get payouts
export async function getPayoutsAction(
  page: number = 1,
  limit: number = 10
): Promise<ApiResponse<PaginatedResponse<PayoutData>>> {
  try {
    await new Promise(resolve => setTimeout(resolve, 500))

    const mockPayouts: PayoutData[] = [
      {
        id: '1',
        beneficiaryId: '1',
        beneficiaryName: 'Ravi Kumar',
        accountNumber: '****4821',
        bankName: 'HDFC Bank',
        ifscCode: 'HDFC0000123',
        amount: 5200,
        status: 'SUCCESS',
        referenceId: '#TXN8821',
        createdAt: new Date(),
        updatedAt: new Date(),
        completedAt: new Date(),
      },
      {
        id: '2',
        beneficiaryId: '2',
        beneficiaryName: 'Priya Singh',
        accountNumber: '****9234',
        bankName: 'ICICI Bank',
        ifscCode: 'ICIC0000456',
        amount: 12000,
        status: 'PENDING',
        referenceId: '#TXN8820',
        createdAt: new Date(Date.now() - 3600000),
        updatedAt: new Date(Date.now() - 3600000),
      },
      {
        id: '3',
        beneficiaryId: '1',
        beneficiaryName: 'Ravi Kumar',
        accountNumber: '****4821',
        bankName: 'HDFC Bank',
        ifscCode: 'HDFC0000123',
        amount: 8500,
        status: 'FAILED',
        referenceId: '#TXN8819',
        failureReason: 'Insufficient funds',
        createdAt: new Date(Date.now() - 86400000),
        updatedAt: new Date(Date.now() - 86400000),
      },
    ]

    return {
      success: true,
      data: {
        items: mockPayouts,
        total: mockPayouts.length,
        page,
        limit,
        totalPages: 1,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'PAYOUTS_FETCH_FAILED',
        message: 'Failed to fetch payouts',
      },
    }
  }
}

// Create payout
export async function createPayoutAction(request: CreatePayoutRequest): Promise<ApiResponse<PayoutData>> {
  try {
    // Validation
    if (!request.beneficiaryId || !request.amount || request.amount <= 0) {
      return {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid beneficiary or amount',
        },
      }
    }

    await new Promise(resolve => setTimeout(resolve, 1500))

    const newPayout: PayoutData = {
      id: 'PAY' + Date.now(),
      beneficiaryId: request.beneficiaryId,
      beneficiaryName: 'Beneficiary Name',
      accountNumber: '****1234',
      bankName: 'Bank Name',
      ifscCode: 'BANK0001234',
      amount: request.amount,
      status: 'PROCESSING',
      referenceId: 'REF' + Date.now(),
      description: request.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return {
      success: true,
      data: newPayout,
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'CREATE_PAYOUT_FAILED',
        message: 'Failed to create payout',
      },
    }
  }
}

// Get payout details
export async function getPayoutDetailsAction(payoutId: string): Promise<ApiResponse<PayoutData>> {
  try {
    if (!payoutId) {
      return {
        success: false,
        error: {
          code: 'INVALID_ID',
          message: 'Payout ID is required',
        },
      }
    }

    await new Promise(resolve => setTimeout(resolve, 500))

    const payout: PayoutData = {
      id: payoutId,
      beneficiaryId: '1',
      beneficiaryName: 'Ravi Kumar',
      accountNumber: '****4821',
      bankName: 'HDFC Bank',
      ifscCode: 'HDFC0000123',
      amount: 5200,
      status: 'SUCCESS',
      referenceId: '#TXN8821',
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: new Date(),
    }

    return {
      success: true,
      data: payout,
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'PAYOUT_FETCH_FAILED',
        message: 'Failed to fetch payout',
      },
    }
  }
}
