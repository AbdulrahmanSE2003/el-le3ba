import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity } from "lucide-react";

export const RecentActivitySkeleton = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Activity className="h-4 w-4 text-primary" />
        <h2 className="text-base font-semibold">النشاط الأخير</h2>
      </div>

      <Separator className="bg-border" />

      {/* Activity List */}
      <div className="divide-y divide-border">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-2 rounded-full" />
              <Skeleton className="h-4 w-44 rounded-md" />
            </div>
            <Skeleton className="h-3 w-20 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivitySkeleton;
