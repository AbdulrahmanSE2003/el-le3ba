import {
  CalendarDays,
  Gamepad2,
  LayoutDashboard,
  Settings,
  Trophy,
  User,
  Users,
} from "lucide-react";
import { NavItem } from "./types";

export const userNavItems: NavItem[] = [
  {
    title: "الرئيسية",
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
    title: "فريقـي",
    href: "/team",
    icon: Users,
  },
  {
    title: "حسابي",
    href: "/profile",
    icon: User,
  },
];
