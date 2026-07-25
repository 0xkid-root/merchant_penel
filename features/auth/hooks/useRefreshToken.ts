import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { useAuthStore } from '@/lib/store/authStore';

export const useRefreshToken = () => {
  const updateTokens = useAuthStore((state) => state.updateTokens);

  return useMutation({
    mutationFn: authApi.refreshToken,
    onSuccess: (data) => {
      updateTokens(data.accessToken, data.refreshToken);
    },
  });
};
