import {
  FileText,
  LogIn,
  UserPlus,
  ArrowLeft,
  BellRing,
  UserX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import QuickActions from "./QuickActions";
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

const MainContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Recent Admin Activity */}
      <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">نشاط المسؤولين الأخير</h2>
          <Button variant="link" size="sm" className="gap-1.5 text-xs" asChild>
            <Link href={"/super-admin/logs"}>
              عرض الكل
              <ArrowLeft className="size-4" />
            </Link>
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
      <QuickActions />
    </div>
  );
};

export default MainContent;
