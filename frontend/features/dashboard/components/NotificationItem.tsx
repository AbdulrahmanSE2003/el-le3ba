"use client";

import { formatCreatedAt } from "@/lib/utils";

export interface INotificationItem {
  _id: string;
  title: string;
  message: string;
  userId: string;
  isRead: boolean;
  isBroadcast: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  notification: INotificationItem;
  onRead: (id: string) => void;
}

const NotificationItem = ({ notification, onRead }: Props) => {
  const handleClick = () => {
    if (notification.isRead) return;

    onRead(notification._id);
  };

  return (
    <div
      onClick={handleClick}
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
