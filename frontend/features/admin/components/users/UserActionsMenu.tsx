"use client";

import { MoreVertical, KeyRound, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditUserModal, EditUserModalProps } from "./EditUserModal";
import { BlockUserModal } from "./BlockUserModal";
import { ResetPasswordModal } from "./ResetPasswordModal";

export function UserActionsMenu({ user }: EditUserModalProps) {
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>إجراءات المستخدم</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <EditUserModal user={user} />

        {user.isActive && (
          <>
            <DropdownMenuItem className="gap-2 cursor-pointer pr-2.5">
              <Bell className="w-4 h-4 text-chart-5" /> إرسال إشعار
            </DropdownMenuItem>
            <ResetPasswordModal userId={user._id} userName={user.name} />
            <DropdownMenuSeparator />
            <BlockUserModal userId={user._id} userName={user.name} />
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
