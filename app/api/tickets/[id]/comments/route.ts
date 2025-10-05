import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: comments, error } = await supabase
      .from("comments")
      .select(
        `
        *,
        user:users(id, name, email, role)
      `,
      )
      .eq("ticket_id", id)
      .order("created_at", { ascending: true })

    if (error) {
      console.error("Error fetching comments:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(comments || [])
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const body = await request.json()

    const { content, user_id } = body

    if (!content || !user_id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Insert comment
    const { data: comment, error: commentError } = await supabase
      .from("comments")
      .insert({
        ticket_id: id,
        user_id,
        content,
      })
      .select(
        `
        *,
        user:users(id, name, email, role)
      `,
      )
      .single()

    if (commentError) {
      console.error("Error creating comment:", commentError)
      return NextResponse.json({ error: commentError.message }, { status: 500 })
    }

    // Log comment in history
    await supabase.from("ticket_history").insert({
      ticket_id: id,
      user_id,
      action: "commented",
      new_value: content.substring(0, 100),
    })

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
