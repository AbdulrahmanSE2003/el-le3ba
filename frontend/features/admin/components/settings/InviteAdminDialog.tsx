"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showError, showSuccess } from "@/components/shared/notifications";
import { inviteAdmin } from "@/features/admin/actions/settings";
import { AdminRole } from "@/features/admin/types/settings";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteAdminDialog({ open, onOpenChange }: Props) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AdminRole>("admin");
  const [isPending, setIsPending] = useState(false);

  function reset() {
    setEmail("");
    setRole("admin");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);

    const result = await inviteAdmin(email, role);

    if (result.success) {
      showSuccess(result.message || "تم إرسال الدعوة");
      reset();
      onOpenChange(false);
    } else {
      showError(result.error || "حصل مشكلة أثناء الإضافة");
    }

    setIsPending(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>إضافة أدمن جديد</DialogTitle>
            <DialogDescription>
              اكتب البريد الإلكتروني، وهنبعتله دعوة لتفعيل صلاحيات الإدارة.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                البريد الإلكتروني
              </label>
              <Input
                type="email"
                required
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="text-right bg-background"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                الصلاحية
              </label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as AdminRole)}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">أدمن</SelectItem>
                  <SelectItem value="superAdmin">سوبر أدمن</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
            >
              إلغاء
            </Button>
            <Button type="submit" disabled={isPending || !email.trim()}>
              {isPending ? "جاري الإرسال..." : "إرسال الدعوة"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
