"use client";

import { MoreVertical, Edit, KeyRound, Bell, Ban } from "lucide-react";
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
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 cursor-pointer text-destructive">
          <Ban className="w-4 h-4" /> حظر
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
