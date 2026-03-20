export type CronStatus = "ok" | "error" | "idle"

export interface CronJob {
  id: string
  name: string
  schedule: string
  status: CronStatus
  lastRun: string | null
  nextRun: string | null
  description?: string
}

export interface CronRun {
  id: string
  cronId: string
  status: "success" | "failure"
  startedAt: string
  finishedAt: string | null
  duration: number | null
  output?: string
  error?: string
}

export interface CronListResponse {
  jobs: CronJob[]
  total: number
  okCount: number
  errorCount: number
  idleCount: number
}

export interface CronRunsResponse {
  runs: CronRun[]
  total: number
  cronId: string
}
