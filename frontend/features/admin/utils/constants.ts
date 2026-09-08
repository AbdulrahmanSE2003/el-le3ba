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
  Globe,
  HelpCircle,
  Hash,
  Settings2Icon,
  UserCog,
  BellDot,
  BellRing,
  FileQuestion,
  LogIn,
  Pencil,
  PencilLine,
  UserPlus,
  UserRoundPlus,
  Users,
  LucideIcon,
  UserX,
  UserMinus,
  UserCheck,
  KeyRound,
  KeySquare,
  CalendarClock,
  BellMinus,
  CalendarX,
  CalendarRangeIcon,
  PlaySquare,
  CheckCircle2,
  Crown,
  LogOut,
  Send,
  Trash,
  Trash2,
  XCircle,
  ChartBarIncreasing,
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
    title: "إضافة سؤال",
    icon: FileText,
    className:
      "bg-slate-500/30 text-slate-500  group-hover:bg-slate-500/75 group-hover:text-white",
    desc: "أضف المزيد من المتعة إلى اللعبة.",
    component: AddQuestionModal,
  },
  {
    title: "إرسال إشعار",
    icon: Bell,
    className:
      "bg-amber-500/15 text-amber-500 group-hover:bg-amber-500 group-hover:text-white",
    desc: "إرسال إشعارات أو تنبيهات",
    component: SendNotification,
  },
  {
    title: "جدولة حدث",
    icon: CalendarDaysIcon,
    className:
      "bg-cyan-500/20 text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white",
    desc: "نظّم تقويم الأحداث",
    component: CreateEventModal
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
    title: "توليد تقرير",
    icon: FileText,
    className:
      "bg-emerald-500/20 text-emerald-500  group-hover:bg-emerald-500/75 group-hover:text-white",
    desc: "تصدير البيانات بصيغة PDF",
  },
];

export interface ActionConfig {
  icon: LucideIcon;
  title: string;
  color: string;
}

export const ACTIONS: Record<string, ActionConfig> = {
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
    icon: UserX,
    title: "تعطيل عدة مستخدمين",
    color: "text-rose-500 bg-rose-500/10",
  },
  "user.password_changed": {
    icon: KeyRound,
    title: "تغيير كلمة المرور",
    color: "text-amber-500 bg-amber-500/10",
  },
  "user.profile_updated": {
    icon: UserCog,
    title: "تعديل الملف الشخصي",
    color: "text-sky-500 bg-sky-500/10",
  },
  "user.password_reset": {
    icon: KeySquare,
    title: "إعادة تعيين كلمة المرور",
    color: "text-amber-500 bg-amber-500/10",
  },
  "user.deactivated": {
    icon: UserX,
    title: "تعطيل مستخدم",
    color: "text-rose-500 bg-rose-500/10",
  },
  "user.signup": {
    icon: UserRoundPlus,
    title: "تسجيل حساب جديد",
    color: "text-emerald-500 bg-emerald-500/10",
  },
  "user.login": {
    icon: LogIn,
    title: "تسجيل دخول",
    color: "text-blue-500 bg-blue-500/10",
  },
  "user.created": {
    icon: UserPlus,
    title: "إضافة مستخدم",
    color: "text-rose-500 bg-rose-500/10",
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
  "notification.sent_to_team": {
    icon: Send,
    title: "إرسال إشعار لفريق",
    color: "text-indigo-500 bg-indigo-500/10",
  },
  "question.created": {
    icon: FileQuestion,
    title: "إضافة سؤال",
    color: "text-emerald-500 bg-emerald-500/10",
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
  "question.updated": {
    icon: PencilLine,
    title: "تعديل سؤال",
    color: "text-sky-500 bg-sky-500/10",
  },
  "question.bulk_deleted": {
    icon: Trash2,
    title: "حذف أسئلة متعددة",
    color: "text-rose-500 bg-rose-500/10",
  },
  "season.created": {
    icon: CalendarRangeIcon,
    title: "إضافة موسم",
    color: "text-violet-500 bg-violet-500/10",
  },
  "season.updated": {
    icon: CalendarCog,
    title: "تعديل موسم",
    color: "text-amber-500 bg-amber-500/10",
  },
  "season.deleted": {
    icon: CalendarDaysIcon,
    title: "حذف موسم",
    color: "text-rose-500 bg-rose-500/10",
  },
  "event.created": {
    icon: CalendarDaysIcon,
    title: "إضافة حدث",
    color: "text-orange-500 bg-orange-500/10",
  },
  "event.updated": {
    icon: CalendarCog,
    title: "تعديل حدث",
    color: "text-amber-500 bg-amber-500/10",
  },
  "event.deleted": {
    icon: CalendarX,
    title: "حذف حدث",
    color: "text-rose-500 bg-rose-500/10",
  },
  "session.started": {
    icon: PlaySquare,
    title: "بدء جلسة",
    color: "text-green-500 bg-green-500/10",
  },
  "session.completed": {
    icon: CheckCircle2,
    title: "إكمال الجلسة",
    color: "text-emerald-500 bg-emerald-500/10",
  },
  "session.abandoned": {
    icon: XCircle,
    title: "تخلي عن الجلسة",
    color: "text-orange-500 bg-orange-500/10",
  },
  "team.created": {
    icon: Users,
    title: "إنشاء فريق",
    color: "text-cyan-500 bg-cyan-500/10",
  },
  "team.joined": {
    icon: UserCheck,
    title: "انضمام إلى فريق",
    color: "text-cyan-500 bg-cyan-500/10",
  },
  "team.left": {
    icon: LogOut,
    title: "مغادرة الفريق",
    color: "text-slate-500 bg-slate-500/10",
  },
  "team.captain_transferred": {
    icon: Crown,
    title: "نقل كابتن الفريق",
    color: "text-amber-500 bg-amber-500/10",
  },
  "team.member_removed": {
    icon: UserMinus,
    title: "إزالة عضو من الفريق",
    color: "text-rose-500 bg-rose-500/10",
  },
  "team.delete": {
    icon: Trash,
    title: "حذف الفريق تلقائياً",
    color: "text-rose-500 bg-rose-500/10",
  },
  "team.deleted": {
    icon: Trash2,
    title: "حذف فريق",
    color: "text-rose-500 bg-rose-500/10",
  },
  "team.bulk_deleted": {
    icon: Trash2,
    title: "حذف عدة فرق",
    color: "text-rose-500 bg-rose-500/10",
  },
};

import { Shield, ClipboardList, UserRoundCog } from "lucide-react";
import { AddUserModal } from "../components/users/AddUserModal";
import SendNotification from "../components/notifications/send-notification/SendNotification";
import CreateSeasonModal from "../components/seasons/CreateSeasonModal";
import CreateEventModal from "../components/events/CreateEventModal";
import { AddQuestionModal } from "../components/questions/question-modals/add-modal/AddQuestionModal";

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
];export interface QuestionTypeStyle {
  label: string;
  icon: LucideIcon;
  className: string;
}

export const QUESTION_TYPE_STYLES: Record<string, QuestionTypeStyle> = {
  mcq: {
    label: "MCQ",
    icon: Globe,
    className:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },

  numberexact: {
    label: "Number Exact",
    icon: Hash,
    className:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },

  // database: {
  //   label: "Database",
  //   icon: Database,
  //   className:
  //     "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  // },

  // programming: {
  //   label: "Programming",
  //   icon: Code2,
  //   className:
  //     "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  // },

  // devops: {
  //   label: "DevOps",
  //   icon: Cpu,
  //   className:
  //     "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  // },

  default: {
    label: "General",
    icon: HelpCircle,
    className: "bg-muted text-muted-foreground border-border",
  },
};

export function getQuestionTypeStyle(type: string): QuestionTypeStyle {
  return (
    QUESTION_TYPE_STYLES[type.toLowerCase().trim()] ??
    {
      ...QUESTION_TYPE_STYLES.default,
      label: type,
    }
  );
}