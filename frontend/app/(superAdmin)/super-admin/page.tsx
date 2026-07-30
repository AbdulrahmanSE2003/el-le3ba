import {
  Users,
  FileText,
  LogIn,
  UserCheck,
  UserPlus,
  ArrowLeft,
  BellRing,
  UserX,
  Shield,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// STATIC DATA
const STATS = [
  {
    title: "المسؤولين",
    value: "6",
    icon: Users,
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    title: "سجلات المراجعة",
    value: "14,320",
    icon: FileText,
    color: "text-purple-500 bg-purple-500/10",
  },
  {
    title: "تسجيلات الدخول",
    value: "218",
    icon: LogIn,
    color: "text-emerald-500 bg-emerald-500/10",
  },
  {
    title: "المسؤولين النشطين",
    value: "3",
    icon: UserCheck,
    color: "text-amber-500 bg-amber-500/10",
  },
];

const RECENT_ACTIVITIES = [
  {
    id: "1",
    text: "سجل عبدو دخوله إلى النظام",
    time: "اليوم",
    icon: LogIn,
    color: "text-emerald-500 bg-emerald-500/10",
  },
  {
    id: "2",
    text: "أرسل أحمد إشعارًا عامًا",
    time: "اليوم",
    icon: BellRing,
    color: "text-purple-500 bg-purple-500/10",
  },
  {
    id: "3",
    text: "أنشأ عمر حساب مسؤول جديد",
    time: "أمس",
    icon: UserPlus,
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    id: "4",
    text: "قام أحمد بتعطيل حساب مستخدم",
    time: "منذ يومين",
    icon: UserX,
    color: "text-rose-500 bg-rose-500/10",
  },
];

const NEWEST_ADMINS = [
  { id: "1", name: "عبدو", role: "مسؤول", created: "اليوم" },
  { id: "2", name: "أحمد", role: "مسؤول", created: "أمس" },
];

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            لوحة تحكم المسؤول الرئيسي
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            نظرة عامة على نشاط النظام والإحصائيات الحالية
          </p>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {stat.title}
                </span>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Admin Activity */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">نشاط المسؤولين الأخير</h2>
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
              عرض الكل
              <ArrowLeft className="h-3.5 w-3.5" />
            </Button>
          </div>

          <Separator className="bg-border" />

          <div className="divide-y divide-border">
            {RECENT_ACTIVITIES.map((act) => {
              const Icon = act.icon;
              return (
                <div
                  key={act.id}
                  className="flex items-center justify-between py-3 text-sm first:pt-0 last:pb-0 transition-colors hover:bg-muted/30 px-2 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${act.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-foreground">
                      {act.text}
                    </span>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {act.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold">إجراءات سريعة</h2>
          <Separator className="bg-border" />
          <div className="flex flex-col gap-3 pt-1">
            <Button className="w-full justify-start gap-2 h-10">
              <UserPlus className="h-4 w-4" />
              إضافة مسؤول جديد
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 h-10"
            >
              <FileText className="h-4 w-4" />
              عرض سجلات المراجعة
            </Button>
          </div>
        </div>
      </div>

      {/* Newest Admins Table */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
        <h2 className="text-base font-semibold">أحدث المسؤولين</h2>
        <Separator className="bg-border" />

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="pb-3 font-medium">الاسم</th>
                <th className="pb-3 font-medium">الدور</th>
                <th className="pb-3 font-medium">تاريخ الإنشاء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {NEWEST_ADMINS.map((admin) => (
                <tr key={admin.id} className="group">
                  <td className="py-3 font-medium text-foreground">
                    {admin.name}
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      <Shield className="h-3 w-3" />
                      {admin.role}
                    </span>
                  </td>
                  <td className="py-3 text-muted-foreground">
                    {admin.created}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
