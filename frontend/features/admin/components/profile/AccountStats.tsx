import { Separator } from "@/components/ui/separator";
import { BarChart3 } from "lucide-react";

const stats = [
  { label: "إجمالي الإجراءات", value: "482" },
  { label: "آخر تسجيل دخول", value: "اليوم 09:15 ص" },
  { label: "الإشعارات المرسلة", value: "324" },
  { label: "الأسألة المضافة", value: "8" },
];

const AccountStats = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-primary" />
        <h2 className="text-base font-semibold">إحصائيات الحساب</h2>
      </div>
      <Separator className="bg-border" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="rounded-lg bg-muted/50 p-4 border border-border/50 text-right"
          >
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-lg font-bold mt-1 text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountStats;
