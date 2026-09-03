"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  seasonSchema,
  type SeasonFormValues,
} from "../../schema/SeasonSchema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";

interface SeasonFormProps {
  mode?: "create" | "update";
  initialValues?: {
    title: string;
    startDate: string;
    knockoutStartDate: string;
    endDate: string;
  };
  onSubmit: (data: SeasonFormValues) => void;
  isLoading?: boolean;
}

const parseDateString = (value: string): Date | undefined => {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day);
};

export function SeasonForm({
  mode = "create",
  initialValues,
  onSubmit,
  isLoading,
}: SeasonFormProps) {
  const isUpdate = mode === "update";

  const form = useForm<SeasonFormValues>({
    resolver: zodResolver(seasonSchema),
    defaultValues: initialValues ?? {
      title: "",
      startDate: "",
      knockoutStartDate: "",
      endDate: "",
    },
  });

  const startDate = useWatch({ control: form.control, name: "startDate" });
  const knockoutStartDate = useWatch({
    control: form.control,
    name: "knockoutStartDate",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم الموسم</FormLabel>
              <FormControl>
                <Input placeholder="مثال: موسم ربيع 2026" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>تاريخ البداية</FormLabel>
              <DatePicker
                value={field.value}
                onChange={field.onChange}
                placeholder="اختر تاريخ بداية الموسم"
                minDate={isUpdate ? undefined : new Date()}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="knockoutStartDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>موعد بدء الإقصائيات</FormLabel>
              <DatePicker
                value={field.value}
                onChange={field.onChange}
                placeholder="اختر موعد بدء الإقصائيات"
                minDate={parseDateString(startDate)}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>تاريخ النهاية</FormLabel>
              <DatePicker
                value={field.value}
                onChange={field.onChange}
                placeholder="اختر تاريخ نهاية الموسم"
                minDate={parseDateString(knockoutStartDate)}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading
            ? isUpdate
              ? "جاري الحفظ..."
              : "جاري الإنشاء..."
            : isUpdate
              ? "حفظ التعديلات"
              : "إنشاء الموسم"}
        </Button>
      </form>
    </Form>
  );
}