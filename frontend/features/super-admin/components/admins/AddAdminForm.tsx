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
import { adminSchema, AdminSchema } from "../../schema/AddAdminSchema";
import { getErrorMessage } from "@/shared/api/client";
import { Eye, EyeOff } from "lucide-react";

const FORM_FIELDS = [
  { name: "name", placeholder: "الإسم" },
  { name: "email", placeholder: "البريد الإلكتروني" },
  { name: "password", placeholder: "كلمة المرور" },
  { name: "passwordConfirm", placeholder: "تأكيد كلمة المرور" },
] as const;

export default function AddAdminForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<AdminSchema>({
    resolver: zodResolver(adminSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      role: "admin",
    },
  });

  async function onSubmit(data: AdminSchema) {
    try {
      await api.post("/super-admin", data);

      toast.success("تمت الإضافة بنجاح!");

      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error) || "Login failed. Please try again.");
    }
  }

  return (
    <DialogContent className="sm:max-w-120">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <DialogHeader>
          <DialogTitle>إضافة مشرف جديد</DialogTitle>
          <DialogDescription>
            قم بإدخال بيانات المشرف الجديد. سيتم إرسال بريد تفعيل تلقائياً.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FieldSet>
            <FieldGroup className="gap-5">
              {FORM_FIELDS.map((f) => (
                <Controller
                  key={f.name}
                  name={f.name}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="space-y-0.5"
                    >
                      {f.name === "password" || f.name === "passwordConfirm" ? (
                        <div className="relative">
                          <Input
                            {...field}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="كلمة المرور"
                            className=""
                            aria-invalid={fieldState.invalid}
                          />

                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                          >
                            {showPassword ? (
                              <Eye className={`size-5 cursor-pointer`} />
                            ) : (
                              <EyeOff className={`size-5 cursor-pointer`} />
                            )}
                          </button>
                        </div>
                      ) : (
                        <Input
                          {...field}
                          id={f.name}
                          type={f.name}
                          placeholder={f.placeholder}
                          className=""
                          aria-invalid={fieldState.invalid}
                        />
                      )}

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
                        className={`text-right`}
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
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">إلغاء</Button>
          </DialogClose>
          <Button disabled={isSubmitting} type="submit">
            {!isSubmitting ? "إنشاء الحساب" : "جاري الإنشاء..."}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
