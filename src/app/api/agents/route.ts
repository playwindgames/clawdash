import { NextResponse } from "next/server"
import type { AgentsResponse, Agent } from "@/types/agent"

// Mock data for development - will be replaced with openclaw CLI calls
function getMockAgents(): AgentsResponse {
  const leads: Agent[] = [
    {
      id: "agent:pm:main",
      name: "PM Agent",
      role: "pm",
      status: "online",
      lastActive: new Date().toISOString(),
      description: "Product Manager - Handles requirements and issue creation",
    },
    {
      id: "agent:dev-lead:main",
      name: "Dev-Lead Agent",
      role: "dev-lead",
      status: "online",
      lastActive: new Date(Date.now() - 60000).toISOString(),
      description: "Development Lead - Manages development tasks and code reviews",
    },
    {
      id: "agent:qa-lead:main",
      name: "QA-Lead Agent",
      role: "qa-lead",
      status: "online",
      lastActive: new Date(Date.now() - 120000).toISOString(),
      description: "QA Lead - Handles testing and quality assurance",
    },
    {
      id: "agent:devops:main",
      name: "DevOps Agent",
      role: "devops",
      status: "offline",
      lastActive: new Date(Date.now() - 3600000).toISOString(),
      description: "DevOps - Manages deployments and infrastructure",
    },
  ]

  const workers: Agent[] = []

  return {
    leads,
    workers,
    total: leads.length + workers.length,
    onlineCount: leads.filter((a) => a.status === "online").length + 
                  workers.filter((a) => a.status === "online").length,
  }
}

export async function GET() {
  try {
    // TODO: Replace with actual openclaw CLI call
    // const result = await exec("openclaw agents list --json")
    // const data = JSON.parse(result.stdout)
    
    const data = getMockAgents()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to fetch agents:", error)
    return NextResponse.json(
      { error: "Failed to fetch agents" },
      { status: 500 }
    )
  }
}
