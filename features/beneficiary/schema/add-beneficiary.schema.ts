import { z } from "zod";

export const addBeneficiarySchema = z
  .object({
    beneficiaryName: z
      .string()
      .trim()
      .min(2, "Please enter beneficiary name")
      .max(100, "Beneficiary name is too long"),

    accountNumber: z
      .string()
      .trim()
      .min(8, "Account number must be at least 8 digits")
      .max(20, "Account number cannot exceed 20 digits")
      .regex(/^[0-9]+$/, "Account number should contain only numbers"),

    confirmAccountNumber: z
      .string()
      .trim()
      .min(1, "Please confirm account number"),

    ifscCode: z
      .string()
      .trim()
      .transform((value) => value.toUpperCase())
      .refine(
        (value) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value),
        {
          message: "Please enter a valid IFSC code",
        }
      ),

    mobileNumber: z
      .string()
      .trim()
      .optional()
      .or(z.literal(""))
      .refine(
        (value) =>
          !value || /^[6-9]\d{9}$/.test(value),
        {
          message: "Please enter a valid mobile number",
        }
      ),

    emailId: z
      .string()
      .trim()
      .optional()
      .or(z.literal(""))
      .refine(
        (value) =>
          !value ||
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        {
          message: "Please enter a valid email address",
        }
      ),

    remarks: z
      .string()
      .max(200, "Remarks cannot exceed 200 characters")
      .optional(),
  })

  .refine(
    (data) =>
      data.accountNumber === data.confirmAccountNumber,
    {
      path: ["confirmAccountNumber"],
      message: "Account numbers do not match",
    }
  );

export type AddBeneficiaryFormData =
  z.infer<typeof addBeneficiarySchema>;