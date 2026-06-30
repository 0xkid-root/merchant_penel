export interface AddFundsFormData {
  amount: string
  paymentMethod: string
  referenceId: string
  transactionDate: string
  remarks: string
  file?: File | null
}

export interface PaymentMethod {
  label: string
  value: string
}