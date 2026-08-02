"use client";

import { formatCreatedAt } from "@/lib/utils";
import { INotificationItem } from "@/shared/api/helpers";
import { markNotificationAsRead } from "../api/notifications";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/api/client";

interface Props {
  notification: INotificationItem;
}

const NotificationItem = ({ notification }: Props) => {
  const handleRead = (id: typeof notification._id) => {
    try {
      markNotificationAsRead(id);
      toast.success("تم تعليم الإشعار كمقروء.");
    } catch (error) {
      toast.error(
        getErrorMessage(error) || "حدث خطأ أثناء تعليم الإشعار كمقروء.",
      );
    }
  };
  return (
    <div
      onClick={() => handleRead(notification._id)}
      className={`flex flex-row-reverse items-start gap-3 rounded-md border p-3.5 text-right transition-colors ${
        notification.isRead
          ? "border-border/60 bg-muted/10"
          : "cursor-pointer border-primary/20 bg-primary/10 hover:bg-primary/15"
      }`}
    >
      <div className="flex-1 space-y-1">
        <div className="flex flex-row-reverse items-center justify-between">
          <span className="text-[10px] font-medium text-muted-foreground">
            {formatCreatedAt(notification.createdAt)}
          </span>

          <span className="font-display text-sm font-bold text-foreground">
            {notification.campaignId.title}
          </span>
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground/90">
          {notification.campaignId.message}
        </p>
      </div>
    </div>
  );
};

export default NotificationItem;
