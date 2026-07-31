'use client'

import { WalletTransactionStatus } from '@/features/wallet-transactions/types/walletTransactions.types'

interface Props {
  status: WalletTransactionStatus | string
}

export default function TransactionStatusBadge({ status }: Props) {
  const getBadgeStyles = () => {
    switch (status?.toUpperCase()) {
      case 'SUCCESS':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'FAILED':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'UNKNOWN':
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold border inline-flex items-center justify-center whitespace-nowrap ${getBadgeStyles()}`}
    >
      {status || 'UNKNOWN'}
    </span>
  )
}
