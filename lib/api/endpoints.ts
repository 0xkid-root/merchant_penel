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
    GET_BALANCE: '/api/v1/wallet/balance',
  },

  // Existing (keep it because Wallet module uses it)
  WALLET_LEDGER: {
    GET_LEDGER_DETAILS: (ledgerId: number) =>
      `/api/v1/wallet-ledger/${ledgerId}`,
  },

  OTP: {
    VERIFY: '/otp/verify',
  },

  // New (Wallet Transactions feature)
  WALLET_TRANSACTIONS: {
    GET_TRANSACTIONS: '/api/v1/wallet-ledger',

    GET_TRANSACTION_DETAILS: (ledgerId: number) =>
      `/api/v1/wallet-ledger/${ledgerId}`,

    GET_STATEMENT: '/api/v1/wallet-ledger/statement',
    EXPORT: '/api/v1/wallet-ledger/export',
  },
  BANK_VERIFICATION: {
    VERIFY_BANK: '/api/v1/bank-verification/verify',
  },
  BENEFICIARIES: {
    CREATE: '/api/v1/beneficiaries',

    GET_ALL: '/api/v1/beneficiaries/getAllBeneficiaries',

    GET_BY_ID: (id: number) =>
      `/api/v1/beneficiaries/${id}`,

    UPDATE: (id: number) =>
      `/api/v1/beneficiaries/${id}`,

    UPDATE_STATUS: (id: number) =>
      `/api/v1/beneficiaries/${id}/status`,

    DELETE: (id: number) =>
      `/api/v1/beneficiaries/${id}`,
  },

  WALLET_WHITELIST: {
    CREATE: '/api/v1/wallet-whitelist',

    GET_ALL: '/api/v1/wallet-whitelist',

    GET_BY_ID: (id: number) =>
      `/api/v1/wallet-whitelist/${id}`,

    UPDATE: (id: number) =>
      `/api/v1/wallet-whitelist/${id}`,

    DELETE: (id: number) =>
      `/api/v1/wallet-whitelist/${id}`,
  },

  PAYOUTS: {
    SINGLE: {
      LIST: '/api/v1/payouts/single',
      
      GET_BY_ID: (id: number) =>
        `/api/v1/payouts/single/${id}`,
      SEND_OTP: '/api/v1/payouts/send-otp',
      CREATE: '/api/v1/payouts/single',
    },

    DIRECT: {
      LIST: '/api/v1/payouts/direct',
      GET_BY_ID: (id: number) =>
        `/api/v1/payouts/direct/${id}`,
      SEND_OTP: '/api/v1/payouts/direct/send-otp',
      CREATE: '/api/v1/payouts/direct',
    },

    BULK: {
      LIST: '/api/v1/payouts/bulk',
      GET_BY_ID: (id: number) =>
        `/api/v1/payouts/bulk/${id}`,
      PREVIEW: '/api/v1/payouts/bulk/preview',
      CREATE: '/api/v1/payouts/bulk/create',
      SEND_OTP: '/api/v1/payouts/bulk/send-otp',
    },

    HISTORY: {
      LIST: '/api/v1/payouts/transactions',
    },
  },


} as const