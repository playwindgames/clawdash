"use client"

import { Bot, Users, RefreshCw } from "lucide-react"
import useSWR from "swr"
import { AgentCard, AgentCardSkeleton, AgentCardError } from "@/components/dashboard/agent-card"
import type { AgentsResponse } from "@/types/agent"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function AgentsPage() {
  const { data, error, isLoading, mutate } = useSWR<AgentsResponse>("/api/agents", fetcher, {
    refreshInterval: 30000, // 30 seconds
    revalidateOnFocus: true,
  })

  if (error) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">Agents</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <AgentCardError onRetry={() => mutate()} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">Agents</h1>
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
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-4">
            <div className="text-sm text-muted-foreground">Total Agents</div>
            <div className="text-2xl font-bold">{data.total}</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-sm text-muted-foreground">Online</div>
            <div className="text-2xl font-bold text-green-500">{data.onlineCount}</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-sm text-muted-foreground">Offline</div>
            <div className="text-2xl font-bold">{data.total - data.onlineCount}</div>
          </div>
        </div>
      )}

      {/* Lead Agents */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Lead Agents</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {isLoading ? (
            <>
              <AgentCardSkeleton />
              <AgentCardSkeleton />
              <AgentCardSkeleton />
              <AgentCardSkeleton />
            </>
          ) : (
            data?.leads.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))
          )}
        </div>
      </div>

      {/* Worker Agents */}
      {data?.workers && data.workers.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Bot className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Worker Agents</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.workers.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      )}

      {/* Empty state for workers */}
      {data && data.workers.length === 0 && (
        <div className="rounded-lg border border-dashed bg-muted/30 p-8 text-center">
          <Bot className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">No worker agents currently active</p>
        </div>
      )}
    </div>
  )
}
