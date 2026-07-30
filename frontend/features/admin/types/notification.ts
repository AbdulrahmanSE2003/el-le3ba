import { LucideIcon } from "lucide-react";

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

export interface NotificationsStatsRes {
  status: boolean;
  stats: {
    totalCampaigns: { value: number };
    readNotifications: { value: number };
    readRate: { value: number };
    totalRecipients: { value: number };
  };
}

export interface NotificationCampaign {
  _id: string;
  title: string;
  message: string;
  type: string;
  recipientsCount: number;
  createdBy: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface NotificationCampaignsRes {
  campaigns: {
    campaigns: NotificationCampaign[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  };
}

export type PaginationBtn = {
  title: string;
  icon?: LucideIcon;
  disabled?: boolean;
}
