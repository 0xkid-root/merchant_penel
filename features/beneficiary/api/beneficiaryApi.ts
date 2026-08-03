import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/endpoints'

import {
    BeneficiaryListResponse,
    BeneficiaryDetailsResponse,
    CreateBeneficiaryRequest,
    CreateBeneficiaryResponse,
    UpdateBeneficiaryRequest,
    UpdateBeneficiaryResponse,
    UpdateBeneficiaryStatusRequest,
    UpdateBeneficiaryStatusResponse,
    DeleteBeneficiaryResponse,
} from '../types/beneficiary.types'

export const beneficiaryApi = {
    /**
     * Create Beneficiary
     */
    createBeneficiary: async (
        payload: CreateBeneficiaryRequest
    ): Promise<CreateBeneficiaryResponse> => {
        const response = await apiClient.post<CreateBeneficiaryResponse>(
            API_ENDPOINTS.BENEFICIARIES.CREATE,
            payload
        )

        return response.data
    },

    /**
     * Get Beneficiary List
     */
    getBeneficiaries: async (
        page = 0,
        size = 10,
        search?: string,
        status?: string
    ): Promise<BeneficiaryListResponse> => {
        const response = await apiClient.get<BeneficiaryListResponse>(
            API_ENDPOINTS.BENEFICIARIES.GET_ALL,
            {
                params: {
                    page,
                    size,
                    ...(search && { search }),
                    ...(status && { status }),
                },
            }
        )

        return response.data
    },

    /**
     * Get Beneficiary Details
     */
    getBeneficiaryById: async (
        id: number
    ): Promise<BeneficiaryDetailsResponse> => {
        const response =
            await apiClient.get<BeneficiaryDetailsResponse>(
                API_ENDPOINTS.BENEFICIARIES.GET_BY_ID(id)
            )

        return response.data
    },

    /**
     * Update Beneficiary
     */
    updateBeneficiary: async (
        id: number,
        payload: UpdateBeneficiaryRequest
    ): Promise<UpdateBeneficiaryResponse> => {
        const response =
            await apiClient.put<UpdateBeneficiaryResponse>(
                API_ENDPOINTS.BENEFICIARIES.UPDATE(id),
                payload
            )

        return response.data
    },

    /**
     * Update Beneficiary Status
     */
    updateBeneficiaryStatus: async (
        id: number,
        payload: UpdateBeneficiaryStatusRequest
    ): Promise<UpdateBeneficiaryStatusResponse> => {
        const response =
            await apiClient.patch<UpdateBeneficiaryStatusResponse>(
                API_ENDPOINTS.BENEFICIARIES.UPDATE_STATUS(id),
                payload
            )

        return response.data
    },

    /**
     * Delete Beneficiary
     */
    deleteBeneficiary: async (
        id: number
    ): Promise<DeleteBeneficiaryResponse> => {
        const response =
            await apiClient.delete<DeleteBeneficiaryResponse>(
                API_ENDPOINTS.BENEFICIARIES.DELETE(id)
            )

        return response.data
    },
}