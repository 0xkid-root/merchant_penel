// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
export const API_TIMEOUT = 30000 // 30 seconds

// Route Constants
export const AUTH_ROUTES = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
}

export const MERCHANT_ROUTES = {
  DASHBOARD: '/merchant/dashboard',
  WALLET: '/merchant/wallet',
  WALLET_WHITELIST: '/merchant/wallet-whitelist',
  BENEFICIARIES: '/merchant/beneficiaries',
  PAYOUT: '/merchant/payout',
  REPORTS: '/merchant/reports',
  NOTIFICATIONS: '/merchant/notifications',
  PROFILE: '/merchant/profile',
  SUPPORT: '/merchant/support',
}

export const PUBLIC_ROUTES = [AUTH_ROUTES.LOGIN, AUTH_ROUTES.FORGOT_PASSWORD, AUTH_ROUTES.RESET_PASSWORD, '/']

export const PROTECTED_ROUTES = Object.values(MERCHANT_ROUTES)

// Status Constants
export const PAYOUT_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  REVERSED: 'REVERSED',
} as const

export const TRANSACTION_STATUS = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
} as const

export const WALLET_TRANSACTION_TYPE = {
  DEBIT: 'DEBIT',
  CREDIT: 'CREDIT',
  HOLD: 'HOLD',
  RELEASE: 'RELEASE',
} as const

// Account Type Constants
export const ACCOUNT_TYPES = {
  SAVINGS: 'SAVINGS',
  CURRENT: 'CURRENT',
} as const

// Payment Methods
export const PAYMENT_METHODS = {
  BANK_TRANSFER: 'BANK_TRANSFER',
  UPI: 'UPI',
  CARD: 'CARD',
} as const

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
} as const

// Business Types
export const BUSINESS_TYPES = [
  'Sole Proprietorship',
  'Partnership',
  'Limited Liability Company',
  'Private Limited Company',
  'Public Limited Company',
  'HUF',
  'Trust',
  'Society',
  'NGO',
  'Individual',
]

// Verification Modes
export const VERIFICATION_MODES = {
  PENNY_DROP: 'PENNY_DROP',
  MANUAL: 'MANUAL',
} as const

// Error Codes
export const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  BAD_REQUEST: 'BAD_REQUEST',
  SERVER_ERROR: 'SERVER_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
} as const

// Message Templates
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Please login to continue',
  FORBIDDEN: 'You do not have permission to perform this action',
  NOT_FOUND: 'The requested resource was not found',
  BAD_REQUEST: 'Invalid request. Please check your input',
  SERVER_ERROR: 'Something went wrong. Please try again later',
  NETWORK_ERROR: 'Network error. Please check your connection',
  VALIDATION_ERROR: 'Please check the form for errors',
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Successfully logged in',
  LOGOUT: 'Successfully logged out',
  PAYOUT_CREATED: 'Payout request created successfully',
  BENEFICIARY_ADDED: 'Beneficiary added successfully',
  FUNDS_ADDED: 'Funds added successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
} as const

// Pagination
export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_PAGE = 1
export const MAX_PAGE_SIZE = 100

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'payoutx_auth_token',
  USER_EMAIL: 'payoutx_user_email',
  REMEMBER_EMAIL: 'payoutx_remember_email',
  THEME: 'payoutx_theme',
  LANGUAGE: 'payoutx_language',
}

// Feature Flags
export const FEATURES = {
  ENABLE_BULK_PAYOUT: true,
  ENABLE_SCHEDULED_PAYOUT: false,
  ENABLE_API_ACCESS: true,
  ENABLE_WEBHOOKS: false,
}

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'dd MMM yyyy',
  LONG: 'dd MMMM yyyy',
  TIME: 'HH:mm:ss',
  DATETIME: 'dd MMM yyyy HH:mm',
}

// Currency
export const DEFAULT_CURRENCY = 'INR'
export const CURRENCY_SYMBOLS = {
  INR: '₹',
  USD: '$',
  EUR: '€',
}

// Limits
export const LIMITS = {
  MIN_PAYOUT_AMOUNT: 1,
  MAX_PAYOUT_AMOUNT: 1000000,
  MIN_WALLET_TOPUP: 100,
  MAX_WALLET_TOPUP: 5000000,
  MAX_BENEFICIARIES: 500,
}

// Regex Patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[6-9]\d{9}$/,
  IFSC: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  ACCOUNT_NUMBER: /^\d{9,18}$/,
  GSTIN: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  UPI: /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/,
}
