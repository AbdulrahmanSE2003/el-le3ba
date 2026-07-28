"use client";

import {
  MoreVertical,
  Edit,
  Users,
  Crown,
  Bell,
  Ban,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TeamActionsMenuProps } from "../../types/teams";

export function TeamActionsMenu({
  teamId,
  onViewMembers,
}: TeamActionsMenuProps) {
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>إجراءات الفريق</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Members viw */}
        <DropdownMenuItem
          className="gap-2 cursor-pointer font-medium text-primary"
          onClick={() => onViewMembers?.(teamId)}
        >
          <Users className="w-4 h-4" /> عرض أعضاء الفريق
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Edit */}
        <DropdownMenuItem
          className="gap-2 cursor-pointer"
          onClick={() => console.log("Edit Team", teamId)}
        >
          <Edit className="w-4 h-4 text-muted-foreground" /> تعديل البيانات
        </DropdownMenuItem>

        {/* Change the captain */}
        <DropdownMenuItem
          className="gap-2 cursor-pointer"
          onClick={() => console.log("Change Leader", teamId)}
        >
          <Crown className="w-4 h-4 text-accent" /> تغيير قائد الفريق
        </DropdownMenuItem>

        {/* Send notification */}
        <DropdownMenuItem
          className="gap-2 cursor-pointer"
          onClick={() => console.log("Notify Team", teamId)}
        >
          <Bell className="w-4 h-4 text-chart-5" /> إرسال إشعار للأعضاء
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Ban */}
        <DropdownMenuItem
          className="gap-2 cursor-pointer text-destructive focus:text-background"
          onClick={() => console.log("Freeze Team", teamId)}
        >
          <Ban className="w-4 h-4" /> تجميد الفريق
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
