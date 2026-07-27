"use client";

import { useState } from "react";
import { UserCog, UserPlus, Trash2, Crown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { formatDate } from "@/components/shared/formatted-date";
import { AdminAccount } from "@/features/admin/types/settings";

import { InviteAdminDialog } from "./InviteAdminDialog";
import { RemoveAdminAlert } from "./RemoveAdminAlert";

export function AdminManagementCard({
  initialAdmins,
  currentAdminId,
}: {
  initialAdmins: AdminAccount[];
  currentAdminId: string;
}) {
  const [admins] = useState(initialAdmins);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState<AdminAccount | null>(null);

  const superAdminCount = admins.filter((a) => a.role === "superAdmin").length;

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between gap-3 p-5 border-b border-border">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
            <UserCog className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              حسابات الإدارة
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              الأشخاص اللي عندهم صلاحية الوصول للوحة الإدارة.
            </p>
          </div>
        </div>

        <Button
          size="sm"
          className="gap-1.5 shrink-0"
          onClick={() => setInviteOpen(true)}
        >
          <UserPlus className="w-4 h-4" /> إضافة أدمن
        </Button>
      </div>

      <div className="divide-y divide-border">
        {admins.map((admin) => {
          const isLastSuperAdmin =
            admin.role === "superAdmin" && superAdminCount === 1;
          const isSelf = admin._id === currentAdminId;

          return (
            <div
              key={admin._id}
              className="flex items-center justify-between gap-3 p-4"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={admin.avatar || ""} />
                  <AvatarFallback className="text-xs text-muted-foreground">
                    {admin.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium text-foreground">
                      {admin.name}
                    </p>
                    {isSelf && (
                      <span className="text-[10px] text-muted-foreground">
                        (أنت)
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {admin.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className={
                    admin.role === "superAdmin"
                      ? "bg-accent/20 text-accent-foreground border-accent/30 gap-1 font-medium"
                      : "bg-primary/10 text-primary border-primary/20 font-medium"
                  }
                >
                  {admin.role === "superAdmin" && <Crown className="w-3 h-3" />}
                  {admin.role === "superAdmin" ? "سوبر أدمن" : "أدمن"}
                </Badge>

                <span className="hidden sm:inline text-xs text-muted-foreground">
                  منذ {formatDate(admin.addedAt)}
                </span>

                <Button
                  variant="ghost"
                  size="icon-sm"
                  disabled={isLastSuperAdmin}
                  title={
                    isLastSuperAdmin
                      ? "لازم يفضل سوبر أدمن واحد على الأقل"
                      : "إزالة الصلاحيات"
                  }
                  onClick={() => setRemoveTarget(admin)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <InviteAdminDialog open={inviteOpen} onOpenChange={setInviteOpen} />

      {removeTarget && (
        <RemoveAdminAlert
          adminId={removeTarget._id}
          adminName={removeTarget.name}
          open={!!removeTarget}
          onOpenChange={(open) => !open && setRemoveTarget(null)}
        />
      )}
    </div>
  );
}
