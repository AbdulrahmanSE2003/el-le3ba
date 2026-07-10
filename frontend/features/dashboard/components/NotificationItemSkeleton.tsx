import { Skeleton } from "@/components/ui/skeleton";

const NotificationItemSkeleton = () => {
  return (
    <div className="flex flex-row-reverse items-start gap-3 rounded-md border p-3.5">
      <div className="flex-1 space-y-2">
        <div className="flex flex-row-reverse items-center justify-between">
          <Skeleton className="h-3 w-14" />
          <Skeleton className="h-4 w-32" />
        </div>

        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>
  );
};

export default NotificationItemSkeleton;
