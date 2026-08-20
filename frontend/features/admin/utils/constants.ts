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
  BellDot,
  BellRing,
  FileQuestion,
  LogIn,
  Pencil,
  UserPlus,
  Users,
  LucideIcon,
  UserX,
  KeyRound,
  CalendarClock,
  BellMinus,
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
    href: "/admin/seasons",
    icon: CalendarCog,
  },
  {
    title: "الأحداث",
    href: "/admin/events",
    icon: CalendarClock,
  },
  {
    title: "المباريات",
    href: "/admin/sessions",
    icon: Play,
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
];

export const quickActions = [
  {
    title: "إضافة مستخدم",
    icon: UserPlus,
    className:
      "bg-primary/10 text-primary group-hover:bg-primary/70 group-hover:text-white",
    desc: "إنشاء حساب مستخدم جديد",
    component: AddUserModal,
  },
  // {
  //   title: "إعدادات النظام",
  //   icon: Settings,
  //   className:
  //     "bg-slate-500/20 text-slate-500 group-hover:bg-slate-500/75 group-hover:text-white",
  //   desc: "تعديل تفضيلات المنصة",
  // },
  {
    title: "توليد تقرير",
    icon: FileText,
    className:
      "bg-emerald-500/20 text-emerald-500  group-hover:bg-emerald-500/75 group-hover:text-white",
    desc: "تصدير البيانات بصيغة PDF",
  },
  {
    title: "إرسال إشعار",
    icon: Bell,
    className:
      "bg-accent/15 text-accent group-hover:bg-accent group-hover:text-white",
    desc: "إرسال إشعارات أو تنبيهات",
    component: SendNotification,
  },
  {
    title: "جدولة حدث",
    icon: CalendarDaysIcon,
    className:
      "bg-purple-500/20 text-purple-500 group-hover:bg-purple-500 group-hover:text-white",
    desc: "نظّم تقويم الأحداث",
  },
  {
    title: "جدولة موسم",
    icon: CalendarClock,
    className:
      "bg-purple-500/20 text-purple-500 group-hover:bg-purple-500 group-hover:text-white",
    desc: "نظّم تقويم المواسم",
    component: CreateSeasonModal,
  },
  {
    title: "سجل الأمان",
    icon: ShieldAlert,
    className:
      "bg-rose-500/20 text-rose-500 group-hover:bg-rose-500 group-hover:text-white",
    desc: "مراجعة محاولات الدخول",
  },
];

export interface ActionConfig {
  icon: LucideIcon;
  title: string;
  color: string;
}

export const ACTIONS: Record<string, ActionConfig> = {
  "user.login": {
    icon: LogIn,
    title: "تسجيل دخول",
    color: "text-blue-500 bg-blue-500/10",
  },
  "notification.broadcast": {
    icon: BellRing,
    title: "إشعار عام",
    color: "text-purple-500 bg-purple-500/10",
  },
  "notification.bulk_sent": {
    icon: BellDot,
    title: "إشعار لمستخدمين محددين",
    color: "text-indigo-500 bg-indigo-500/10",
  },
  "notification.deleted": {
    icon: BellMinus,
    title: "حذف إشعار",
    color: "text-rose-500 bg-rose-500/10",
  },
  "question.bulk_created": {
    icon: FileQuestion,
    title: "إضافة أسئلة",
    color: "text-emerald-500 bg-emerald-500/10",
  },
  "question.deleted": {
    icon: FileQuestion,
    title: "حذف سؤال",
    color: "text-rose-500 bg-rose-500/10",
  },
  "user.created": {
    icon: UserPlus,
    title: "إضافة مستخدم",
    color: "text-rose-500 bg-rose-500/10",
  },
  "super_admin.created": {
    icon: UserPlus,
    title: "إضافة سوبر أدمن",
    color: "text-amber-500 bg-amber-500/10",
  },
  "admin.created": {
    icon: UserPlus,
    title: "إضافة أدمن",
    color: "text-yellow-500 bg-yellow-500/10",
  },
  "user.updated": {
    icon: Pencil,
    title: "تعديل مستخدم",
    color: "text-amber-500 bg-amber-500/10",
  },
  "user.bulk_deactivated": {
    icon: Pencil,
    title: "تعديل المستخدمين",
    color: "text-yellow-500 bg-yellow-500/10",
  },
  "user.deactivated": {
    icon: UserX,
    title: "تعطيل مستخدم",
    color: "text-rose-500 bg-rose-500/10",
  },
  "team.created": {
    icon: Users,
    title: "إنشاء فريق",
    color: "text-cyan-500 bg-cyan-500/10",
  },
  "user.password_changed": {
    icon: KeyRound,
    title: "تغيير كلمة المرور",
    color: "text-amber-500 bg-amber-500/10",
  },
};

import { Shield, ClipboardList, UserRoundCog } from "lucide-react";
import { AddUserModal } from "../components/users/AddUserModal";
import SendNotification from "../components/notifications/send-notification/SendNotification";
import CreateSeasonModal from "../components/seasons/CreateSeasonModal";

export const superAdminNav = [
  {
    title: "اللوحة الرئيسية",
    href: "/super-admin",
    icon: LayoutDashboard,
  },
  {
    title: "المشرفون",
    href: "/super-admin/admins",
    icon: UserRoundCog,
  },
  {
    title: "سجل الإجراءات",
    href: "/super-admin/logs",
    icon: ClipboardList,
  },
  {
    title: "الإعدادات",
    href: "/super-admin/settings",
    icon: Settings2Icon,
  },
  {
    title: "الملف الشخصي",
    href: "/super-admin/profile",
    icon: Shield,
  },
];

export const seasonStatusOptions = [
  {
    label: "الكل",
    value: "",
  },
  {
    label: "قادم",
    value: "upcoming",
  },
  {
    label: "نشط",
    value: "active",
  },
  {
    label: "إقصائيات",
    value: "knockout",
  },
  {
    label: "منتهي",
    value: "ended",
  },
];

export const seasonSortOptions = [
  {
    label: "الأحدث إنشاءً",
    value: "-createdAt",
  },
  {
    label: "الأقدم إنشاءً",
    value: "createdAt",
  },
  {
    label: "تاريخ البداية - الأقرب",
    value: "startDate",
  },
  {
    label: "تاريخ البداية - الأبعد",
    value: "-startDate",
  },
  {
    label: "تاريخ النهاية - الأقرب",
    value: "endDate",
  },
  {
    label: "تاريخ النهاية - الأبعد",
    value: "-endDate",
  },
  {
    label: "الاسم تصاعديًا",
    value: "title",
  },
  {
    label: "الاسم تنازليًا",
    value: "-title",
  },
];
