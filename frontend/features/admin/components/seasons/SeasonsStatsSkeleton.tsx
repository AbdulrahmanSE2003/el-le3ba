import { Skeleton } from "@/components/ui/skeleton";

const SeasonsStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col justify-between rounded-xl border bg-card p-6 shadow-sm"
        >
          <div className="flex items-center justify-between space-x-4 space-x-reverse">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-5 rounded-md" />
          </div>
          <div className="mt-4">
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeasonsStatsSkeleton;