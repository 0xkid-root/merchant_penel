import { z } from "zod";

export const editBeneficiarySchema = z.object({
  mobile: z
    .string()
    .trim()
    .min(1, "Please enter mobile number")
    .refine(
      (value) => /^[6-9]\d{9}$/.test(value),
      {
        message: "Please enter a valid 10-digit mobile number",
      }
    ),

  email: z
    .string()
    .trim()
    .min(1, "Please enter email ID")
    .email("Please enter a valid email address"),
});

export type EditBeneficiaryFormData = z.infer<typeof editBeneficiarySchema>;
