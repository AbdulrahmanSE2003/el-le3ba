"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Activity } from "lucide-react"

// --- 1. Game Outcomes Chart Component ---

const outcomesChartConfig = {
  count: {
    label: "المباريات",
    color:"var(--chart-1)"
  },
  completed: {
    label: "مكتملة",
    color: "var(--primary)",
  },
  expired: {
    label: "تايم أوت",
    color: "var(--accent)", // Amber / Yellow
  },
  abandoned: {
    label: "انسحاب",
    color: "var(--destructive)", // Red / Rose
  },
} satisfies ChartConfig

interface OutcomeItem {
  type: string
  count: number
  percentage: number
}

export function GameOutcomesChart({
  outcomes ,
  total
}: {
  outcomes: OutcomeItem[]
  total:number
}) {
  const chartData = outcomes.map((item) => ({
    outcome: item.type,
    count: item.count,
    fill:
      outcomesChartConfig[item.type as keyof typeof outcomesChartConfig]?.color ||
      "var(--chart-1)",
  }))
  return (
      <Card className="flex flex-col h-full justify-between">
        <CardHeader className="pb-0">
           <CardTitle className={`text-lg text-primary font-semibold flex items-center gap-2`}>
          <Activity className={`size-5 stroke-amber-500`}/>حالات المباريات</CardTitle>
          <CardDescription>إجمالي المباريات: {total} مباراة</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0 flex items-center justify-center">
          <ChartContainer
            config={outcomesChartConfig}
            className="mx-auto aspect-square h-55"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent nameKey="outcome" hideLabel />}
              />
              <Pie data={chartData} dataKey="count" nameKey="outcome" />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <div className="flex justify-center gap-4 text-xs font-medium pb-6 pt-2 border-t mx-6">
          {outcomes.map((item) => (
            <div key={item.type} className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor:
                    outcomesChartConfig[
                      item.type as keyof typeof outcomesChartConfig
                    ]?.color,
                }}
              />
              <span>
                {outcomesChartConfig[
                  item.type as keyof typeof outcomesChartConfig
                ]?.label || item.type}{" "}
                ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </Card>
  )
}
