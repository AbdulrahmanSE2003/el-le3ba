// features/match/components/lobby/LobbyPageSkeleton.tsx

import { Skeleton } from "@/components/ui/skeleton";

const LobbyPageSkeleton = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
    <Skeleton className="w-16 h-16 rounded-full bg-primary/20" />
    <Skeleton className="w-48 h-6 rounded-lg bg-primary/20" />
    <Skeleton className="w-64 h-4 rounded-lg bg-primary/10" />
    <Skeleton className="w-32 h-10 rounded-full bg-primary/20" />
  </div>
);

export default LobbyPageSkeleton;