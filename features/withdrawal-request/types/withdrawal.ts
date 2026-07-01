export interface BankAccount {
  id: string
  bank: string
  accountNumber: string
  ifsc: string
}

export interface PaymentMethod {
  label: string
  value: string
}

export interface WithdrawalFormData {
  amount: string
  bankAccount: string
  paymentMethod: string
  remarks: string
  document?: File | null
}