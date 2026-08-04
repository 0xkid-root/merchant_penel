/**
 * ============================================
 * Create Beneficiary
 * POST /api/v1/beneficiaries
 * ============================================
 */

export interface CreateBeneficiaryRequest {
    verificationId: string
    beneficiaryName: string
    bankName: string
    accountType: string
    mobile: string
    email: string
}

/**
 * ============================================
 * Update Beneficiary
 * PUT /api/v1/beneficiaries/{id}
 * ============================================
 */

export interface UpdateBeneficiaryRequest {
    beneficiaryName?: string

    mobile?: string

    email?: string
}

/**
 * ============================================
 * Update Beneficiary Status
 * PATCH /api/v1/beneficiaries/{id}/status
 * ============================================
 */

export interface UpdateBeneficiaryStatusRequest {
    status: BeneficiaryStatus
}

/**
 * ============================================
 * Beneficiary Status
 * ============================================
 */

export type BeneficiaryStatus =
    | 'ACTIVE'
    | 'INACTIVE'
    | 'DELETED'

/**
 * ============================================
 * Beneficiary Response
 * ============================================
 */

export interface BeneficiaryResponse {
    id: number

    merchantId: number

    merchantName: string

    beneficiaryName: string

    accountNumber: string

    ifscCode: string

    bankName: string

    accountType: string

    mobile: string

    email: string

    status: BeneficiaryStatus

    bankVerified: boolean

    verifiedAccountName: string
}

/**
 * ============================================
 * Generic API Response
 * ============================================
 */

export interface ApiResponse<T> {
    success: boolean

    message: string

    data: T
}

/**
 * ============================================
 * Spring Page Response
 * ============================================
 */

export interface PageableResponse<T> {
    content: T[]

    totalElements: number

    totalPages: number

    size: number

    number: number

    first: boolean

    last: boolean

    empty: boolean
}

/**
 * ============================================
 * Beneficiary List Response
 * ============================================
 */

export type BeneficiaryListResponse =
    ApiResponse<PageableResponse<BeneficiaryResponse>>

/**
 * ============================================
 * Beneficiary Details Response
 * ============================================
 */

export type BeneficiaryDetailsResponse =
    ApiResponse<BeneficiaryResponse>

/**
 * ============================================
 * Create Beneficiary Response
 * ============================================
 */

export type CreateBeneficiaryResponse =
    ApiResponse<BeneficiaryResponse>

/**
 * ============================================
 * Update Beneficiary Response
 * ============================================
 */

export type UpdateBeneficiaryResponse =
    ApiResponse<BeneficiaryResponse>

/**
 * ============================================
 * Delete Response
 * ============================================
 */

export type DeleteBeneficiaryResponse =
    ApiResponse<null>

/**
 * ============================================
 * Status Update Response
 * ============================================
 */

export type UpdateBeneficiaryStatusResponse =
    ApiResponse<null>