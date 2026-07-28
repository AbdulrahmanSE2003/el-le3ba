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

export function UserActionsMenu({ userId }: { userId: string }) {
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
        <DropdownMenuItem
          className="gap-2 cursor-pointer"
          onClick={() => console.log("Edit", userId)}
        >
          <Edit className="w-4 h-4 text-primary" /> تعديل البيانات
        </DropdownMenuItem>
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
