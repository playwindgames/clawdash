import { GitBranch } from "lucide-react"

export default function PipelinePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <GitBranch className="h-6 w-6" />
        <h1 className="text-2xl font-semibold">Pipeline</h1>
      </div>
      
      <div className="rounded-lg border bg-card p-4">
        <p className="text-muted-foreground">
          Pipeline management panel - coming soon.
        </p>
      </div>
    </div>
  )
}
