export type TransactionStatus = 'Success' | 'Pending' | 'Failed'

export interface Transaction {
  id: string

  type:
    | 'Add Funds'
    | 'Payout'
    | 'Withdrawal Request'

  amount: string

  amountColor:
    | 'text-green-600'
    | 'text-red-600'

  status: TransactionStatus

  remarks: string

  date: string

  balance: string
}