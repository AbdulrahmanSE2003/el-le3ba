import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export const RecentAdminLogsSkeleton = () => {
  return (
    <ScrollArea dir="rtl" className="h-80 p-2 border-0 rounded-md">
      <div className="divide-y divide-border">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 text-sm first:pt-0 last:pb-0 px-2"
          >
            <div className="flex items-center gap-3">
              {/* Icon Container Skeleton */}
              <Skeleton className="h-8 w-8 rounded-lg" />

              {/* Title & Actor Name Skeleton */}
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="h-3 w-20 rounded-md" />
              </div>
            </div>

            {/* Date Skeleton */}
            <Skeleton className="h-3 w-16 rounded-md" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default RecentAdminLogsSkeleton;
