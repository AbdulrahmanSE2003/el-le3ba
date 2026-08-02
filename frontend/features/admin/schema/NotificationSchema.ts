import z from "zod";

export const notificationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "عنوان الإشعار مطلوب")
    .max(100, "عنوان الإشعار طويل جداً"),
  message: z
    .string()
    .trim()
    .min(1, "محتوى الإشعار مطلوب")
    .max(500, "محتوى الإشعار طويل جداً"),
});

export type NotificationValues = z.infer<typeof notificationSchema>;
