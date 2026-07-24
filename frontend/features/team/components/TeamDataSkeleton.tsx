import { Skeleton } from "@/components/ui/skeleton";

const TeamDataSkeleton = () => {
  return (
    <div className={`flex flex-col gap-y-6`}>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 ">
        <Skeleton className={`w-full h-26 rounded-2xl`} />
        <Skeleton className={`w-full h-26 rounded-2xl`} />
        <Skeleton className={`w-full h-26 rounded-2xl`} />
        <Skeleton className={`w-full h-26 rounded-2xl`} />
      </div>
      <div
        className={`bg-white hover:bg-white/80 dark:bg-card border border-border rounded-2xl p-6 shadow flex flex-col gap-y-3`}
      >
        <Skeleton className={`w-full h-18.5 rounded-2xl`} />
        <Skeleton className={`w-full h-18.5 rounded-2xl`} />
        <Skeleton className={`w-full h-18.5 rounded-2xl`} />
        <Skeleton className={`w-full h-18.5 rounded-2xl`} />
        <Skeleton className={`w-full h-18.5 rounded-2xl`} />
      </div>
    </div>
  );
};

export default TeamDataSkeleton;
