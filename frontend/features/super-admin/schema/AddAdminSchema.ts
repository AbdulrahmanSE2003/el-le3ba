import { z } from "zod";

export const adminSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters.")
      .max(50, "Name must not exceed 50 characters."),

    email: z.email("Please enter a valid email address.").trim(),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(100, "Password must not exceed 100 characters."),

    passwordConfirm: z.string().min(1, "Please confirm your password."),
    role: z.enum(["admin", "superAdmin"]),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match.",
  });

export type AdminSchema = z.infer<typeof adminSchema>;
