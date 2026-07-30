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
    GET_WALLET: '/api/v1/wallet',
    GET_WALLET_SUMMARY: '/api/v1/wallet/summary',
    GET_DASHBOARD: '/api/v1/wallet/dashboard',
  },
  WALLET_LEDGER: {
    GET_LEDGER: '/api/v1/wallet-ledger',

    GET_LEDGER_DETAILS: (ledgerId: number) =>
      `/api/v1/wallet-ledger/${ledgerId}`,

    GET_STATEMENT: '/api/v1/wallet-ledger/statement',
  },
} as const;
