import { Separator } from "@/components/ui/separator";
import { Activity } from "lucide-react";

const recentActivities = [
  { action: "تسجيل دخول للنظام", time: "منذ 5 دقائق" },
  { action: "إنشاء حدث جديد", time: "أمس" },
  { action: "تعديل بيانات المستخدم أحمد", time: "منذ يومين" },
  { action: "إرسال إشعار عام", time: "منذ 3 أيام" },
];

const RecentActivity = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <Activity className="h-4 w-4 text-primary" />
        <h2 className="text-base font-semibold">النشاط الأخير</h2>
      </div>
      <Separator className="bg-border" />

      <div className="divide-y divide-border">
        {recentActivities.map((act, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-3 text-sm first:pt-0 last:pb-0"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="font-medium text-foreground">{act.action}</span>
            </div>
            <span className="text-xs text-muted-foreground">{act.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
