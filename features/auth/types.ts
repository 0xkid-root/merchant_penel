export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface ForgotPasswordData {
  email: string
}

export interface ResetPasswordData {
  token: string
  newPassword: string
  confirmPassword: string
}

export interface AuthState {
  user: any | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
}
