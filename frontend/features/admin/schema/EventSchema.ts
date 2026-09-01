import { z } from "zod";

export const eventSchema = z
  .object({
    title: z
      .string()
      .min(3, "اسم الحدث يجب أن يكون 3 أحرف على الأقل")
      .max(100, "اسم الحدث لا يجب أن يتجاوز 100 حرف"),

    seasonId: z.string().min(1, "الموسم مطلوب"),

    startTime: z.string().min(1, "وقت البداية مطلوب"),

    endTime: z.string().min(1, "وقت النهاية مطلوب"),

    maxAttempts: z
      .number({ message: "عدد المحاولات مطلوب" })
      .min(1, "عدد المحاولات يجب أن يكون 1 على الأقل"),
  })
  .superRefine((data, ctx) => {
    const start = new Date(data.startTime).getTime();
    const end = new Date(data.endTime).getTime();

    if (Number.isNaN(start) || Number.isNaN(end)) {
      ctx.addIssue({
        code: "custom",
        path: ["startTime"],
        message: "برجاء إدخال تواريخ صحيحة",
      });
      return;
    }

    if (start >= end) {
      ctx.addIssue({
        code: "custom",
        path: ["endTime"],
        message: "وقت النهاية يجب أن يكون بعد وقت البداية",
      });
    }
  });

export type EventFormValues = z.infer<typeof eventSchema>;
