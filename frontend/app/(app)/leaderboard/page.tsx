import { LeaderboardContainer } from "@/features/leaderboard/components/LeaderboardContainer";
import LeaderboardSkeleton from "@/features/leaderboard/components/LeaderboardSkeleton";
import { Suspense } from "react";

export default function LeaderboardPage() {
  return (
    <main className="">
      <Suspense fallback={<LeaderboardSkeleton />}>
        <LeaderboardContainer />
      </Suspense>
    </main>
  );
}
