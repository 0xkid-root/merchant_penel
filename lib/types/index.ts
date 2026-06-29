// Auth Types
export interface User {
  id: string
  email: string
  businessName: string
  businessType: string
  upiId?: string
  phone: string
  createdAt: Date
  updatedAt: Date
}

export interface AuthUser extends User {
  token: string
}

export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  user: AuthUser
  token: string
}

export interface AuthContext {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
}

// Wallet Types
export interface Wallet {
  id: string
  userId: string
  balance: number
  availableBalance: number
  lockedBalance: number
  currency: string
  createdAt: Date
  updatedAt: Date
}

export interface WalletTransaction {
  id: string
  walletId: string
  type: 'DEBIT' | 'CREDIT' | 'HOLD' | 'RELEASE'
  amount: number
  description: string
  status: 'PENDING' | 'SUCCESS' | 'FAILED'
  createdAt: Date
}

export interface AddFundsRequest {
  amount: number
  paymentMethod: 'BANK_TRANSFER' | 'UPI' | 'CARD'
}

// Beneficiary Types
export interface Beneficiary {
  id: string
  userId: string
  name: string
  accountNumber: string
  ifscCode: string
  bankName: string
  accountType: 'SAVINGS' | 'CURRENT'
  isVerified: boolean
  verificationMode: 'PENNY_DROP' | 'MANUAL'
  createdAt: Date
}

export interface CreateBeneficiaryRequest {
  name: string
  accountNumber: string
  ifscCode: string
  accountType: 'SAVINGS' | 'CURRENT'
}

// Payout Types
export interface Payout {
  id: string
  userId: string
  beneficiaryId: string
  amount: number
  status: 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'REVERSED'
  referenceId: string
  description?: string
  failureReason?: string
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
}

export interface CreatePayoutRequest {
  beneficiaryId: string
  amount: number
  description?: string
}

export interface PayoutTransaction extends Payout {
  beneficiary: Beneficiary
  transactionId: string
}

// Report Types
export interface ReportFilters {
  startDate: Date
  endDate: Date
  status?: string
  type?: string
  page?: number
  limit?: number
}

export interface TransactionReport {
  id: string
  type: 'PAYOUT' | 'DEPOSIT' | 'WITHDRAWAL'
  amount: number
  status: string
  date: Date
  description: string
}

export interface ReportData {
  totalTransactions: number
  totalAmount: number
  successCount: number
  failedCount: number
  pendingCount: number
  transactions: TransactionReport[]
}

// Dashboard Stats
export interface DashboardStats {
  walletBalance: number
  availableBalance: number
  todaysPayout: number
  todaysCredit: number
  todaysDebit: number
  successfulPayouts: number
  failedPayouts: number
  pendingPayouts: number
}

export interface ChartData {
  date: string
  amount: number
}

export interface PayoutOverviewData {
  data: ChartData[]
  totalPayout: number
  percentageChange: number
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS'
  title: string
  message: string
  read: boolean
  createdAt: Date
}

// Activity Types
export interface Activity {
  id: string
  userId: string
  action: string
  description: string
  status: 'SUCCESS' | 'FAILED' | 'PENDING'
  amount?: number
  icon: string
  timestamp: Date
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
  meta?: {
    page?: number
    limit?: number
    total?: number
  }
}

// Pagination
export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Profile Types
export interface Profile {
  id: string
  userId: string
  businessName: string
  businessType: string
  gstin?: string
  registrationNumber?: string
  address: string
  city: string
  state: string
  pincode: string
  country: string
  phone: string
  upiId?: string
  supportEmail?: string
  websiteUrl?: string
  createdAt: Date
  updatedAt: Date
}

// Error Types
export interface ApiError {
  code: string
  message: string
  status: number
  details?: Record<string, any>
}

// Common UI Types
export interface SelectOption {
  label: string
  value: string | number
}

export interface FormFieldError {
  field: string
  message: string
}
