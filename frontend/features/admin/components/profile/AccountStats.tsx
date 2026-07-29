import { Separator } from "@/components/ui/separator";
import { BarChart3 } from "lucide-react";
import { getProfileStats } from "../../api/shared";
import Error from "@/app/error";
import { formatCreatedAt } from "@/lib/utils";

const AccountStats = async () => {
  const statsRes = await getProfileStats();
  if (!statsRes.success) return <Error />;

  const stats = statsRes.data.profileStats;
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-primary" />
        <h2 className="text-base font-semibold">إحصائيات الحساب</h2>
      </div>
      <Separator className="bg-border" />
      <div className={`grid md:grid-cols-4 gap-4`}>
        <div className="rounded-lg bg-muted/50 p-4 border border-border group shadow text-right">
          <p className="text-xs text-muted-foreground">إجمالي الإجراءات</p>
          <p className="text-md font-bold mt-2 text-foreground group-hover:text-primary transition-colors duration-300">
            {stats.totalActions}{" "}
          </p>
        </div>
        <div className="rounded-lg bg-muted/50 p-4 border border-border group shadow text-right">
          <p className="text-xs text-muted-foreground">آخر تسجيل دخول</p>
          <p className="text-md font-bold mt-2 text-foreground group-hover:text-primary transition-colors duration-300">
            {formatCreatedAt(stats.lastLogin)}{" "}
          </p>
        </div>
        <div className="rounded-lg bg-muted/50 p-4 border border-border group shadow text-right">
          <p className="text-xs text-muted-foreground">إجمالي الإشعارات</p>
          <p className="text-md font-bold mt-2 text-foreground group-hover:text-primary transition-colors duration-300">
            {stats.totalNotifications}{" "}
          </p>
        </div>
        <div className="rounded-lg bg-muted/50 p-4 border border-border group shadow text-right">
          <p className="text-xs text-muted-foreground">
            إجمالي الأسألة المنشأة
          </p>
          <p className="text-md font-bold mt-2 text-foreground group-hover:text-primary transition-colors duration-300 ">
            {stats.totalQuestions}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountStats;
