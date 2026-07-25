import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { tokenService } from '../api/tokenService';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      tokenService.clearTokens();
      queryClient.clear();
      if (typeof window !== 'undefined') {
        window.location.replace('/login');
      }
    },
  });
};
