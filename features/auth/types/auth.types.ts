export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  [key: string]: any;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse extends AuthTokens {
  user: User;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface ForgotPasswordSendOtpPayload {
  email: string;
}

export interface ForgotPasswordVerifyOtpPayload {
  email: string;
  otp: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}
