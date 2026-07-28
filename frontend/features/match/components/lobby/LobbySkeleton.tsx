import { Skeleton } from "@/components/ui/skeleton";

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
    <div className={`flex items-center gap-2`}>
      <Skeleton className={`w-2 rounded-full h-2`} />
      <Skeleton className={`w-32 rounded-full h-4 `} />
    </div>
    <div className={`flex items-center gap-2`}>
      <Skeleton className={`w-2 rounded-full h-2`} />
      <Skeleton className={`w-40 rounded-full h-4 `} />
    </div>
    <div className={`flex items-center gap-2`}>
      <Skeleton className={`w-2 rounded-full h-2`} />
      <Skeleton className={`w-44 rounded-full h-4 `} />
    </div>
    <div className={`flex items-center gap-2`}>
      <Skeleton className={`w-2 rounded-full h-2`} />
      <Skeleton className={`w-64 rounded-full h-4 `} />
    </div>
    <div className={`flex items-center gap-2`}>
      <Skeleton className={`w-2 rounded-full h-2`} />
      <Skeleton className={`w-72 rounded-full h-4 `} />
    </div>
  </div>
);

const LobbySkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-end gap-3">
      <Skeleton className="w-32 h-6 rounded-lg bg-primary/20" />
      <Skeleton className="w-32 h-6 rounded-lg bg-primary/20" />
    </div>

    <div className="relative">
      <Skeleton className="w-48 h-8 bg-primary/20" />
    </div>

    <div className="grid grid-cols-3 gap-3">
      <MemberCardSkeleton />
      <MemberCardSkeleton />
      <MemberCardSkeleton />
    </div>

    <Skeleton className="w-full h-16 rounded-lg bg-primary/20" />

    <RulesSectionSkeleton />
  </div>
);

export default LobbySkeleton;
