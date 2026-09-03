"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { MoreVertical } from "lucide-react";

import { NotificationCampaign } from "@/features/admin/types/notification";

import { ViewNotificationModal } from "../notification-modals/show-details-modal/ViewNotificationModal";

import { DeleteNotificationModal } from "../notification-modals/delete-modal/DeleteNotificationModal";

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
        <ViewNotificationModal notification={notification} />

        <DropdownMenuSeparator />

        {/* Delete record */}
        <DeleteNotificationModal notification={notification} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
