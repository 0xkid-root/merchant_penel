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

  PROFILE: {
    GET_PROFILE: '/api/v1/merchant/profile',
  },

  WALLET: {
    GET_DASHBOARD: '/api/v1/wallet/dashboard',
  },

  WALLET_LEDGER: {
    GET_LEDGER_DETAILS: (ledgerId: number) =>
      `/api/v1/wallet-ledger/${ledgerId}`,
  },
} as const;