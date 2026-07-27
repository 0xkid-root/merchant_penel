import axios, { InternalAxiosRequestConfig } from 'axios';
import { env } from '../env';
import { tokenService } from '@/features/auth/api/tokenService';
import { API_ENDPOINTS } from './endpoints';
import { useAuthStore } from '@/lib/store/authStore';

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Auth endpoints that should NEVER trigger refresh token logic.
 */
const AUTH_ENDPOINTS = [
  API_ENDPOINTS.AUTH.LOGIN,
  API_ENDPOINTS.AUTH.LOGOUT,
  API_ENDPOINTS.AUTH.REFRESH_TOKEN,
  API_ENDPOINTS.AUTH.FORGOT_PASSWORD_SEND_OTP,
  API_ENDPOINTS.AUTH.FORGOT_PASSWORD_VERIFY_OTP,
  API_ENDPOINTS.AUTH.RESET_PASSWORD,
];

/* -------------------------------------------------------------------------- */
/*                              Request Interceptor                           */
/* -------------------------------------------------------------------------- */

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const url = config.url || '';

    const isAuthEndpoint = AUTH_ENDPOINTS.some((endpoint) =>
      url.includes(endpoint)
    );

    if (!isAuthEndpoint) {
      const accessToken = tokenService.getAccessToken();

      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* -------------------------------------------------------------------------- */
/*                             Response Interceptor                           */
/* -------------------------------------------------------------------------- */

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;

    const url = originalRequest?.url || '';

    const isAuthEndpoint = AUTH_ENDPOINTS.some((endpoint) =>
      url.includes(endpoint)
    );

    /**
     * Refresh token only for protected APIs.
     * Never refresh for login / forgot password / reset password APIs.
     */
    if (
      error.response?.status === 401 &&
      !isAuthEndpoint &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = tokenService.getRefreshToken();

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        /**
         * IMPORTANT:
         * Use axios instead of apiClient here
         * to avoid infinite interceptor loops.
         */
        const response = await axios.post(
          `${env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
          {
            refreshToken,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (
          !response.data ||
          !response.data.accessToken ||
          !response.data.refreshToken
        ) {
          throw new Error('Invalid refresh token response');
        }

        const {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        } = response.data;

        tokenService.setTokens(newAccessToken, newRefreshToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        /**
         * Refresh token expired.
         * Completely clear auth state.
         */
        tokenService.clearTokens();
        useAuthStore.getState().clearAuth();

        if (typeof window !== 'undefined') {
          window.location.replace('/login');
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);