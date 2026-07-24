import { LeaderboardContainer } from "@/features/leaderboard/components/LeaderboardContainer";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function LeaderboardPage() {
  return (
    <main className="">
      <Suspense fallback={<Loader2 />}>
        <LeaderboardContainer />
      </Suspense>
    </main>
  );
}
