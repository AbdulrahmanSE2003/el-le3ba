import { z } from "zod";

export const ProfileFormSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, "اكتب باسوردك القديم الأول")
      .min(8, "الباسورد القديم ما يقلش عن 8 حروف أو أرقام"),

    newPassword: z
      .string()
      .min(1, "اكتب الباسورد الجديد")
      .min(8, "الباسورد الجديد لازم يكون 8 حروف أو أرقام على الأقل"),

    newPasswordConfirm: z
      .string()
      .min(1, "أكد الباسورد الجديد")
      .min(8, "تأكيد الباسورد ما يقلش عن 8 حروف"),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    path: ["newPasswordConfirm"],
    message: "الباسوردين مش شبه بعض، تأكد منهم تاني",
  });

export type ProfileFormValues = z.infer<typeof ProfileFormSchema>;
