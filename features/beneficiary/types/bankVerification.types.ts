/**
 * Request sent to
 * POST /api/v1/bank-verification/verify
 */
export interface VerifyBankRequest {
    accountNumber: string
    ifsc: string
}

/**
 * Response returned inside ApiResponse.data
 */
export interface VerifyBankResponse {
    bankTxnStatus: boolean

    accountNumber: string

    ifsc: string

    accountName: string

    bankResponse: string

    requestId: string

    statusCode: string

    verificationId: string

    expiresAt: string
}

/**
 * Generic backend response
 */
export interface VerifyBankApiResponse {
    success: boolean

    message: string

    data: VerifyBankResponse
}