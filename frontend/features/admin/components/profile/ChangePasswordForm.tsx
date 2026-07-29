"use client";

import { useState } from "react";
import { Eye, EyeOff, Key, Loader, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import {
  ProfileFormSchema,
  ProfileFormValues,
} from "../../schema/ProfileFormSchema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import api from "@/lib/axios";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/api/client";

const FIELDS: {
  label: string;
  name: keyof ProfileFormValues;
}[] = [
  { label: "كلمة المرور الحالية", name: "oldPassword" },
  { label: "كلمة المرور الجديدة", name: "newPassword" },
  { label: "تأكيد كلمة المرور الجديدة", name: "newPasswordConfirm" },
];

const ChangePasswordForm = () => {
  // State لتتبع حالة إظهار/إخفاء الباسوورد لكل حقل بشكل مستقل
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {},
  );

  const togglePasswordVisibility = (name: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      await api.patch("/users/me/change-password", data);
      toast.success("تم تغيير الباسوورد بنجاح.");
      reset();
      setShowPasswords({});
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col gap-y-2 justify-between md:col-span-3">
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-2">
          <Key className="h-4 w-4 text-primary" />
          <h2 className="text-base font-semibold">تغيير كلمة المرور</h2>
        </div>
        <Separator className="bg-border" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
        <FieldSet>
          <FieldGroup className="gap-y-3">
            {FIELDS.map((f) => {
              const isVisible = !!showPasswords[f.name];

              return (
                <Controller
                  key={f.name}
                  name={f.name}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="space-y-1"
                    >
                      <FieldLabel htmlFor={f.name}>{f.label}</FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          id={f.name}
                          type={isVisible ? "text" : "password"}
                          placeholder="••••••••"
                          aria-invalid={fieldState.invalid}
                          className="bg-background pr-9 pl-9"
                        />
                        <Lock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />

                        {/* زرار الـ Show/Hide */}
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(f.name)}
                          className="absolute left-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          tabIndex={-1}
                        >
                          {isVisible ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
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
              );
            })}
          </FieldGroup>
        </FieldSet>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            disabled={isSubmitting}
            variant="outline"
            onClick={() => {
              reset({
                oldPassword: "",
                newPassword: "",
                newPasswordConfirm: "",
              });
              setShowPasswords({});
            }}
          >
            إلغاء
          </Button>
          <Button disabled={isSubmitting || !isDirty} type="submit">
            حفظ التغييرات
            {isSubmitting && <Loader className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
