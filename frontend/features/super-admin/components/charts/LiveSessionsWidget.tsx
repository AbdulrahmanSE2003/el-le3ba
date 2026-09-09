import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Gamepad2, Radio } from "lucide-react"

// --- 2. Live Sessions Widget Component ---

interface GameSession {
  id: string
  title: string
  playersCount: number
  startTime: string
}

export function LiveSessionsWidget({
  count = 0,
  games = [],
}: {
  count?: number
  games?: GameSession[]
}) {
  return (
    <div className="col-span-2 rounded-2xl h-104" dir="rtl">
      <Card className="flex flex-col h-full justify-between">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
                       <CardTitle className={`text-lg text-primary font-semibold flex items-center gap-2`}>
<Radio className={`stroke-amber-500 size-5`}/>
الجلسات المباشرة</CardTitle>
            <CardDescription>المباريات النشطة حالياً</CardDescription>
          </div>
          <div className="bg-destructive/10 text-destructive text-xs px-2.5 py-1 rounded-full font-medium">
            <span className={`animate-pulse duration-700`}>مباشر</span>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-center">
          {count === 0 || games.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
              <div className="p-4 bg-muted/50 rounded-full text-muted-foreground">
                <Gamepad2 className="h-10 w-10" />
              </div>
              <div>
                <div className="text-3xl font-extrabold">0</div>
                <p className="text-sm text-muted-foreground mt-1">
                  لا توجد مباريات جارية حالياً
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="text-sm font-semibold">عدد الجلسات:</span>
                <span className="text-2xl font-bold text-emerald-500">
                  {count}
                </span>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {games.map((game) => (
                  <div
                    key={game.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border text-xs"
                  >
                    <div className="space-y-0.5">
                      <p className="font-semibold text-sm">{game.title}</p>
                      <p className="text-muted-foreground">
                        بدأت: {game.startTime}
                      </p>
                    </div>
                    <span className="bg-primary/10 text-primary font-medium px-2 py-1 rounded-md">
                      {game.playersCount} لاعبين
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        <div className="p-4 border-t text-xs text-muted-foreground text-center">
          يتم تحديث الجلسات المباشرة تلقائياً
        </div>
      </Card>
    </div>
  )
}