import { Skeleton } from "@/components/ui/skeleton";
// ─── Skeleton Components ───────────────────────────────────────────
const MemberCardSkeleton = () => (
  <div className="bg-white dark:bg-zinc-900/50 border border-border rounded-lg flex flex-col items-center gap-y-2 p-2 py-3">
    <Skeleton className="w-12 h-12 rounded-full" />
    <Skeleton className="w-20 h-4" />
    <Skeleton className="w-16 h-3" />
    <Skeleton className="w-12 h-5 rounded-full" />
  </div>
);

const RulesSectionSkeleton = () => (
  <div className="w-full flex flex-col gap-y-4 border border-primary/30 bg-primary/15 dark:border-primary/20 dark:bg-primary/5 rounded-lg p-4">
    <div className="flex items-center gap-1">
      <Skeleton className="size-4 rounded-sm" />
      <Skeleton className="w-24 h-4" />
    </div>
    <div className="flex items-center gap-3">
      <Skeleton className="w-16 h-6 rounded-full" />
      <Skeleton className="w-14 h-6 rounded-full" />
      <Skeleton className="w-28 h-6 rounded-full" />
    </div>
  </div>
);

const LobbySkeleton = () => {
  return (
    <div className="space-y-6">
      <div className={`flex items-center justify-end gap-3`}>
        <Skeleton className="w-32 h-6 rounded-lg" />
        <Skeleton className="w-32 h-6 rounded-lg" />
      </div>

      {/* Team Name Skeleton */}
      <div className="relative">
        <Skeleton className="w-48 h-8" />
      </div>

      {/* Team Members Skeleton */}
      <div className="grid grid-cols-3 gap-3">
        <MemberCardSkeleton />
        <MemberCardSkeleton />
        <MemberCardSkeleton />
        <MemberCardSkeleton />
        <MemberCardSkeleton />
      </div>

      {/* Start Match Button Skeleton */}
      <Skeleton className="w-full h-10 rounded-lg" />

      {/* Rules Skeleton */}
      <RulesSectionSkeleton />
    </div>
  );
};

export default LobbySkeleton;
