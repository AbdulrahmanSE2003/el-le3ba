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
        <DropdownMenuItem className="gap-2 cursor-pointer">
          <KeyRound className="w-4 h-4 text-primary" /> إعادة ضبط كلمة السر
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 cursor-pointer">
          <Bell className="w-4 h-4 text-chart-5" /> إرسال إشعار
        </DropdownMenuItem>
        {user.isActive && (
          <>
            <DropdownMenuSeparator />
            <BlockUserModal userId={user._id} userName={user.name} />
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
