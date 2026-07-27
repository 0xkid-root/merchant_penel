import { tokenService } from './tokenService';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import {
  AuthResponse,
  LoginCredentials,
  ForgotPasswordSendOtpPayload,
  ForgotPasswordVerifyOtpPayload,
  ResetPasswordPayload,
  ChangePasswordPayload,
  VerifyOtpResponse,
} from '../types/auth.types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    const refreshToken = tokenService.getRefreshToken();
    if (!refreshToken) return;
    
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken });
    return response.data;
  },

  forgotPasswordSendOtp: async (payload: ForgotPasswordSendOtpPayload): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD_SEND_OTP, payload);
  },

  forgotPasswordVerifyOtp: async (payload: ForgotPasswordVerifyOtpPayload): Promise<VerifyOtpResponse> => {
    const response = await apiClient.post<VerifyOtpResponse>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD_VERIFY_OTP, payload);
    return response.data;
  },

  resetPassword: async (payload: ResetPasswordPayload): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, payload);
  },

  changePassword: async (payload: ChangePasswordPayload): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, payload);
  },
};
