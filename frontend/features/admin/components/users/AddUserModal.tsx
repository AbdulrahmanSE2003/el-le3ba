"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BaseModal } from "@/features/admin/components/shared/BaseModal";
import { UserForm } from "@/features/admin/components/users/UserForm";
import { type CreateUserFormValues } from "@/features/admin/schema/userSchema";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { createUserAction } from "@/features/admin/actions/user.actions";
import { toast } from "sonner";

export function AddUserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateUser = async (data: CreateUserFormValues) => {
    setIsLoading(true);
    try {
      const response = await createUserAction(data);
      if (response.success) {
        toast.success("تمت إضافة المستخدم بنجاح!");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء إضافة المستخدم، يرجى المحاولة لاحقاً.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <UserPlus className="ml-2 h-4 w-4" /> إضافة مستخدم جديد
      </Button>

      <BaseModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="إضافة مستخدم جديد"
        description="أدخل بيانات المستخدم لتسجيله في النظام."
      >
        <UserForm
          mode="create"
          onSubmit={handleCreateUser}
          isLoading={isLoading}
        />
      </BaseModal>
    </>
  );
}
