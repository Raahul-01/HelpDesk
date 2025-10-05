import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import type { PaginatedResponse, Ticket } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const searchParams = request.nextUrl.searchParams

    // Pagination parameters
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    // Filter parameters
    const status = searchParams.get("status")
    const priority = searchParams.get("priority")
    const assignedTo = searchParams.get("assigned_to")
    const search = searchParams.get("search")
    const breached = searchParams.get("breached")

    // Build query
    let query = supabase.from("tickets").select(
      `
        *,
        creator:users!tickets_created_by_fkey(id, name, email, role),
        assignee:users!tickets_assigned_to_fkey(id, name, email, role)
      `,
      { count: "exact" },
    )

    // Apply filters
    if (status) {
      query = query.eq("status", status)
    }
    if (priority) {
      query = query.eq("priority", priority)
    }
    if (assignedTo) {
      query = query.eq("assigned_to", assignedTo)
    }
    if (breached === "true") {
      query = query.eq("is_breached", true)
    }

    // Search in title, description, and latest comment
    if (search) {
      // First get tickets matching title/description
      const { data: ticketMatches } = await supabase
        .from("tickets")
        .select("id")
        .or(`title.ilike.%${search}%,description.ilike.%${search}%`)

      // Get tickets with matching comments
      const { data: commentMatches } = await supabase
        .from("comments")
        .select("ticket_id")
        .ilike("content", `%${search}%`)

      const ticketIds = new Set([
        ...(ticketMatches?.map((t) => t.id) || []),
        ...(commentMatches?.map((c) => c.ticket_id) || []),
      ])

      if (ticketIds.size > 0) {
        query = query.in("id", Array.from(ticketIds))
      } else {
        // No matches found
        return NextResponse.json({
          data: [],
          total: 0,
          limit,
          offset,
        } as PaginatedResponse<Ticket>)
      }
    }

    // Apply pagination and ordering
    query = query.order("created_at", { ascending: false }).range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      console.error("Error fetching tickets:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      data: data || [],
      total: count || 0,
      limit,
      offset,
    } as PaginatedResponse<Ticket>)
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { title, description, priority = "medium", created_by } = body

    if (!title || !description || !created_by) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Calculate SLA deadline based on priority
    const slaHours = { urgent: 4, high: 8, medium: 24, low: 72 }[priority as 'urgent' | 'high' | 'medium' | 'low'] || 24
    const slaDeadline = new Date()
    slaDeadline.setHours(slaDeadline.getHours() + slaHours)

    // Insert ticket
    const { data: ticket, error: ticketError } = await supabase
      .from("tickets")
      .insert({
        title,
        description,
        priority,
        created_by,
        sla_deadline: slaDeadline.toISOString(),
        status: "open",
      })
      .select()
      .single()

    if (ticketError) {
      console.error("Error creating ticket:", ticketError)
      return NextResponse.json({ error: ticketError.message }, { status: 500 })
    }

    // Log ticket creation in history
    await supabase.from("ticket_history").insert({
      ticket_id: ticket.id,
      user_id: created_by,
      action: "created",
      new_value: "Ticket created",
    })

    return NextResponse.json(ticket, { status: 201 })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
