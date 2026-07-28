import {
  Ban,
  BellRing,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MailCheck,
} from "lucide-react";

import notificationsData from "./notifications.json";
import { AdminNotification } from "@/features/admin/types/notification";

export const notifications = notificationsData as AdminNotification[];

const sentNotifications = notifications.filter((n) => n.status === "sent");
const scheduledCount = notifications.filter(
  (n) => n.status === "scheduled",
).length;
const failedCount = notifications.filter((n) => n.status === "failed").length;

const avgReadRate = sentNotifications.length
  ? Math.round(
      (sentNotifications.reduce(
        (sum, n) => sum + n.readCount / n.recipientsCount,
        0,
      ) /
        sentNotifications.length) *
        100,
    )
  : 0;

export const notificationsKpis = [
  {
    title: "إجمالي الإشعارات المرسلة",
    value: sentNotifications.length,
    icon: BellRing,
    iconClassName: "text-primary",
    bgClassName: "bg-primary/10",
  },
  {
    title: "متوسط نسبة القراءة",
    value: `${avgReadRate}%`,
    icon: MailCheck,
    iconClassName: "text-emerald-500",
    bgClassName: "bg-emerald-500/10",
  },
  {
    title: "مجدولة",
    value: scheduledCount,
    icon: CalendarClock,
    iconClassName: "text-sky-500",
    bgClassName: "bg-sky-500/10",
  },
  {
    title: "فشل الإرسال",
    value: failedCount,
    icon: Ban,
    iconClassName: "text-red-500",
    bgClassName: "bg-red-500/10",
  },
];

export const notificationTypes = [
  { label: "كل الأنواع", value: "all" },
  { label: "تنبيه عام", value: "announcement" },
  { label: "تذكير بمباراة", value: "match_reminder" },
  { label: "تحذير / حظر", value: "warning" },
  { label: "إنجاز", value: "achievement" },
];

export const notificationAudiences = [
  { label: "كل الجماهير", value: "all" },
  { label: "كل المستخدمين", value: "all_users" },
  { label: "فريق معين", value: "team" },
  { label: "موسم/بطولة", value: "event" },
  { label: "مستخدم واحد", value: "user" },
];

export const notificationStatuses = [
  { label: "كل الحالات", value: "all" },
  { label: "اترسل", value: "sent" },
  { label: "مجدول", value: "scheduled" },
  { label: "فشل", value: "failed" },
];

export const notificationsSortBy = [
  { value: "recent", label: "الأحدث" },
  { value: "readRate", label: "الأعلى قراءة" },
  { value: "recipients", label: "الأكثر مستلمين" },
];

export const notificationsTable = {
  tableHeaders: [
    "الإشعار",
    "النوع",
    "الجمهور",
    "المستلمين",
    "نسبة القراءة",
    "الحالة",
    "الإجراءات",
  ],
  notifications,
};

export const paginationBtns = [
  {
    title: "الصفحة الأولى",
    icon: ChevronsRight,
  },
  {
    title: "الصفحة السابقة",
    icon: ChevronRight,
  },
  {
    title: "رقم الصفحة",
  },
  {
    title: "الصفحة التالية",
    icon: ChevronLeft,
  },
  {
    title: "الصفحة الأخيرة",
    icon: ChevronsLeft,
  },
];
