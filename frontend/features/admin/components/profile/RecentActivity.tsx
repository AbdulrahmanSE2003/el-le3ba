import { Separator } from "@/components/ui/separator";
import { Activity } from "lucide-react";
import { getRecentLogs } from "../../api/shared";
import Error from "@/app/error";
import { formatCreatedAt, getLogActionDetails } from "@/lib/utils";

const RecentActivity = async () => {
  const recentLogsRes = await getRecentLogs();
  if (!recentLogsRes.success) return <Error />;

  const recentLogs = recentLogsRes.data.recentLogs;
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <Activity className="h-4 w-4 text-primary" />
        <h2 className="text-base font-semibold">نشاطك الأخير</h2>
      </div>
      <Separator className="bg-border" />

      <div className="divide-y divide-border">
        {recentLogs.map((log) => {
          const { icon: Icon, title, color } = getLogActionDetails(log.action);

          return (
            <div
              key={log._id}
              className="flex items-center justify-between py-3 text-sm first:pt-0 last:pb-0 transition-colors hover:bg-muted/30 px-2 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{title}</span>
                  {log.action && (
                    <span className="text-xs text-muted-foreground">
                      {log.action}
                    </span>
                  )}
                </div>
              </div>

              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatCreatedAt(log.createdAt)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
