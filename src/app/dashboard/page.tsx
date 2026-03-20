import { LayoutDashboard } from "lucide-react"

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <LayoutDashboard className="h-6 w-6" />
        <h1 className="text-2xl font-semibold">Overview</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">Total Agents</div>
          <div className="text-2xl font-bold">4</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">Active Pipelines</div>
          <div className="text-2xl font-bold">2</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">Cron Jobs</div>
          <div className="text-2xl font-bold">8</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">Today&apos;s Cost</div>
          <div className="text-2xl font-bold">$0.00</div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4">
        <h2 className="text-lg font-semibold mb-4">System Status</h2>
        <p className="text-muted-foreground">
          All systems operational. Dashboard placeholder - more metrics coming soon.
        </p>
      </div>
    </div>
  )
}
