import { Skeleton } from "@/components/ui/skeleton";

const PageSkeleton = () => {
  return (
    <div className="flex flex-col gap-5">
      <Skeleton className={`h-32.5 w-full rounded-2xl`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Skeleton className={`h-30 rounded-2xl`} />
        <Skeleton className={`h-30 rounded-2xl`} />
        <Skeleton className={`h-30 rounded-2xl`} />
        <Skeleton className={`h-30 rounded-2xl`} />
      </div>
      <Skeleton className={`h-43.5 rounded-2xl`} />
      <Skeleton className={`h-80 rounded-2xl`} />
    </div>
  );
};

export default PageSkeleton;
