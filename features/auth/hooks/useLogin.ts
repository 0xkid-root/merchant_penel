import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { useAuthStore } from '@/lib/store/authStore';

export const useLogin = () => {
  const loginAction = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      loginAction(data.user, data.accessToken, data.refreshToken);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
