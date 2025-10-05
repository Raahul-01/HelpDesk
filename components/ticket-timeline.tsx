"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Loader2, Activity } from "lucide-react"
import type { TicketHistory } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

interface TicketTimelineProps {
  ticketId: string
}

const actionLabels: Record<string, string> = {
  created: "created this ticket",
  status_changed: "changed status",
  priority_changed: "changed priority",
  assigned_to_changed: "changed assignment",
  commented: "added a comment",
  assigned: "assigned this ticket",
}

export function TicketTimeline({ ticketId }: TicketTimelineProps) {
  const [history, setHistory] = useState<TicketHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [ticketId])

  const fetchHistory = async () => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}/history`)
      if (!response.ok) throw new Error("Failed to fetch history")
      const data = await response.json()
      setHistory(data)
    } catch (err) {
      console.error("[v0] Error fetching history:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="font-mono text-cyan-400">
          <div className="flex items-center gap-2">
            <span>Loading timeline...</span>
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  if (history.length === 0) {
    return (
      <Card className="p-8 text-center bg-black/50 border border-cyan-500/30">
        <Activity className="h-12 w-12 text-cyan-400 mx-auto mb-3" />
        <p className="text-gray-400 font-mono">// No activity yet</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {history.map((item, index) => (
        <div key={item.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <Avatar className="h-8 w-8 flex-shrink-0 ring-2 ring-cyan-500/30">
              <AvatarFallback className="text-xs font-mono bg-gradient-to-br from-cyan-500 to-purple-600 text-white">
                {item.user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            {index < history.length - 1 && <div className="w-px bg-cyan-500/30 flex-1 my-2" />}
          </div>

          <Card className="flex-1 p-4 bg-black/50 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-mono">
                  <span className="font-medium text-cyan-400">{item.user?.name}</span>{" "}
                  <span className="text-gray-400">{actionLabels[item.action] || item.action}</span>
                </p>
                {item.old_value && item.new_value && (
                  <p className="text-sm text-gray-300 mt-1 font-mono">
                    from <span className="font-medium text-yellow-400">{item.old_value}</span> to{" "}
                    <span className="font-medium text-green-400">{item.new_value}</span>
                  </p>
                )}
                {item.new_value && !item.old_value && item.action === "commented" && (
                  <p className="text-sm text-gray-300 mt-1 italic font-mono">"{item.new_value}..."</p>
                )}
              </div>
              <span className="text-xs text-gray-500 font-mono whitespace-nowrap">
                {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
              </span>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}
