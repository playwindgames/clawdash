import { NextResponse } from "next/server"
import type { CronListResponse, CronJob } from "@/types/cron"

// Mock data for development - will be replaced with openclaw CLI calls
function getMockCronJobs(): CronListResponse {
  const jobs: CronJob[] = [
    {
      id: "cron:health-check",
      name: "Health Check",
      schedule: "*/5 * * * *",
      status: "ok",
      lastRun: new Date(Date.now() - 300000).toISOString(),
      nextRun: new Date(Date.now() + 300000).toISOString(),
      description: "Checks system health and agent availability every 5 minutes",
    },
    {
      id: "cron:log-rotation",
      name: "Log Rotation",
      schedule: "0 0 * * *",
      status: "ok",
      lastRun: new Date(Date.now() - 3600000).toISOString(),
      nextRun: new Date(Date.now() + 82800000).toISOString(),
      description: "Rotates and compresses old log files daily",
    },
    {
      id: "cron:pipeline-sync",
      name: "Pipeline Sync",
      schedule: "*/15 * * * *",
      status: "error",
      lastRun: new Date(Date.now() - 900000).toISOString(),
      nextRun: new Date(Date.now() + 900000).toISOString(),
      description: "Synchronizes pipeline state across nodes",
    },
    {
      id: "cron:memory-cleanup",
      name: "Memory Cleanup",
      schedule: "0 */6 * * *",
      status: "ok",
      lastRun: new Date(Date.now() - 7200000).toISOString(),
      nextRun: new Date(Date.now() + 14400000).toISOString(),
      description: "Cleans up stale memory entries and optimizes storage",
    },
    {
      id: "cron:cost-report",
      name: "Cost Report",
      schedule: "0 8 * * 1",
      status: "idle",
      lastRun: null,
      nextRun: new Date(Date.now() + 259200000).toISOString(),
      description: "Generates weekly cost analysis report",
    },
  ]

  const okCount = jobs.filter((j) => j.status === "ok").length
  const errorCount = jobs.filter((j) => j.status === "error").length
  const idleCount = jobs.filter((j) => j.status === "idle").length

  return {
    jobs,
    total: jobs.length,
    okCount,
    errorCount,
    idleCount,
  }
}

export async function GET() {
  try {
    // TODO: Replace with actual openclaw CLI call
    // const { stdout } = await exec("openclaw cron list --json")
    // const data = JSON.parse(stdout)

    const data = getMockCronJobs()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to fetch cron jobs:", error)
    return NextResponse.json(
      { error: "Failed to fetch cron jobs" },
      { status: 500 }
    )
  }
}
