import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface KPICardProps {
  label: string
  icon: ReactNode
  value: string | number
  sub?: string
  badge?: {
    text: string
    variant: "up" | "down" | "neutral"
  }
  sparkline?: ReactNode
  children?: ReactNode
  className?: string
}

const badgeStyles = {
  up: "bg-success/10 text-success",
  down: "bg-destructive/10 text-destructive",
  neutral: "bg-muted text-muted-foreground border border-border",
}

const KPICard = ({
  label,
  icon,
  value,
  sub,
  badge,
  sparkline,
  children,
  className,
}: KPICardProps) => {
  return (
    <div
  className={cn(
    "bg-card border border-border max-h-50 rounded-xl p-5 flex flex-col gap-2 hover:border-accent/50 transition-colors duration-300",
    className
  )}
>
      <div className="flex items-center gap-2 text-muted-foreground text-base">
  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted">
    {icon}
  </div>
  <span>{label}</span>
</div>

      <div className="text-2xl font-medium text-foreground leading-tight mt-0.5">
        {value}
      </div>

      {sub && (
        <div className="text-xs text-muted-foreground">{sub}</div>
      )}

      {badge && (
        <span
          className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full w-fit mt-0.5",
            badgeStyles[badge.variant]
          )}
        >
          {badge.text}
        </span>
      )}

      {children}

      {sparkline && (
        <div className="mt-2">{sparkline}</div>
      )}
    </div>
  )
}

export default KPICard