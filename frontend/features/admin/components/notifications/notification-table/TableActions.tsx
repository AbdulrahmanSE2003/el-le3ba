import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { CalendarX2, Eye, MoreVertical, RotateCw, Trash2 } from "lucide-react";

import { NotificationCampaign } from "@/features/admin/types/notification";

export default function TableActions({
  notification,
}: {
  notification: NotificationCampaign;
}) {
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

        {/* View notification details */}
        <DropdownMenuItem className="gap-2 cursor-pointer">
          <Eye className="w-4 h-4 text-primary" /> عرض التفاصيل
        </DropdownMenuItem>

        {/* Resend if it failed */}
        {/* {notification.status === "failed" && (
          <DropdownMenuItem className="gap-2 cursor-pointer text-sky-500 dark:text-sky-500">
            <RotateCw className="w-4 h-4" /> إعادة الإرسال
          </DropdownMenuItem>
        )} */}

        {/* Cancel schedule if it's scheduled */}
        {/* {notification.status === "scheduled" && (
          <DropdownMenuItem className="gap-2 cursor-pointer text-amber-500 dark:text-amber-500">
            <CalendarX2 className="w-4 h-4" /> إلغاء الجدولة
          </DropdownMenuItem>
        )} */}

        <DropdownMenuSeparator />

        {/* Delete record */}
        <DropdownMenuItem className="gap-2 cursor-pointer text-destructive dark:text-destructive hover:dark:text-accent-foreground">
          <Trash2 className="w-4 h-4" /> حذف السجل
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
