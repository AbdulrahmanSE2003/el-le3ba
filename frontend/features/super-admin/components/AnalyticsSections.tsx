import { Suspense } from "react";
import GamesOverTime from "@/features/super-admin/components/charts/GamesOverTime";
import { Skeleton } from "@/components/ui/skeleton";
import TeamsPerformance from "@/features/super-admin/components/charts/TeamsPerformance";
import { LiveSessionsWidget } from "@/features/super-admin/components/charts/LiveSessionsWidget";
import GameOutcomes from "@/features/super-admin/components/charts/GameOutcomes";
import TopPlayers from "@/features/super-admin/components/charts/TopPlayers";
import LiveSessions from "./charts/LiveSessions";


const AnalyticsSections = () => {
    return (
        <div className={`grid grid-cols-6 gap-4`}>
        <Suspense
          fallback={<Skeleton className={`h-104 col-span-6 lg:col-span-4 rounded-2xl`} />}
        >
          <GamesOverTime />
        </Suspense>
        <Suspense
          fallback={<Skeleton className={`h-104 col-span-6 lg:col-span-2 rounded-2xl`} />}
        >
          <TeamsPerformance />
        </Suspense>
        <Suspense
          fallback={<Skeleton className={`h-104 col-span-6 lg:col-span-2 rounded-2xl`} />}
        >
          <TopPlayers/>
        </Suspense>
        <Suspense
          fallback={<Skeleton className={`h-104 col-span-6 lg:col-span-2 rounded-2xl`} />}
        >
          <GameOutcomes/>
        </Suspense>
        <Suspense
          fallback={<Skeleton className={`h-104 col-span-6 lg:col-span-2 rounded-2xl`} />}
        >
<LiveSessions/>
        </Suspense>
      </div>
    )
}

export default AnalyticsSections
