"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, AlertTriangle, Calendar, AlertCircle } from "lucide-react"
import type { Ticket } from "@/lib/types"
import { getTimeRemaining, isSLABreached } from "@/lib/sla"
import { formatDistanceToNow } from "date-fns"
import { useRouter } from "next/navigation"

interface TicketDetailsProps {
  ticket: Ticket
  sidebarView?: boolean
}

const statusColors = {
  open: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  in_progress: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  resolved: "bg-green-500/10 text-green-700 dark:text-green-400",
  closed: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
}

const priorityColors = {
  low: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
  medium: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  high: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
  urgent: "bg-red-500/10 text-red-700 dark:text-red-400",
}

export function TicketDetails({ ticket: initialTicket, sidebarView = false }: TicketDetailsProps) {
  const router = useRouter()
  const [ticket, setTicket] = useState(initialTicket)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const breached = isSLABreached(ticket.sla_deadline)
  const timeRemaining = getTimeRemaining(ticket.sla_deadline)

  const handleUpdate = async (field: string, value: string) => {
    setError(null)
    setIsUpdating(true)

    try {
      const response = await fetch(`/api/tickets/${ticket.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [field]: value,
          version: ticket.version,
          user_id: "00000000-0000-0000-0000-000000000002", // Demo agent
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        if (response.status === 409) {
          setError("This ticket was modified by another user. Please refresh the page.")
        } else {
          throw new Error(data.error || "Failed to update ticket")
        }
        return
      }

      const updatedTicket = await response.json()
      setTicket(updatedTicket)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsUpdating(false)
    }
  }

  if (sidebarView) {
    return (
      <Card className="p-8 space-y-8 bg-black/50 border border-cyan-500/30 backdrop-blur-sm shadow-2xl">
        <div>
          <h3 className="font-mono font-bold text-xl text-cyan-400 mb-6">// Ticket Information</h3>

          {error && (
            <Alert variant="destructive" className="mb-6 border-red-500/50 bg-red-500/10">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-400 font-mono">{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
            <div>
              <Label className="text-sm font-mono font-semibold text-cyan-300 mb-3 block">status:</Label>
              <Select
                value={ticket.status}
                onValueChange={(value) => handleUpdate("status", value)}
                disabled={isUpdating}
              >
                <SelectTrigger className="h-12 bg-black/50 border-cyan-500/50 text-white focus:border-cyan-400 focus:ring-cyan-400/20 rounded-lg font-mono">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-cyan-500/30 rounded-lg">
                  <SelectItem value="open" className="text-white hover:bg-cyan-500/20">OPEN</SelectItem>
                  <SelectItem value="in_progress" className="text-white hover:bg-cyan-500/20">IN_PROGRESS</SelectItem>
                  <SelectItem value="resolved" className="text-white hover:bg-cyan-500/20">RESOLVED</SelectItem>
                  <SelectItem value="closed" className="text-white hover:bg-cyan-500/20">CLOSED</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-mono font-semibold text-purple-300 mb-3 block">priority:</Label>
              <Select
                value={ticket.priority}
                onValueChange={(value) => handleUpdate("priority", value)}
                disabled={isUpdating}
              >
                <SelectTrigger className="h-12 bg-black/50 border-purple-500/50 text-white focus:border-purple-400 focus:ring-purple-400/20 rounded-lg font-mono">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-purple-500/30 rounded-lg">
                  <SelectItem value="low" className="text-white hover:bg-purple-500/20">LOW</SelectItem>
                  <SelectItem value="medium" className="text-white hover:bg-purple-500/20">MEDIUM</SelectItem>
                  <SelectItem value="high" className="text-white hover:bg-purple-500/20">HIGH</SelectItem>
                  <SelectItem value="urgent" className="text-white hover:bg-purple-500/20">URGENT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block">SLA Deadline</Label>
              <div className={`flex items-center gap-3 p-4 rounded-xl ${
                breached 
                  ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800" 
                  : "bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
              }`}>
                <Clock className={`h-5 w-5 ${breached ? "text-red-600 dark:text-red-400" : "text-slate-500 dark:text-slate-400"}`} />
                <span className={`text-sm font-semibold ${breached ? "text-red-600 dark:text-red-400" : "text-slate-700 dark:text-slate-300"}`}>
                  {timeRemaining}
                </span>
                {breached && <AlertTriangle className="h-5 w-5 text-red-500" />}
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block">Created By</Label>
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                <Avatar className="h-8 w-8 ring-2 ring-slate-200 dark:ring-slate-600">
                  <AvatarFallback className="text-sm font-semibold bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    {ticket.creator?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{ticket.creator?.name}</span>
              </div>
            </div>

            {ticket.assignee && (
              <div>
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block">Assigned To</Label>
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                  <Avatar className="h-8 w-8 ring-2 ring-slate-200 dark:ring-slate-600">
                    <AvatarFallback className="text-sm font-semibold bg-gradient-to-br from-green-500 to-green-600 text-white">
                      {ticket.assignee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{ticket.assignee.name}</span>
                </div>
              </div>
            )}

            <div>
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block">Created</Label>
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                <Calendar className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <Badge className={`${statusColors[ticket.status]} px-4 py-2 font-semibold rounded-full text-sm`}>
          {ticket.status.replace("_", " ")}
        </Badge>
        <Badge className={`${priorityColors[ticket.priority]} px-4 py-2 font-semibold rounded-full text-sm`}>
          {ticket.priority}
        </Badge>
        {breached && (
          <Badge className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 px-4 py-2 font-semibold rounded-full text-sm">
            <AlertTriangle className="h-4 w-4 mr-2" />
            SLA Breached
          </Badge>
        )}
      </div>

      <div className="prose prose-lg max-w-none dark:prose-invert prose-slate dark:prose-slate">
        <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{ticket.description}</p>
      </div>
    </Card>
  )
}
