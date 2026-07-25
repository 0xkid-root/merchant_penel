import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';

export const useForgotPasswordSendOtp = () => {
  return useMutation({
    mutationFn: authApi.forgotPasswordSendOtp,
  });
};

export const useForgotPasswordVerifyOtp = () => {
  return useMutation({
    mutationFn: authApi.forgotPasswordVerifyOtp,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: authApi.resetPassword,
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: authApi.changePassword,
  });
};
