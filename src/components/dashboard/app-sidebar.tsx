"use client"

import {
  LayoutDashboard,
  Bot,
  GitBranch,
  Server,
  FileText,
  Clock,
  Brain,
  DollarSign,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Navigation items
const navItems = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Agents",
    url: "/dashboard/agents",
    icon: Bot,
  },
  {
    title: "Pipeline",
    url: "/dashboard/pipeline",
    icon: GitBranch,
  },
  {
    title: "Nodes",
    url: "/dashboard/nodes",
    icon: Server,
  },
  {
    title: "Plans",
    url: "/dashboard/plans",
    icon: FileText,
  },
  {
    title: "Cron",
    url: "/dashboard/cron",
    icon: Clock,
  },
  {
    title: "Memory",
    url: "/dashboard/memory",
    icon: Brain,
  },
  {
    title: "Costs",
    url: "/dashboard/costs",
    icon: DollarSign,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            C
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">ClawDash</span>
            <span className="text-xs text-muted-foreground">OpenClaw Dashboard</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={<a href={item.url} />}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2 text-xs text-muted-foreground">
          <span>OpenClaw v1.0</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
