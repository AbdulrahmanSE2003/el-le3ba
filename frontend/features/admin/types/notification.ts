export type NotificationType =
  | "announcement"
  | "match_reminder"
  | "warning"
  | "achievement";

export type NotificationAudienceType = "all" | "team" | "event" | "user";
export type NotificationStatus = "sent" | "scheduled" | "failed";

export interface NotificationAudience {
  type: NotificationAudienceType;
  label: string;
}

export interface AdminNotification {
  _id: string;
  title: string;
  message: string;
  type: NotificationType;
  audience: NotificationAudience;
  status: NotificationStatus;
  recipientsCount: number;
  readCount: number;
  sentAt: string | null;
  scheduledFor: string | null;
  createdAt: string;
}
