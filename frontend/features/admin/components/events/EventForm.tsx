"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  eventSchema,
  type EventFormValues,
} from "../../schema/EventSchema";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SeasonOption {
  _id: string;
  title: string;
}

interface EventFormProps {
  mode?: "create" | "update";
  initialValues?: {
    title: string;
    seasonId: string;
    startTime: string;
    endTime: string;
    maxAttempts: number;
  };
  seasons: SeasonOption[];
  onSubmit: (data: EventFormValues) => void;
  isLoading?: boolean;
}

export function EventForm({
  mode = "create",
  initialValues,
  seasons,
  onSubmit,
  isLoading,
}: EventFormProps) {
  const isUpdate = mode === "update";

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialValues ?? {
      title: "",
      seasonId: "",
      startTime: "",
      endTime: "",
      maxAttempts: 1,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم الحدث</FormLabel>
              <FormControl>
                <Input placeholder="مثال: حدث التأهيل" maxLength={100} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seasonId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الموسم</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر الموسم" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {seasons.map((season) => (
                    <SelectItem key={season._id} value={season._id}>
                      {season.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>وقت البداية</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>وقت النهاية</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxAttempts"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عدد المحاولات الأقصى</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
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
              : "إنشاء الحدث"}
        </Button>
      </form>
    </Form>
  );
}
