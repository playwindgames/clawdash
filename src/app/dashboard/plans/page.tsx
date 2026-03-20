import { FileText } from "lucide-react"

export default function PlansPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <FileText className="h-6 w-6" />
        <h1 className="text-2xl font-semibold">Plans</h1>
      </div>
      
      <div className="rounded-lg border bg-card p-4">
        <p className="text-muted-foreground">
          Plans management panel - coming soon.
        </p>
      </div>
    </div>
  )
}
