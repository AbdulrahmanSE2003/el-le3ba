import { getKPISummary } from "../../api/insights"
import Error from "@/app/error"
import KPICard from "./KPICard"
import SparklineChart from "./SparklineChart"
import {
  Gamepad2,
  CircleCheck,
  Radio,
  Trophy,
} from "lucide-react"

const KPISummary = async () => {
  const kpisRes = await getKPISummary()
  if (!kpisRes.success) return <Error />

  const { totalSessions, completionRate, liveNow, topTeam } = kpisRes.data.analytics

  const sessionSparkline = totalSessions > 0
    ? [{ value: 0 }, { value: totalSessions }]
    : []

  return (
// KPISummary.tsx
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <KPICard
        label="Total sessions"
        icon={<Gamepad2 size={14} />}
        value={totalSessions.toLocaleString()}
        sub="all time"
        sparkline={<SparklineChart data={sessionSparkline} color="accent" />}
      />

      <KPICard
        label="Completion rate"
        icon={<CircleCheck size={14} />}
        value={`${completionRate}%`}
        badge={{
          text: completionRate >= 60 ? "↑ good" : completionRate >= 40 ? "↔ average" : "↓ low",
          variant: completionRate >= 60 ? "up" : completionRate >= 40 ? "neutral" : "down",
        }}
        sparkline={<SparklineChart data={[]} color="success" />}
      />

      <KPICard
        label="Live now"
        icon={<Radio size={14} className="text-destructive animate-pulse" />}
        value={liveNow.count}
        sub={`${liveNow.activePlayersCount} players active`}
      >
        <div className="mt-2 h-px bg-border" />
        <div className="flex justify-between text-xs mt-2">
          <span className="text-muted-foreground">Active players</span>
          <span className="font-medium">{liveNow.activePlayersCount}</span>
        </div>
      </KPICard>

      <KPICard
        label="Top team"
        icon={<Trophy size={14} />}
        value={topTeam?.teamName ?? "—"}
        sub={topTeam ? `${topTeam.totalPoints.toLocaleString()} pts · ${topTeam.gamesPlayed} games` : "no data yet"}
      >
        {topTeam && (
          <>
            <div className="mt-2 h-px bg-border" />
            <div className="flex justify-between text-xs mt-2">
              <span className="text-muted-foreground">Avg score</span>
              <span className="font-medium">{topTeam.averageScore}</span>
            </div>
          </>
        )}
      </KPICard>

    </div>
  )
}

export default KPISummary