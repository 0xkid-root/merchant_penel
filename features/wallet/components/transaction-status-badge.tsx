'use client'

import { getStatusBadge } from '../utils/status-badge'
import { TransactionStatus } from '../types/walletLedger.types'

interface Props {
  status: TransactionStatus
}

export default function TransactionStatusBadge({
  status,
}: Props) {
  return (
    <span
      className={`${getStatusBadge(
        status
      )} inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold`}
    >
      {status}
    </span>
  )
}