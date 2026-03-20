import { NextRequest, NextResponse } from "next/server"
import type { CronRunsResponse, CronRun } from "@/types/cron"

// Mock data for development - will be replaced with openclaw CLI calls
function getMockRuns(cronId: string): CronRunsResponse {
  const now = Date.now()
  const runs: CronRun[] = [
    {
      id: `run:${cronId}:1`,
      cronId,
      status: "success",
      startedAt: new Date(now - 300000).toISOString(),
      finishedAt: new Date(now - 298000).toISOString(),
      duration: 2000,
      output: "Task completed successfully",
    },
    {
      id: `run:${cronId}:2`,
      cronId,
      status: "success",
      startedAt: new Date(now - 900000).toISOString(),
      finishedAt: new Date(now - 897500).toISOString(),
      duration: 2500,
      output: "Task completed successfully",
    },
    {
      id: `run:${cronId}:3`,
      cronId,
      status: "failure",
      startedAt: new Date(now - 1500000).toISOString(),
      finishedAt: new Date(now - 1498000).toISOString(),
      duration: 2000,
      error: "Connection timeout: unable to reach node-3",
    },
    {
      id: `run:${cronId}:4`,
      cronId,
      status: "success",
      startedAt: new Date(now - 2100000).toISOString(),
      finishedAt: new Date(now - 2098500).toISOString(),
      duration: 1500,
      output: "Task completed successfully",
    },
    {
      id: `run:${cronId}:5`,
      cronId,
      status: "success",
      startedAt: new Date(now - 2700000).toISOString(),
      finishedAt: new Date(now - 2697000).toISOString(),
      duration: 3000,
      output: "Task completed successfully",
    },
  ]

  return {
    runs,
    total: runs.length,
    cronId,
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // TODO: Replace with actual openclaw CLI call
    // const { stdout } = await exec(`openclaw cron runs --id ${id}`)
    // const data = JSON.parse(stdout)

    const data = getMockRuns(id)

    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to fetch cron runs:", error)
    return NextResponse.json(
      { error: "Failed to fetch cron runs" },
      { status: 500 }
    )
  }
}
