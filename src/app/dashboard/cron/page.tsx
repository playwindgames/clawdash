"use client"

import { useState } from "react"
import { Clock, RefreshCw, AlertCircle, ChevronDown, ChevronUp, CheckCircle2, XCircle } from "lucide-react"
import useSWR from "swr"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { CronStatusBadge } from "@/components/dashboard/cron-status-badge"
import type { CronListResponse, CronRunsResponse, CronJob } from "@/types/cron"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function formatRelativeTime(dateString: string | null): string {
  if (!dateString) return "Never"

  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()

  if (diffMs < 0) {
    const absDiff = Math.abs(diffMs)
    const mins = Math.floor(absDiff / 60000)
    if (mins < 60) return `in ${mins}m`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `in ${hours}h`
    const days = Math.floor(hours / 24)
    return `in ${days}d`
  }

  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

function formatDuration(ms: number | null): string {
  if (ms === null) return "-"
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(1)}s`
}

function CronRunsPanel({ cronId }: { cronId: string }) {
  const { data, isLoading } = useSWR<CronRunsResponse>(
    `/api/cron/${encodeURIComponent(cronId)}/runs`,
    fetcher,
    { refreshInterval: 30000 }
  )

  if (isLoading) {
    return (
      <div className="px-4 py-3 space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    )
  }

  if (!data || data.runs.length === 0) {
    return (
      <div className="px-4 py-4 text-center text-sm text-muted-foreground">
        No run history available
      </div>
    )
  }

  return (
    <div className="border-t">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Started</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.runs.map((run) => (
            <TableRow key={run.id}>
              <TableCell>
                {run.status === "success" ? (
                  <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span className="text-xs">Success</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
                    <XCircle className="h-3.5 w-3.5" />
                    <span className="text-xs">Failure</span>
                  </span>
                )}
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {formatRelativeTime(run.startedAt)}
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {formatDuration(run.duration)}
              </TableCell>
              <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">
                {run.error || run.output || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function CronJobRow({ job }: { job: CronJob }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <TableRow
        className="cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <TableCell>
          <div className="flex items-center gap-2">
            {expanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
            <div>
              <div className="font-medium">{job.name}</div>
              {job.description && (
                <div className="text-xs text-muted-foreground mt-0.5">
                  {job.description}
                </div>
              )}
            </div>
          </div>
        </TableCell>
        <TableCell>
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
            {job.schedule}
          </code>
        </TableCell>
        <TableCell>
          <CronStatusBadge status={job.status} />
        </TableCell>
        <TableCell className="text-sm text-muted-foreground">
          {formatRelativeTime(job.lastRun)}
        </TableCell>
        <TableCell className="text-sm text-muted-foreground">
          {formatRelativeTime(job.nextRun)}
        </TableCell>
      </TableRow>
      {expanded && (
        <TableRow>
          <TableCell colSpan={5} className="p-0 bg-muted/30">
            <CronRunsPanel cronId={job.id} />
          </TableCell>
        </TableRow>
      )}
    </>
  )
}

function CronTableSkeleton() {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Run</TableHead>
              <TableHead>Next Run</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 4 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-5 w-14" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default function CronPage() {
  const { data, error, isLoading, mutate } = useSWR<CronListResponse>(
    "/api/cron",
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    }
  )

  if (error) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Clock className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">Cron</h1>
        </div>
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <AlertCircle className="h-8 w-8 text-destructive mb-2" />
            <p className="text-sm text-muted-foreground mb-3">Failed to load cron jobs</p>
            <button
              onClick={() => mutate()}
              className="text-sm text-primary hover:underline"
            >
              Retry
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">Cron</h1>
        </div>
        <button
          onClick={() => mutate()}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Stats */}
      {data && (
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="text-sm text-muted-foreground">Total Jobs</div>
            <div className="text-2xl font-bold">{data.total}</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-sm text-muted-foreground">OK</div>
            <div className="text-2xl font-bold text-green-500">{data.okCount}</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-sm text-muted-foreground">Error</div>
            <div className="text-2xl font-bold text-red-500">{data.errorCount}</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-sm text-muted-foreground">Idle</div>
            <div className="text-2xl font-bold text-gray-400">{data.idleCount}</div>
          </div>
        </div>
      )}

      {/* Cron Jobs Table */}
      {isLoading ? (
        <CronTableSkeleton />
      ) : data && data.jobs.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Run</TableHead>
                  <TableHead>Next Run</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.jobs.map((job) => (
                  <CronJobRow key={job.id} job={job} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-lg border border-dashed bg-muted/30 p-8 text-center">
          <Clock className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">No cron jobs configured</p>
        </div>
      )}
    </div>
  )
}
