"use client";

import { formatCreatedAt } from "@/lib/utils";
import { INotificationItem } from "@/shared/api/helpers";
import { markNotificationAsRead } from "../api/notifications";

interface Props {
  notification: INotificationItem;
}

const NotificationItem = ({ notification }: Props) => {
  return (
    <div
      onClick={() => markNotificationAsRead(notification._id)}
      className={`flex flex-row-reverse items-start gap-3 rounded-md border p-3.5 text-right transition-colors ${
        notification.isRead
          ? "border-border/60 bg-muted/10"
          : "cursor-pointer border-primary/15 bg-primary/5 hover:bg-primary/10"
      }`}
    >
      <div className="flex-1 space-y-1">
        <div className="flex flex-row-reverse items-center justify-between">
          <span className="text-[10px] font-medium text-muted-foreground">
            {formatCreatedAt(notification.createdAt)}
          </span>

          <span className="font-display text-sm font-bold text-foreground">
            {notification.title}
          </span>
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground/90">
          {notification.message}
        </p>
      </div>
    </div>
  );
};

export default NotificationItem;
