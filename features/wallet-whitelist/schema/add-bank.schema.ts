import { z } from 'zod'

export const addBankAccountSchema = z
  .object({
    accountHolderName: z
      .string()
      .trim()
      .min(2, 'Enter the account holder name')
      .max(100, 'Account holder name is too long'),

    bankName: z
      .string()
      .trim()
      .min(1, 'Please enter a bank name'),

    accountNumber: z
      .string()
      .trim()
      .min(8, 'Account number must be at least 8 digits')
      .max(20, 'Account number cannot exceed 20 digits')
      .regex(/^[0-9]+$/, 'Account number must contain only digits'),

    confirmAccountNumber: z
      .string()
      .trim()
      .min(1, 'Please re-enter the account number'),

    ifscCode: z
      .string()
      .trim()
      .toUpperCase()
      .regex(
        /^[A-Z]{4}0[A-Z0-9]{6}$/,
        'Enter a valid IFSC code, for example HDFC0001234'
      ),

    accountType: z
      .string()
      .trim()
      .min(1, 'Please select account type'),

    verificationId: z.string().optional(),

    documentPath: z.string().optional(),

    documentType: z.enum(['PASSBOOK', 'CANCELLED_CHEQUE']).optional(),

    cancelledCheque: z
      .instanceof(File)
      .optional()
      .nullable(),
  })
  .refine(
    (data) => data.accountNumber === data.confirmAccountNumber,
    {
      path: ['confirmAccountNumber'],
      message: 'Account numbers do not match',
    }
  )

export type AddBankAccountFormData = z.infer<
  typeof addBankAccountSchema
>