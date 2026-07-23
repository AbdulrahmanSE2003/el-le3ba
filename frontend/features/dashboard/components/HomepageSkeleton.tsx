import { Skeleton } from "@/components/ui/skeleton";

const HomepageSkeleton = () => {
  return (
    <div className={`container mx-auto w-full space-y-6 max-md:px-6 py-3`}>
      <div className={`flex justify-between items-center`}>
        <Skeleton className={`w-7 h-7 rounded-full`} />
        <div className={`flex flex-col gap-y-1.5`}>
          <Skeleton className={`w-28 h-6 rounded-full`} />
          <Skeleton className={`w-40 h-4`} />
        </div>
      </div>

      <Skeleton className={`w-full h-44`} />
      <Skeleton className={`w-full h-30`} />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Skeleton className={`w-full h-24`} />
        <Skeleton className={`w-full h-24`} />
        <Skeleton className={`w-full h-24`} />
      </div>
      <Skeleton className={`w-full h-72`} />
    </div>
  );
};

export default HomepageSkeleton;
