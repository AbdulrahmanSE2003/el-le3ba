"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

interface AnalyticsPoint {
  sessions: number
  date: string
}

interface ChartAreaProps {
  title: string
  description: string
  points: AnalyticsPoint[]
}

const chartConfig = {
  sessions: {
    label: "Sessions",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function GamesOverTimeChart({
  title,
  description,
  points,
}: ChartAreaProps) {
  const chartData = points.map((point) => ({
    month: point.date,
    sessions: point.sessions,
  }))

  const first = points[0]?.sessions ?? 0
  const last = points.at(-1)?.sessions ?? 0
  const percentage = first > 0 ? ((last - first) / first) * 100 : 0
  const isUp = percentage >= 0

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className={`text-lg text-primary font-semibold`}>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="px-2 pb-0">
        {/* Controlled compact height */}
        <ChartContainer config={chartConfig} className="max-h-50 w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
              left: 12,
              right: 12,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="fillSessions" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-chart-1)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-chart-5)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.4} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                })
              }
            />

            <ChartTooltip
              cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
              content={<ChartTooltipContent indicator="line" />}
            />

            <Area
              dataKey="sessions"
              type="natural"
              fill="url(#fillSessions)"
              stroke="var(--color-chart-5)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="pt-4">
        <div className="flex w-full items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 font-medium leading-none">
            <span>{isUp ? "ارتفاع بمعدل" : "انخفاض بمعدل"}</span>
            <span
              className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs ${
                isUp
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
              }`}
            >
              {percentage > 0 ? "+" : ""}
              {percentage.toFixed(1)}%
              {isUp ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
            </span>
          </div>

          <div className="text-xs text-muted-foreground">
            {points.length > 0
              ? `${new Date(points[0].date).toLocaleDateString("ar-EG", {
                  month: "short",
                  year: "numeric",
                })} - ${new Date(points.at(-1)!.date).toLocaleDateString(
                  "ar-EG",
                  {
                    month: "short",
                    year: "numeric",
                  }
                )}`
              : "لا توجد بيانات"}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}