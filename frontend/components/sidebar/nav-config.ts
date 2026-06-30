import {
  CalendarDays,
  Gamepad2,
  LayoutDashboard,
  Settings,
  Shield,
  Trophy,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export const userNavItems: NavItem[] = [
  {
    title: "لوحة التحكم",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "المباراة",
    href: "/match",
    icon: Gamepad2,
    badge: "جديد",
  },
  {
    title: "المتصدرون",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    title: "الملف الشخصي",
    href: "/profile",
    icon: User,
  },
];

export const adminNavItems: NavItem[] = [
  {
    title: "لوحة الإدارة",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "المستخدمون",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "المباريات",
    href: "/admin/matches",
    icon: CalendarDays,
  },
  {
    title: "الإعدادات",
    href: "/admin/settings",
    icon: Settings,
  },
];
