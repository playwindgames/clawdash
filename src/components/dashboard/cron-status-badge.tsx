import { cn } from "@/lib/utils"
import type { CronStatus } from "@/types/cron"

interface CronStatusBadgeProps {
  status: CronStatus
}

const statusConfig: Record<CronStatus, { label: string; className: string; dotClassName: string }> = {
  ok: {
    label: "OK",
    className: "bg-green-500/10 text-green-700 dark:text-green-400",
    dotClassName: "bg-green-500",
  },
  error: {
    label: "Error",
    className: "bg-red-500/10 text-red-700 dark:text-red-400",
    dotClassName: "bg-red-500",
  },
  idle: {
    label: "Idle",
    className: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
    dotClassName: "bg-gray-400",
  },
}

export function CronStatusBadge({ status }: CronStatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dotClassName)} />
      {config.label}
    </span>
  )
}
