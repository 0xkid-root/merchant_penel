'use server'

import { LoginCredentials, ForgotPasswordData, ResetPasswordData } from './types'
import { ApiResponse } from '@/lib/types'

// Mock authentication - replace with real API calls
export async function loginAction(credentials: LoginCredentials): Promise<ApiResponse<any>> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Validate input
    if (!credentials.email || !credentials.password) {
      return {
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: 'Email and password are required',
        },
      }
    }

    // Mock successful login
    const user = {
      id: '1',
      email: credentials.email,
      businessName: 'Demo Pvt. Ltd.',
      businessType: 'Private Limited Company',
      phone: '+919876543210',
    }

    return {
      success: true,
      data: {
        user,
        token: 'mock_jwt_token_' + Date.now(),
      },
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'LOGIN_FAILED',
        message: 'Login failed. Please try again.',
      },
    }
  }
}

export async function forgotPasswordAction(data: ForgotPasswordData): Promise<ApiResponse<any>> {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (!data.email) {
      return {
        success: false,
        error: {
          code: 'INVALID_EMAIL',
          message: 'Email is required',
        },
      }
    }

    return {
      success: true,
      data: {
        message: 'Password reset link sent to your email',
      },
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'FORGOT_PASSWORD_FAILED',
        message: 'Failed to process forgot password request',
      },
    }
  }
}

export async function resetPasswordAction(data: ResetPasswordData): Promise<ApiResponse<any>> {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (!data.newPassword || !data.confirmPassword) {
      return {
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: 'Passwords are required',
        },
      }
    }

    if (data.newPassword !== data.confirmPassword) {
      return {
        success: false,
        error: {
          code: 'PASSWORD_MISMATCH',
          message: 'Passwords do not match',
        },
      }
    }

    return {
      success: true,
      data: {
        message: 'Password reset successfully',
      },
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'RESET_PASSWORD_FAILED',
        message: 'Failed to reset password',
      },
    }
  }
}

export async function logoutAction(): Promise<ApiResponse<any>> {
  try {
    // Clear session/token
    return {
      success: true,
      data: {
        message: 'Logged out successfully',
      },
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'LOGOUT_FAILED',
        message: 'Failed to logout',
      },
    }
  }
}
