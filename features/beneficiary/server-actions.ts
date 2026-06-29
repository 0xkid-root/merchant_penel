'use server'

import { ApiResponse, PaginatedResponse } from '@/lib/types'
import { BeneficiaryData, CreateBeneficiaryRequest, BeneficiaryListResponse } from './types'

// Get beneficiaries
export async function getBeneficiariesAction(
  page: number = 1,
  limit: number = 10
): Promise<ApiResponse<PaginatedResponse<BeneficiaryData>>> {
  try {
    await new Promise(resolve => setTimeout(resolve, 500))

    const mockBeneficiaries: BeneficiaryData[] = [
      {
        id: '1',
        name: 'Ravi Kumar',
        accountNumber: '1234567890',
        ifscCode: 'HDFC0000123',
        bankName: 'HDFC Bank',
        accountType: 'SAVINGS',
        isVerified: true,
        verificationMode: 'PENNY_DROP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Priya Singh',
        accountNumber: '9876543210',
        ifscCode: 'ICIC0000456',
        bankName: 'ICICI Bank',
        accountType: 'CURRENT',
        isVerified: true,
        verificationMode: 'PENNY_DROP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    return {
      success: true,
      data: {
        items: mockBeneficiaries,
        total: mockBeneficiaries.length,
        page,
        limit,
        totalPages: 1,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'BENEFICIARIES_FETCH_FAILED',
        message: 'Failed to fetch beneficiaries',
      },
    }
  }
}

// Create beneficiary
export async function createBeneficiaryAction(
  request: CreateBeneficiaryRequest
): Promise<ApiResponse<BeneficiaryData>> {
  try {
    // Validation
    if (!request.name || !request.accountNumber || !request.ifscCode) {
      return {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'All fields are required',
        },
      }
    }

    await new Promise(resolve => setTimeout(resolve, 1000))

    const newBeneficiary: BeneficiaryData = {
      id: 'BEN' + Date.now(),
      name: request.name,
      accountNumber: request.accountNumber,
      ifscCode: request.ifscCode,
      bankName: 'Bank Name',
      accountType: request.accountType,
      isVerified: false,
      verificationMode: 'PENNY_DROP',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return {
      success: true,
      data: newBeneficiary,
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'CREATE_BENEFICIARY_FAILED',
        message: 'Failed to create beneficiary',
      },
    }
  }
}

// Delete beneficiary
export async function deleteBeneficiaryAction(beneficiaryId: string): Promise<ApiResponse<any>> {
  try {
    if (!beneficiaryId) {
      return {
        success: false,
        error: {
          code: 'INVALID_ID',
          message: 'Beneficiary ID is required',
        },
      }
    }

    await new Promise(resolve => setTimeout(resolve, 500))

    return {
      success: true,
      data: {
        message: 'Beneficiary deleted successfully',
      },
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'DELETE_BENEFICIARY_FAILED',
        message: 'Failed to delete beneficiary',
      },
    }
  }
}
