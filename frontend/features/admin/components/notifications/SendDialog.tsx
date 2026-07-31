"use client";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getErrorMessage } from "@/shared/api/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  notificationSchema,
  NotificationValues,
} from "../../schema/NotificationSchema";
import { createNotification } from "../../api/notifications";
import { useRouter } from "next/navigation";

const SendDialog = ({ onClose }: { onClose: () => void }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<NotificationValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: { title: "", message: "" },
  });
  const router = useRouter();

  async function onSubmit(data: NotificationValues) {
    try {
      await createNotification({
        ...data,
        broadcast: true,
      });

      toast.success("تم إنشاء حملة الإشعارات بنجاح.");
      reset();
      router.refresh();
      onClose();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <DialogContent showCloseButton={false} dir="rtl" className="sm:max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <DialogHeader className="text-right">
          <DialogTitle className="text-lg font-semibold text-primary">
            إنشاء إشعار جديد
          </DialogTitle>
          <DialogDescription>
            قم بكتابة تفاصيل الإشعار ليتم إرساله لجميع المستخدمين المستهدفين.
          </DialogDescription>
        </DialogHeader>

        <FieldSet>
          <FieldGroup className="space-y-4">
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-y-2">
                  <FieldLabel htmlFor="title">عنوان الإشعار</FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    placeholder="مثال: تحديث جديد للنظام"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={
                        fieldState.error
                          ? [{ message: fieldState.error.message }]
                          : []
                      }
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="message"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-y-2">
                  <FieldLabel htmlFor="message">محتوى الإشعار</FieldLabel>
                  <Textarea
                    {...field}
                    id="message"
                    rows={4}
                    placeholder="اكتب نص الإشعار هنا..."
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={
                        fieldState.error
                          ? [{ message: fieldState.error.message }]
                          : []
                      }
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </FieldSet>

        <DialogFooter className="gap-2 pt-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              إلغاء
            </Button>
          </DialogClose>

          <Button
            disabled={isSubmitting || !isDirty}
            type="submit"
            className="gap-2"
          >
            {isSubmitting ? "جاري الإرسال..." : "إرسال الإشعار"}
            <Send className="size-4" />
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default SendDialog;
