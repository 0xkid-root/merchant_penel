import { z } from "zod";

export const addBeneficiarySchema = z
  .object({
    beneficiaryName: z.string().min(2, "Beneficiary name is required"),

    accountNumber: z
      .string()
      .min(8)
      .max(20),

    confirmAccountNumber: z.string(),

    ifscCode: z
      .string()
      .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/),

    mobileNumber: z.string().optional(),

    emailId: z
      .string()
      .email()
      .optional()
      .or(z.literal("")),

    remarks: z.string().optional(),
  })
  .refine(
    (data) => data.accountNumber === data.confirmAccountNumber,
    {
      path: ["confirmAccountNumber"],
      message: "Account numbers do not match",
    }
  );

export type AddBeneficiaryFormData =
  z.infer<typeof addBeneficiarySchema>;