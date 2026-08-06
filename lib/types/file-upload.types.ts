/**
 * ============================================
 * File Upload Types
 * ============================================
 */

export interface FileUploadData {
    fileName: string
    originalFileName: string
    relativePath: string
}

export interface FileUploadResponse {
    success: boolean
    message: string
    data: FileUploadData
}

export interface FileUploadRequest {
    file: File
    folder: string
}
