import { getRecentAdminsLogs } from "../api/shared";
import Error from "@/app/error";
import { formatCreatedAt, getLogActionDetails } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const RecentAdminLogs = async () => {
  const recentLogsRes = await getRecentAdminsLogs();
  if (!recentLogsRes.success) return <Error />;

  const recentLogs = recentLogsRes.data.recentLogs;
  return (
    <ScrollArea dir="rtl" className="h-72 px-2 border-0 rounded-md ">
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
                  {log.actor.name && (
                    <span className="text-xs text-muted-foreground">
                      بواسطة: {log.actor.name}
                    </span>
                  )}
                </div>
              </div>

              <span className="text-xs text-muted-foreground">
                {formatCreatedAt(log.createdAt)}
              </span>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default RecentAdminLogs;
