import { createClient } from "@/lib/supabase/server"
import { TicketCard } from "@/components/ticket-card"
import { TicketsPagination } from "@/components/tickets-pagination"
import type { Ticket } from "@/lib/types"
import { AlertCircle } from "lucide-react"

interface TicketsListProps {
  searchParams?: {
    search?: string
    status?: string
    priority?: string
    breached?: string
    limit?: string
    offset?: string
  }
}

export async function TicketsList({ searchParams }: TicketsListProps = {}) {
  const supabase = await createClient()

  const now = new Date()
  await supabase
    .from("tickets")
    .update({ is_breached: true })
    .in("status", ["open", "in_progress"])
    .lt("sla_deadline", now.toISOString())
    .eq("is_breached", false)

  // Build query parameters
  const limit = Number.parseInt(searchParams?.limit || "10")
  const offset = Number.parseInt(searchParams?.offset || "0")

  let query = supabase.from("tickets").select(
    `
      *,
      creator:users!tickets_created_by_fkey(id, name, email, role),
      assignee:users!tickets_assigned_to_fkey(id, name, email, role)
    `,
    { count: "exact" },
  )

  // Apply filters
  if (searchParams?.status) {
    query = query.eq("status", searchParams.status)
  }
  if (searchParams?.priority) {
    query = query.eq("priority", searchParams.priority)
  }
  if (searchParams?.breached === "true") {
    query = query.eq("is_breached", true)
  }

  // Search functionality
  if (searchParams?.search) {
    const search = searchParams.search
    // Get tickets matching title/description
    const { data: ticketMatches } = await supabase
      .from("tickets")
      .select("id")
      .or(`title.ilike.%${search}%,description.ilike.%${search}%`)

    // Get tickets with matching comments
    const { data: commentMatches } = await supabase.from("comments").select("ticket_id").ilike("content", `%${search}%`)

    const ticketIds = new Set([
      ...(ticketMatches?.map((t) => t.id) || []),
      ...(commentMatches?.map((c) => c.ticket_id) || []),
    ])

    if (ticketIds.size > 0) {
      query = query.in("id", Array.from(ticketIds))
    } else {
      // No matches
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="h-12 w-12 text-cyan-400 mb-4" />
          <h3 className="text-lg font-mono font-semibold text-white">No tickets found</h3>
          <p className="text-gray-400 font-mono">// Try adjusting your search or filters</p>
        </div>
      )
    }
  }

  // Apply pagination and ordering
  query = query.order("created_at", { ascending: false }).range(offset, offset + limit - 1)

  const { data: tickets, error, count } = await query

  if (error) {
    console.error("Error fetching tickets:", error)
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
        <h3 className="text-lg font-mono font-semibold text-white">Error loading tickets</h3>
        <p className="text-gray-400 font-mono">// Database connection failed</p>
      </div>
    )
  }

  if (!tickets || tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-cyan-400 mb-4" />
        <h3 className="text-lg font-mono font-semibold text-white">No tickets found</h3>
        <p className="text-gray-400 font-mono">// Create your first ticket to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket as Ticket} />
        ))}
      </div>

      <TicketsPagination total={count || 0} limit={limit} offset={offset} />
    </div>
  )
}
