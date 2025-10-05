import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    // Get total tickets
    const { count: totalTickets } = await supabase.from("tickets").select("*", { count: "exact", head: true })

    // Get breached tickets
    const { count: breachedTickets } = await supabase
      .from("tickets")
      .select("*", { count: "exact", head: true })
      .eq("is_breached", true)
      .in("status", ["open", "in_progress"])

    // Get tickets by status
    const { data: statusData } = await supabase.from("tickets").select("status")

    const statusCounts = statusData?.reduce(
      (acc, ticket) => {
        acc[ticket.status] = (acc[ticket.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // Get tickets by priority
    const { data: priorityData } = await supabase.from("tickets").select("priority")

    const priorityCounts = priorityData?.reduce(
      (acc, ticket) => {
        acc[ticket.priority] = (acc[ticket.priority] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // Get tickets at risk (within 1 hour of deadline)
    const oneHourFromNow = new Date()
    oneHourFromNow.setHours(oneHourFromNow.getHours() + 1)

    const { count: atRiskTickets } = await supabase
      .from("tickets")
      .select("*", { count: "exact", head: true })
      .in("status", ["open", "in_progress"])
      .eq("is_breached", false)
      .lt("sla_deadline", oneHourFromNow.toISOString())

    return NextResponse.json({
      total: totalTickets || 0,
      breached: breachedTickets || 0,
      atRisk: atRiskTickets || 0,
      byStatus: statusCounts || {},
      byPriority: priorityCounts || {},
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
