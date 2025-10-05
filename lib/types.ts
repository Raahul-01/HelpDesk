export type TicketStatus = "open" | "in_progress" | "resolved" | "closed"
export type TicketPriority = "low" | "medium" | "high" | "urgent"
export type UserRole = "user" | "agent" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Ticket {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  created_by: string
  assigned_to: string | null
  sla_deadline: string
  is_breached: boolean
  version: number
  created_at: string
  updated_at: string
  creator?: User
  assignee?: User
}

export interface Comment {
  id: string
  ticket_id: string
  user_id: string
  content: string
  created_at: string
  user?: User
}

export interface TicketHistory {
  id: string
  ticket_id: string
  user_id: string
  action: string
  old_value: string | null
  new_value: string | null
  created_at: string
  user?: User
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  limit: number
  offset: number
}

export interface SLAStats {
  total: number
  breached: number
  atRisk: number
  byStatus: Record<string, number>
  byPriority: Record<string, number>
}
