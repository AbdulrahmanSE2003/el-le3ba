import { z } from "zod";

export const seasonSchema = z
  .object({
    title: z
      .string()
      .min(3, "اسم الموسم يجب أن يكون 3 أحرف على الأقل")
      .max(60, "اسم الموسم لا يجب أن يتجاوز 60 حرف"),

    startDate: z.string().min(1, "تاريخ البداية مطلوب"),

    knockoutStartDate: z.string().min(1, "موعد الإقصائيات مطلوب"),

    endDate: z.string().min(1, "تاريخ النهاية مطلوب"),
  })
  .superRefine((data, ctx) => {
    const start = new Date(data.startDate).getTime();
    const knockout = new Date(data.knockoutStartDate).getTime();
    const end = new Date(data.endDate).getTime();

    if (Number.isNaN(start) || Number.isNaN(knockout) || Number.isNaN(end)) {
      ctx.addIssue({
        code: "custom",
        path: ["startDate"],
        message: "برجاء إدخال تواريخ صحيحة",
      });
      return;
    }

    if (start >= knockout) {
      ctx.addIssue({
        code: "custom",
        path: ["knockoutStartDate"],
        message: "موعد الإقصائيات يجب أن يكون بعد تاريخ البداية",
      });
    }

    if (knockout >= end) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "تاريخ النهاية يجب أن يكون بعد موعد الإقصائيات",
      });
    }
  });

export type SeasonFormValues = z.infer<typeof seasonSchema>;