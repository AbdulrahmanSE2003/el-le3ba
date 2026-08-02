import { z } from "zod";

export const createUserSchema = z
  .object({
    name: z.string().min(3, "الاسم يجب ان يكون ثلاثة حروف على الاقل"),

    email: z.email("البريد الإلكتروني غير صحيح"),

    password: z.string().min(8, "كلمة المرور يجب أن لا تقل عن 8 أحرف او أرقام"),

    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "كلمات المرور غير متطابقة",
    path: ["passwordConfirm"],
  });

export const updateUserSchema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون ثلالة أحرف على الأقل"),
  email: z.email("البريد الإلكتروني غير صحيح"),
  isActive: z.boolean(),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
