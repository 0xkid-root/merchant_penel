import { z } from 'zod'

export const withdrawalSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required'),

  bankAccount: z
    .string()
    .min(1, 'Bank Account is required'),

  paymentMethod: z
    .string()
    .min(1, 'Payment Method is required'),

  remarks: z
    .string()
    .min(5, 'Remarks must be at least 5 characters'),

  document: z
    .any()
    .optional(),
})

export type WithdrawalSchema = z.infer<typeof withdrawalSchema>