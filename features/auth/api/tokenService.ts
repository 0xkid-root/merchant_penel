import { useAuthStore } from '@/lib/store/authStore';

export const tokenService = {
  getAccessToken: (): string | null => {
    return useAuthStore.getState().accessToken;
  },

  getRefreshToken: (): string | null => {
    return useAuthStore.getState().refreshToken;
  },

  setTokens: (accessToken: string, refreshToken: string): void => {
    useAuthStore.getState().updateTokens(accessToken, refreshToken);
  },

  clearTokens: (): void => {
    useAuthStore.getState().clearAuth();
  },
};
