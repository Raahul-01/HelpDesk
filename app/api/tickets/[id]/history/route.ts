import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: history, error } = await supabase
      .from("ticket_history")
      .select(
        `
        *,
        user:users(id, name, email, role)
      `,
      )
      .eq("ticket_id", id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching history:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(history || [])
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
