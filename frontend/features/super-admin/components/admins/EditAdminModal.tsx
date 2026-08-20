"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/shared/api/client";
import { EditAdminSchema, editAdminSchema } from "../../schema/ModifyAdmin";
import { User } from "@/features/admin/types/users";

const FORM_FIELDS = [
  { name: "name", placeholder: "الإسم" },
  { name: "email", placeholder: "البريد الإلكتروني" },
] as const;

type EditableAdmin = Pick<User, "_id" | "name" | "email" | "isActive"> & {
  role: Extract<User["role"], "admin" | "superAdmin">;
};

interface EditAdminFormProps {
  admin: EditableAdmin;
  onClose: () => void;
}

export default function EditAdminForm({ onClose, admin }: EditAdminFormProps) {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<EditAdminSchema>({
    resolver: zodResolver(editAdminSchema),

    defaultValues: {
      name: admin.name,
      email: admin.email,
      isActive: admin.isActive,
      role: admin.role,
    },
  });

  const onSubmit = async (data: EditAdminSchema) => {
    try {
      await api.patch(`/super-admin/admins/${admin._id}`, data);
      toast.success("تم تعديل بيانات المشرف بنجاح");
      router.refresh();
      onClose();
    } catch (error) {
      toast.error(
        getErrorMessage(error) || "حدث خطأ أثناء تعديل بيانات المشرف",
      );
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4">
        <FieldSet>
          <FieldGroup className="gap-5">
            {FORM_FIELDS.map((fieldConfig) => (
              <Controller
                key={fieldConfig.name}
                name={fieldConfig.name}
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-0.5"
                  >
                    <Input
                      {...field}
                      id={fieldConfig.name}
                      type={fieldConfig.name === "email" ? "email" : "text"}
                      placeholder={fieldConfig.placeholder}
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
            ))}
            <Controller
              name="isActive"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="space-y-0.5"
                >
                  <Select
                    value={field.value ? "true" : "false"}
                    onValueChange={(value) => field.onChange(value === "true")}
                  >
                    <SelectTrigger
                      className="w-full flex-row-reverse"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="حالة الحساب" />
                    </SelectTrigger>
                    <SelectContent
                      className="text-right"
                      sideOffset={5}
                      position="popper"
                      align="start"
                    >
                      <SelectGroup>
                        <SelectLabel>الحالة</SelectLabel>
                        <SelectItem value="true">نشط</SelectItem>
                        <SelectItem value="false">معطل</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
              name="role"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="space-y-0.5"
                >
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className="w-full flex-row-reverse"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="الصلاحية" />
                    </SelectTrigger>
                    <SelectContent
                      className="text-right"
                      sideOffset={5}
                      position="popper"
                      align="start"
                    >
                      <SelectGroup>
                        <SelectLabel>الصلاحيات</SelectLabel>
                        <SelectItem value="admin">مشرف</SelectItem>
                        <SelectItem value="superAdmin">سوبر أدمن</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isSubmitting}
        >
          إلغاء
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "جاري الحفظ..." : "حفظ التعديلات"}
        </Button>
      </div>
    </form>
  );
}
