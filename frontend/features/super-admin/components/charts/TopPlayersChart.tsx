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

  return (
    <Card className="h-full flex flex-col min-h-0 overflow-hidden">
      <CardHeader className="pb-3 shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-primary font-semibold flex items-center gap-2">
            <Crown className="size-5 text-amber-500" />
            قائمة أفضل اللاعبين
          </CardTitle>
        </div>
        <CardDescription>اللاعبون الأعلى تسجيلاً للنقاط والأداء</CardDescription>
      </CardHeader>

      <ScrollArea className="flex-1 min-h-0 px-1">
        <CardContent className="space-y-1 px-3 pb-4">
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
                <span className="font-bold text-xs text-muted-foreground w-7 text-center">
                #{index + 1}
              </span>

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
                       {player.team?.teamName} فريق
                    </span>
                    <span className="text-[10px] text-muted-foreground/60">•</span>
                    <span className="text-xs text-muted-foreground">
                      مباراة {player.gamesPlayed} 
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