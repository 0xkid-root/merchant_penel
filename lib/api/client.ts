import axios, { InternalAxiosRequestConfig } from 'axios';
import { env } from '../env';
import { tokenService } from '@/features/auth/api/tokenService';
import { API_ENDPOINTS } from './endpoints';

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

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const url = config.url || '';
    
    // Do not attach Authorization header for these endpoints
    const publicEndpoints = [
      API_ENDPOINTS.AUTH.LOGIN,
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD_SEND_OTP,
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD_VERIFY_OTP,
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
    ];

    const isPublic = publicEndpoints.some((endpoint) => url.includes(endpoint));

    if (!isPublic) {
      const accessToken = tokenService.getAccessToken();
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = tokenService.getRefreshToken();
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Keep refresh request using axios.post() NOT apiClient.post()
        const response = await axios.post(
          `${env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
          { refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        // Validate response properly
        if (!response.data || !response.data.accessToken || !response.data.refreshToken) {
           throw new Error('Invalid refresh token response');
        }

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

        // Update Zustand
        tokenService.setTokens(newAccessToken, newRefreshToken);

        // Update original request auth header
        if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        // Retry original request automatically
        return apiClient(originalRequest);
      } catch (refreshError) {
        // If refresh fails, first clear Zustand
        tokenService.clearTokens();
        
        // Then redirect using window.location.replace
        if (typeof window !== 'undefined') {
            window.location.replace('/login');
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
