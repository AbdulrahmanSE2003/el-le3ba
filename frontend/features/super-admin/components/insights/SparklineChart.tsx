"use client"

import { Area, AreaChart, ResponsiveContainer } from "recharts"

interface SparklineChartProps {
  data: { value: number }[]
  color?: "accent" | "success"
}

const SparklineChart = ({ data, color = "accent" }: SparklineChartProps) => {
  const stroke = color === "success" ? "var(--color-success)" : "var(--color-accent)"
  const fill = color === "success" ? "var(--color-success)" : "var(--color-accent)"

  if (!data || data.length === 0) {
    return (
      <div className="h-11 w-full rounded bg-muted/30 flex items-end">
        <div className="w-full h-0.5 bg-muted/50 rounded" />
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={44}>
      <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fill} stopOpacity={0.2} />
            <stop offset="100%" stopColor={fill} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={stroke}
          strokeWidth={1.5}
          fill={`url(#grad-${color})`}
          dot={false}
          activeDot={{ r: 3, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default SparklineChart