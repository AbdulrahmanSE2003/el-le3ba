"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Crown, Trophy, Medal, Flame } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export interface PlayerTeam {
  teamId: string
  teamName: string
  teamCode: string
}

export interface LeaderboardPlayer {
  userId: string
  name: string
  avatar: string
  totalScore: number
  gamesPlayed: number
  averageScore: number
  team: PlayerTeam
}

export function TopPlayersChart({ players = [] }: { players: LeaderboardPlayer[] }) {
  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/30 shadow-sm">
            <Trophy className="size-4" />
          </div>
        )
      case 1:
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-300/20 text-slate-400 border border-slate-400/30">
            <Medal className="size-4" />
          </div>
        )
      case 2:
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-700/15 text-amber-600 border border-amber-700/30">
            <Medal className="size-4" />
          </div>
        )
      default:
        return (
          <span className="font-bold text-xs text-muted-foreground w-7 text-center">
            #{index + 1}
          </span>
        )
    }
  }

  return (
    <Card className="h-full flex flex-col min-h-0 overflow-hidden" dir="rtl">
      <CardHeader className="pb-3 shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-primary font-semibold flex items-center gap-2">
            <Crown className="size-5 text-amber-500" />
            قائمة أفضل اللاعبين
          </CardTitle>
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1 bg-muted px-2.5 py-1 rounded-md border border-border/50">
            <Flame className="size-3.5 text-orange-500" />
            Top {players.length}
          </span>
        </div>
        <CardDescription>اللاعبون الأعلى تسجيلاً للنقاط والأداء</CardDescription>
      </CardHeader>

      <ScrollArea className="flex-1 min-h-0 px-1">
        <CardContent className="space-y-2.5 px-3 pb-4">
          {players.map((player, index) => (
            <div
              key={`${player.userId}-${index}`}
              className={`flex flex-row-reverse items-center justify-between p-3 rounded-xl border transition-all duration-200 hover:border-primary/30 ${
                index === 0
                  ? "bg-amber-500/5 border-amber-500/20 shadow-xs"
                  : "bg-muted/30 border-border/40 hover:bg-muted/50"
              }`}
            >
              <div className="flex flex-row-reverse items-center gap-3">
                {getRankBadge(index)}

                <Avatar className="h-9 w-9 border border-border/60">
                  <AvatarImage src={`/avatars/${player.avatar}`} alt={player.name} />
                  <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                    {player.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="text-sm font-semibold leading-tight text-right">{player.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      فريق {player.team?.teamName}
                    </span>
                    <span className="text-[10px] text-muted-foreground/60">•</span>
                    <span className="text-xs text-muted-foreground">
                      {player.gamesPlayed} مباراة
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-left">
                <div className="font-bold text-sm text-primary flex items-baseline gap-1 justify-end">
                  <span>{player.totalScore?.toLocaleString()}</span>
                  <span className="text-[10px] font-normal text-muted-foreground">نقطة</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  معدل {player.averageScore}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  )
}