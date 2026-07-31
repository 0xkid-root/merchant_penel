import { TransactionStatus } from '../types/walletLedger.types'

export function getStatusBadge(status: TransactionStatus | string) {
  switch (status?.toUpperCase()) {
    case 'SUCCESS':
      return 'bg-green-100 text-green-700'

    case 'PENDING':
    case 'PROCESSING':
      return 'bg-yellow-100 text-yellow-700'

    case 'FAILED':
      return 'bg-red-100 text-red-700'

    case 'UNKNOWN':
    default:
      return 'bg-gray-100 text-gray-700'
  }
}