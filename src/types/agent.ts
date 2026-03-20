export type AgentStatus = "online" | "offline" | "busy" | "error"

export interface Agent {
  id: string
  name: string
  role: "pm" | "dev-lead" | "qa-lead" | "devops" | "worker"
  status: AgentStatus
  lastActive: string | null
  description?: string
}

export interface AgentsResponse {
  leads: Agent[]
  workers: Agent[]
  total: number
  onlineCount: number
}
