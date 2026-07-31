"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserSchema,
  updateUserSchema,
  type CreateUserFormValues,
  type UpdateUserFormValues,
} from "@/features/admin/schema/userSchema";

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
import { Switch } from "@/components/ui/switch";

type UserFormProps =
  | {
      mode: "create";
      initialValues?: undefined;
      onSubmit: (data: CreateUserFormValues) => void;
      isLoading?: boolean;
    }
  | {
      mode: "update";
      initialValues: { name: string; email: string; isActive: boolean };
      onSubmit: (data: UpdateUserFormValues) => void;
      isLoading?: boolean;
    };

export function UserForm(props: UserFormProps) {
  const { mode, initialValues, onSubmit, isLoading } = props;

  // (Create Mode)
  if (mode === "create") {
    return <CreateForm onSubmit={onSubmit} isLoading={isLoading} />;
  }

  // (Update Mode)
  return (
    <UpdateForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
}

// ==========================================
// Sub-Components for Type Safety
// ==========================================

function CreateForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: CreateUserFormValues) => void;
  isLoading?: boolean;
}) {
  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الاسم</FormLabel>
              <FormControl>
                <Input placeholder="أدخل اسم المستخدم" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>كلمة السر</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>تأكيد كلمة السر</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "جاري الحفظ..." : "إضافة المستخدم"}
        </Button>
      </form>
    </Form>
  );
}

function UpdateForm({
  initialValues,
  onSubmit,
  isLoading,
}: {
  initialValues: { name: string; email: string; isActive: boolean };
  onSubmit: (data: UpdateUserFormValues) => void;
  isLoading?: boolean;
}) {
  const form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: initialValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الاسم</FormLabel>
              <FormControl>
                <Input placeholder="أدخل اسم المستخدم" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <FormLabel className="cursor-pointer">
                حالة الحساب (نشط)
              </FormLabel>
              <FormControl dir="ltr" className="cursor-pointer">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "جاري الحفظ..." : "حفظ التعديلات"}
        </Button>
      </form>
    </Form>
  );
}
