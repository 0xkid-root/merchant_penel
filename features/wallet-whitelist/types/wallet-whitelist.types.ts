/**
 * ============================================
 * Create Wallet Whitelist
 * POST /api/v1/wallet-whitelist
 * ============================================
 */

export interface CreateWalletWhitelistRequest {
    verificationId: string
    walletHolderName: string
    bankName: string
    accountType: string
    documentPath: string
    documentType: WalletWhitelistDocumentType
}


/**
 * ============================================
 * Wallet Whitelist Status
 * ============================================
 */

export type WalletWhitelistStatus =
    | 'PENDING'
    | 'APPROVED'
    | 'REJECTED'
    | 'DELETED'

/**
 * ============================================
 * Wallet Whitelist Rejection Reason
 * ============================================
 */

export type WalletWhitelistRejectionReason =
    | 'KYC_INCOMPLETE'
    | 'DUPLICATE_REQUEST'
    | 'COMPLIANCE_FAILED'
    | 'RISK_CHECK_FAILED'
    | 'ACCOUNT_UNDER_REVIEW'
    | 'BUSINESS_POLICY'
    | 'ADDITIONAL_VERIFICATION_REQUIRED'
    | 'ADMIN_REJECTED'
    | 'OTHER'

/**
 * ============================================
 * Wallet Whitelist Response
 * ============================================
 */

export type WalletWhitelistDocumentType =
    | 'PASSBOOK'
    | 'CANCELLED_CHEQUE'

export interface WalletWhitelistResponse {
    id: number

    merchantId: number

    merchantName: string

    walletHolderName: string

    accountNumber: string

    ifscCode: string

    bankName: string

    accountType: string

    bankVerified: boolean

    verifiedAccountName: string

    status: WalletWhitelistStatus

    reviewedBy: number | null

    reviewedAt: string | null

    rejectionReason: WalletWhitelistRejectionReason | null

    customRejectionReason: string | null

    documentPath: string

    documentType: WalletWhitelistDocumentType

    documentPreviewUrl: string
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
 * Wallet Whitelist List Response
 * ============================================
 */

export type WalletWhitelistListResponse =
    ApiResponse<PageableResponse<WalletWhitelistResponse>>

/**
 * ============================================
 * Wallet Whitelist Details Response
 * ============================================
 */

export type WalletWhitelistDetailsResponse =
    ApiResponse<WalletWhitelistResponse>

/**
 * ============================================
 * Create Wallet Whitelist Response
 * ============================================
 */

export type CreateWalletWhitelistResponse =
    ApiResponse<WalletWhitelistResponse>


/**
 * ============================================
 * Delete Wallet Whitelist Response
 * ============================================
 */

export type DeleteWalletWhitelistResponse =
    ApiResponse<null>
