import { Skeleton } from "@/components/ui/skeleton";

const LeaderboardSkeleton = () => {
  return (
    <div className={``}>
      {/* Header */}
      {/* Header Skeleton */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-32  rounded-2xl" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-6 w-20  rounded-full" />
      </div>

      {/* Podium */}
      {/* Podium Skeleton */}
      <div className="relative bg-card border border-border/60 rounded-3xl p-8 pb-0 max-w-4xl mx-auto shadow-xl shadow-black/5 overflow-hidden mb-8">
        <div className="relative z-10 flex flex-col sm:flex-row items-end justify-center gap-6 pt-12 max-w-2xl mx-auto">
          {/* 2nd Place */}
          <div className="flex flex-col items-center w-full sm:w-1/3 order-2 sm:order-1">
            <Skeleton className="h-14 w-14 rounded-full mb-3" />
            <Skeleton className="h-5 w-20 mb-1" />
            <Skeleton className="h-4 w-12 mb-4" />
            <Skeleton className="w-full h-28 rounded-t-2xl " />
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center w-full sm:w-1/3 order-1 sm:order-2">
            <Skeleton className="h-16 w-16 rounded-full mb-3" />
            <Skeleton className="h-6 w-24 mb-1" />
            <Skeleton className="h-5 w-16 mb-4" />
            <Skeleton className="w-full h-36 rounded-t-2xl" />
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center w-full sm:w-1/3 order-3">
            <Skeleton className="h-14 w-14 rounded-full mb-3" />
            <Skeleton className="h-5 w-20 mb-1" />
            <Skeleton className="h-4 w-12 mb-4" />
            <Skeleton className="w-full h-24 rounded-t-2xl" />
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      {/* <Skeleton className={`rounded-3xl h-104 w-full `} /> */}

      <div className="w-full max-w-4xl mx-auto bg-card border border-border/60 rounded-3xl shadow-xl shadow-black/5 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="divide-y divide-border/50">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-6 py-3.5"
            >
              {/* Right Side: Rank + Team Name */}
              <div className="flex items-center gap-4">
                {/* Rank Badge Skeleton */}
                <Skeleton className="h-8 w-8 rounded-full" />

                {/* Team Name Skeleton */}
                <Skeleton className="h-5 w-32" />
              </div>

              {/* Left Side: Points Skeleton */}
              <Skeleton className="h-5 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardSkeleton;
