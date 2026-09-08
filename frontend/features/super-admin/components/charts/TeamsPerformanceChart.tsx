"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"

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

export const description = "A horizontal bar chart"



const chartConfig = {
  points: {
    label: "النقاط",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

interface AnalyticsPoints {
    team:string;
    points:number;
}

interface TeamsPerformanceProps {
    points: AnalyticsPoints[]
}


export function TeamsPerformanceChart({points}:TeamsPerformanceProps) {
  return (
    <Card className={`h-full`}>
      <CardHeader>
        <CardTitle>إحصائيات الفرق</CardTitle>
        <CardDescription>عرض لأداء ونشاط أعلى الفرق داخل اللعبة.</CardDescription>
      </CardHeader>
      <CardContent className={`px-1`}>
<ChartContainer
  config={chartConfig}
  className="h-72 w-full"
>
              <BarChart
              className={`w-full`}
            accessibilityLayer
            data={points}
            layout="vertical"
            margin={{
              left: -40,
            }}
          >
            <XAxis type="number" dataKey="points" hide />
            <YAxis
              dataKey="team"
              type="category"
              tickLine={false}
              tickMargin={-10}
              axisLine={false}
              tick={{ fill: "#ffffff" }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="points" fill="var(--color-chart-5)" radius={5}  barSize={25}>
                <LabelList
    dataKey="points"
    position="right"
    offset={28}      
    className="fill-foreground/50 text-xs font-bold" 
  />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
