import { ApiError } from '@/lib/types'

// Format currency
export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return formatter.format(amount)
}

// Format date
export const formatDate = (date: Date | string, format: string = 'dd MMM yyyy'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const day = dateObj.getDate().toString().padStart(2, '0')
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
  const year = dateObj.getFullYear()
  const hours = dateObj.getHours().toString().padStart(2, '0')
  const minutes = dateObj.getMinutes().toString().padStart(2, '0')
  const seconds = dateObj.getSeconds().toString().padStart(2, '0')

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthShort = monthNames[dateObj.getMonth()]

  const replacements: Record<string, string> = {
    'dd': day,
    'MM': month,
    'yyyy': year.toString(),
    'MMM': monthShort,
    'HH': hours,
    'mm': minutes,
    'ss': seconds,
  }

  let result = format
  Object.entries(replacements).forEach(([key, value]) => {
    result = result.replace(key, value)
  })

  return result
}

// Validate email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/
  return phoneRegex.test(phone.replace(/\D/g, ''))
}

// Validate IFSC
export const validateIFSC = (ifsc: string): boolean => {
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/
  return ifscRegex.test(ifsc)
}

// Validate account number
export const validateAccountNumber = (accountNumber: string): boolean => {
  const accountRegex = /^\d{9,18}$/
  return accountRegex.test(accountNumber.replace(/\s/g, ''))
}

// Validate UPI
export const validateUPI = (upi: string): boolean => {
  const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/
  return upiRegex.test(upi)
}

// Mask account number
export const maskAccountNumber = (accountNumber: string): string => {
  const cleaned = accountNumber.replace(/\s/g, '')
  if (cleaned.length < 4) return cleaned
  const visibleLength = 4
  const masked = '*'.repeat(cleaned.length - visibleLength) + cleaned.slice(-visibleLength)
  return masked
}

// Mask email
export const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split('@')
  if (!localPart || !domain) return email
  
  const visibleLength = Math.max(1, Math.floor(localPart.length / 2))
  const masked = localPart.substring(0, visibleLength) + '*'.repeat(Math.max(1, localPart.length - visibleLength))
  return `${masked}@${domain}`
}

// Get initials from name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2)
}

// Truncate text
export const truncateText = (text: string, length: number = 50, suffix: string = '...'): string => {
  if (text.length <= length) return text
  return text.substring(0, length) + suffix
}

// Convert bytes to human readable format
export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

// Get status color
export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    'SUCCESS': 'text-green-600 bg-green-100',
    'FAILED': 'text-red-600 bg-red-100',
    'PENDING': 'text-yellow-600 bg-yellow-100',
    'PROCESSING': 'text-blue-600 bg-blue-100',
    'REVERSED': 'text-purple-600 bg-purple-100',
  }
  return statusColors[status] || 'text-gray-600 bg-gray-100'
}

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Parse API error
export const parseApiError = (error: any): ApiError => {
  if (error.response?.data?.error) {
    return {
      code: error.response.data.error.code,
      message: error.response.data.error.message,
      status: error.response.status,
      details: error.response.data.error.details,
    }
  }

  if (error.message) {
    return {
      code: 'UNKNOWN_ERROR',
      message: error.message,
      status: 500,
    }
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unknown error occurred',
    status: 500,
  }
}

// Delay function
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Check if object is empty
export const isEmpty = (obj: Record<string, any>): boolean => {
  return Object.keys(obj).length === 0
}

// Deep clone object
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

// Merge objects
export const mergeObjects = <T extends Record<string, any>>(
  ...objects: Partial<T>[]
): T => {
  return objects.reduce((acc, obj) => ({ ...acc, ...obj }), {} as T)
}

// Get query parameter
export const getQueryParam = (name: string): string | null => {
  if (typeof window === 'undefined') return null
  
  const params = new URLSearchParams(window.location.search)
  return params.get(name)
}

// Format file size for display
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
