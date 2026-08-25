import { z } from 'zod'

export const directPayoutSchema = z
  .object({
    accountHolderName: z
      .string()
      .trim()
      .min(
        3,
        'Account holder name must be at least 3 characters'
      )
      .max(
        100,
        'Account holder name cannot exceed 100 characters'
      ),

    accountNumber: z
      .string()
      .trim()
      .regex(
        /^\d+$/,
        'Account number must contain only digits'
      )
      .min(
        8,
        'Account number must be at least 8 digits'
      )
      .max(
        18,
        'Account number cannot exceed 18 digits'
      ),

    confirmAccountNumber: z
      .string()
      .trim()
      .regex(
        /^\d+$/,
        'Account number must contain only digits'
      )
      .min(
        8,
        'Confirm account number must be at least 8 digits'
      )
      .max(
        18,
        'Confirm account number cannot exceed 18 digits'
      ),

    ifscCode: z
      .string()
      .trim()
      .toUpperCase()
      .length(
        11,
        'IFSC code must be exactly 11 characters'
      )
      .regex(
        /^[A-Z]{4}0[A-Z0-9]{6}$/,
        'Invalid IFSC code format'
      ),

    bankName: z
      .string()
      .trim()
      .min(
        1,
        'Bank name is required'
      )
      .max(
        100,
        'Bank name cannot exceed 100 characters'
      ),

    branchName: z
      .string()
      .trim()
      .min(
        1,
        'Branch name is required'
      )
      .max(
        100,
        'Branch name cannot exceed 100 characters'
      ),

    paymentMode: z.enum(
      ['IMPS', 'NEFT', 'RTGS'],
      {
        message: 'Please select a valid payment mode',
      }
    ),

    amount: z
      .string()
      .trim()
      .min(
        1,
        'Amount is required'
      )
      .regex(
        /^\d+(\.\d{1,2})?$/,
        'Enter a valid amount'
      )
      .refine(
        (value) => Number(value) > 0,
        {
          message: 'Amount must be greater than 0',
        }
      ),

    remarks: z
      .string()
      .trim()
      .max(
        250,
        'Remarks cannot exceed 250 characters'
      )
      .optional()
      .default(''),
  })

  .refine(
    (data) =>
      data.accountNumber ===
      data.confirmAccountNumber,
    {
      message: "Account numbers don't match",
      path: ['confirmAccountNumber'],
    }
  )

export type DirectPayoutFormData =
  z.infer<typeof directPayoutSchema>