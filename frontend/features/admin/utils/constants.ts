import { NavItem } from "@/components/sidebar/types";
import {
  BadgeQuestionMark,
  Bell,
  BellCheck,
  CalendarCog,
  LayoutDashboard,
  Medal,
  Play,
  Settings2Icon,
  UserCog,
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
