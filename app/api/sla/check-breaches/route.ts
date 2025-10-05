import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST() {
  try {
    const supabase = await createClient()

    // Get all open and in_progress tickets
    const { data: tickets, error } = await supabase
      .from("tickets")
      .select("id, sla_deadline, is_breached, status")
      .in("status", ["open", "in_progress"])

    if (error) {
      console.error("Error fetching tickets:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const now = new Date()
    const updates: Array<{ id: string; wasBreached: boolean; isNowBreached: boolean }> = []

    // Check each ticket for SLA breach
    for (const ticket of tickets || []) {
      const deadline = new Date(ticket.sla_deadline)
      const isBreached = now > deadline

      // Only update if breach status changed
      if (isBreached !== ticket.is_breached) {
        await supabase.from("tickets").update({ is_breached: isBreached }).eq("id", ticket.id)

        updates.push({
          id: ticket.id,
          wasBreached: ticket.is_breached,
          isNowBreached: isBreached,
        })

        // Log breach in history if newly breached
        if (isBreached && !ticket.is_breached) {
          await supabase.from("ticket_history").insert({
            ticket_id: ticket.id,
            user_id: "00000000-0000-0000-0000-000000000001", // System user (admin)
            action: "sla_breached",
            new_value: "SLA deadline exceeded",
          })
        }
      }
    }

    return NextResponse.json({
      checked: tickets?.length || 0,
      updated: updates.length,
      updates,
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
