import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: ticket, error } = await supabase
      .from("tickets")
      .select(
        `
        *,
        creator:users!tickets_created_by_fkey(id, name, email, role),
        assignee:users!tickets_assigned_to_fkey(id, name, email, role)
      `,
      )
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching ticket:", error)
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    return NextResponse.json(ticket)
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const body = await request.json()

    const { status, priority, assigned_to, version, user_id } = body

    // Get current ticket for optimistic locking
    const { data: currentTicket, error: fetchError } = await supabase
      .from("tickets")
      .select("version, status, priority, assigned_to")
      .eq("id", id)
      .single()

    if (fetchError) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    // Check version for optimistic locking
    if (version !== undefined && currentTicket.version !== version) {
      return NextResponse.json(
        {
          error: "Conflict: Ticket has been modified by another user",
          currentVersion: currentTicket.version,
        },
        { status: 409 },
      )
    }

    // Build update object
    const updates: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
      version: currentTicket.version + 1,
    }

    const changes: Array<{ field: string; oldValue: string; newValue: string }> = []

    if (status !== undefined && status !== currentTicket.status) {
      updates.status = status
      changes.push({ field: "status", oldValue: currentTicket.status, newValue: status })
    }

    if (priority !== undefined && priority !== currentTicket.priority) {
      updates.priority = priority
      changes.push({ field: "priority", oldValue: currentTicket.priority, newValue: priority })
    }

    if (assigned_to !== undefined && assigned_to !== currentTicket.assigned_to) {
      updates.assigned_to = assigned_to
      changes.push({
        field: "assigned_to",
        oldValue: currentTicket.assigned_to || "unassigned",
        newValue: assigned_to || "unassigned",
      })
    }

    // Update ticket
    const { data: updatedTicket, error: updateError } = await supabase
      .from("tickets")
      .update(updates)
      .eq("id", id)
      .select()
      .single()

    if (updateError) {
      console.error("Error updating ticket:", updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    // Log changes in history
    for (const change of changes) {
      await supabase.from("ticket_history").insert({
        ticket_id: id,
        user_id: user_id || currentTicket.assigned_to,
        action: `${change.field}_changed`,
        old_value: change.oldValue,
        new_value: change.newValue,
      })
    }

    return NextResponse.json(updatedTicket)
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
