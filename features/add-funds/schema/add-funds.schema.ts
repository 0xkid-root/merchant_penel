import { z } from 'zod'

export const addFundsSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required'),

  paymentMethod: z
    .string()
    .min(1, 'Please select payment method'),

  referenceId: z
    .string()
    .min(1, 'Reference ID is required'),

  transactionDate: z
    .string()
    .min(1, 'Transaction date is required'),

  remarks: z
    .string()
    .min(10, 'Remarks must be at least 10 characters'),

  file: z
    .any()
    .optional(),
})

export type AddFundsSchema = z.infer<typeof addFundsSchema>