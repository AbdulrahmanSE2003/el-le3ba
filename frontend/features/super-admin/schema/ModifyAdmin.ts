import { z } from "zod";

export const editAdminSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters.")
    .max(50, "Name must not exceed 50 characters."),

  email: z.email("Please enter a valid email address.").trim(),

  isActive: z.boolean(),
  role: z.enum(["admin", "superAdmin"]),
});

export type EditAdminSchema = z.infer<typeof editAdminSchema>;
