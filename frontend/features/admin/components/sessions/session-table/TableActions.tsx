import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { Eye, MoreVertical, OctagonX, Trash2 } from "lucide-react";

import { AdminSession } from "@/features/admin/types/session";

interface Props {
  session: AdminSession;
}

export default function TableActions({ session }: Props) {
  return (
    <DropdownMenu dir="rtl">
      {/* Trigger button */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      {/* Menu content */}
      <DropdownMenuContent align="end" className="w-52">
        {/* Menu Label */}
        <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>

        {/* Separator */}
        <DropdownMenuSeparator />

        {/* Session details menu item */}
        <DropdownMenuItem className="gap-2 cursor-pointer">
          <Eye className="w-4 h-4 text-primary" /> عرض التفاصيل
        </DropdownMenuItem>

        {/* Stop session menu item if session is in progress */}
        {session.status.label === "شغالة الآن" && (
          <DropdownMenuItem className="gap-2 cursor-pointer text-destructive dark:text-destructive hover:dark:text-accent-foreground">
            <OctagonX className="w-4 h-4" /> إيقاف المباراة
          </DropdownMenuItem>
        )}

        {/* Delete session menu item if session is not in progress */}
        {session.status.label !== "شغالة الآن" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer text-destructive dark:text-destructive hover:dark:text-accent-foreground">
              <Trash2 className="w-4 h-4" /> حذف السجل
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
