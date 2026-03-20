"use client"

import { Bot, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { Agent, AgentStatus } from "@/types/agent"

interface AgentCardProps {
  agent: Agent
}

const statusColors: Record<AgentStatus, string> = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  busy: "bg-yellow-500",
  error: "bg-red-500",
}

const statusLabels: Record<AgentStatus, string> = {
  online: "Online",
  offline: "Offline",
  busy: "Busy",
  error: "Error",
}

const roleLabels: Record<Agent["role"], string> = {
  pm: "Product Manager",
  "dev-lead": "Development Lead",
  "qa-lead": "QA Lead",
  devops: "DevOps",
  worker: "Worker",
}

function formatLastActive(dateString: string | null): string {
  if (!dateString) return "Never"
  
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  
  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins}m ago`
  
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}d ago`
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-3 right-3">
        <div className="flex items-center gap-1.5">
          <span className={`relative flex h-2.5 w-2.5`}>
            {agent.status === "online" && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${statusColors[agent.status]}`}></span>
          </span>
          <span className="text-xs text-muted-foreground">{statusLabels[agent.status]}</span>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">{agent.name}</CardTitle>
            <CardDescription className="text-xs">{roleLabels[agent.role]}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {agent.description && (
          <p className="text-sm text-muted-foreground mb-3">{agent.description}</p>
        )}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Last active: {formatLastActive(agent.lastActive)}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function AgentCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-3" />
        <Skeleton className="h-3 w-20" />
      </CardContent>
    </Card>
  )
}

export function AgentCardError({ onRetry }: { onRetry: () => void }) {
  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardContent className="flex flex-col items-center justify-center py-8">
        <AlertCircle className="h-8 w-8 text-destructive mb-2" />
        <p className="text-sm text-muted-foreground mb-3">Failed to load agent data</p>
        <button
          onClick={onRetry}
          className="text-sm text-primary hover:underline"
        >
          Retry
        </button>
      </CardContent>
    </Card>
  )
}
