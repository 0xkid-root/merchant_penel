import { TransactionStatus } from '../types/transaction'

export function getStatusBadge(status: TransactionStatus) {
  switch (status) {
    case 'Success':
      return 'bg-green-100 text-green-700'

    case 'Pending':
      return 'bg-yellow-100 text-yellow-700'

    case 'Failed':
      return 'bg-red-100 text-red-700'

    default:
      return 'bg-gray-100 text-gray-700'
  }
}