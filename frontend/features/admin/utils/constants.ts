import { NavItem } from "@/components/sidebar/types";
import {
  BadgeQuestionMark,
  Bell,
  CalendarCog,
  CalendarDaysIcon,
  FileText,
  LayoutDashboard,
  Medal,
  Play,
  Settings,
  Settings2Icon,
  ShieldAlert,
  UserCog,
  UserPlus,
  Users,
} from "lucide-react";

export const adminNavItems: NavItem[] = [
  {
    title: "لوحة الإدارة",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "المستخدمون",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "الفرق",
    href: "/admin/teams",
    icon: UserCog,
  },
  {
    title: "المواسم",
    href: "/admin/events",
    icon: CalendarCog,
  },
  {
    title: "لوحة الصدارة",
    href: "/admin/leaderboard",
    icon: Medal,
  },
  {
    title: "الإشعارات",
    href: "/admin/notifications",
    icon: Bell,
  },
  {
    title: "الأسألة",
    href: "/admin/questions",
    icon: BadgeQuestionMark,
  },
  {
    title: "المباريات",
    href: "/admin/sessions",
    icon: Play,
  },
  {
    title: "الإعدادات",
    href: "/admin/settings",
    icon: Settings2Icon,
  },
];

export const quickActions = [
  {
    title: "إضافة مستخدم",
    icon: UserPlus,
    className:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/30 group-hover:text-white",
    desc: "إنشاء حساب مستخدم جديد",
  },
  {
    title: "إعدادات النظام",
    icon: Settings,
    className:
      "bg-slate-500/10 text-slate-600 dark:text-slate-400 group-hover:bg-slate-500/30 group-hover:text-white",
    desc: "تعديل تفضيلات المنصة",
  },
  {
    title: "توليد تقرير",
    icon: FileText,
    className:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/30 group-hover:text-white",
    desc: "تصدير البيانات بصيغة PDF",
  },
  {
    title: "إرسال إشعار",
    icon: Bell,
    className:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500/30 group-hover:text-white",
    desc: "إرسال إشعارات أو تنبيهات",
  },
  {
    title: "سجل الأمان",
    icon: ShieldAlert,
    className:
      "bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:bg-rose-500/30 group-hover:text-white",
    desc: "مراجعة محاولات الدخول",
  },
  {
    title: "جدولة حدث",
    icon: CalendarDaysIcon,
    className:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500/30 group-hover:text-white",
    desc: "نظّم تقويم الأحداث",
  },
];
