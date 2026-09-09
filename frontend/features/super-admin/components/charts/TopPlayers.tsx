"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Crown, Trophy } from "lucide-react"

interface Player {
  userId: string
  name: string
  totalScore: number
  team: { teamName: string }
}

export function TopPlayersList({ players }: { players: Player[] }) {
  return (
<div className={`col-span-2 rounded-2xl h-104`}> <Card className="h-full" dir="rtl">
      <CardHeader className="pb-3">
           <CardTitle className={`text-lg text-primary font-semibold flex items-center gap-2`}>
          <Crown className="size-5 text-amber-500" />
          قائمة أفضل اللاعبين
        </CardTitle>
        <CardDescription>اللاعبون الأعلى تسجيلاً للنقاط</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {players.slice(0, 5).map((player, index) => (
          <div
            key={player.userId + index}
            className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border/50"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm w-4 text-center text-muted-foreground">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-semibold leading-none">{player.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  فريق {player.team.teamName}
                </p>
              </div>
            </div>
            <div className="text-left">
              <span className="font-bold text-sm text-primary">
                {player.totalScore}
              </span>
              <span className="text-[10px] text-muted-foreground block">نقطة</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
              </div>
  )
}