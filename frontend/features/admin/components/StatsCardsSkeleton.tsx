import { Skeleton } from "@/components/ui/skeleton";

const StatsCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Skeleton className={`h-36 w-full`} />
      <Skeleton className={`h-36 w-full`} />
      <Skeleton className={`h-36 w-full`} />
      <Skeleton className={`h-36 w-full`} />
    </div>
  );
};

export default StatsCardsSkeleton;
