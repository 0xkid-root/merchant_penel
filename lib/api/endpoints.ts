export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/merchant/auth/login',
    REFRESH_TOKEN: '/merchant/auth/refresh-token',
    LOGOUT: '/merchant/auth/logout',
    FORGOT_PASSWORD_SEND_OTP: '/merchant/auth/forgot-password/send-otp',
    FORGOT_PASSWORD_VERIFY_OTP: '/merchant/auth/forgot-password/verify-otp',
    RESET_PASSWORD: '/merchant/auth/forgot-password/reset-password',
    CHANGE_PASSWORD: '/merchant/auth/change-password',
  },
} as const;
