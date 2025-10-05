import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, AlertTriangle, User } from "lucide-react"
import type { Ticket } from "@/lib/types"
import { getTimeRemaining, isSLABreached } from "@/lib/sla"
import { formatDistanceToNow } from "date-fns"

interface TicketCardProps {
  ticket: Ticket
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

export function TicketCard({ ticket }: TicketCardProps) {
  const breached = isSLABreached(ticket.sla_deadline)
  const timeRemaining = getTimeRemaining(ticket.sla_deadline)

  return (
    <Link href={`/tickets/${ticket.id}`}>
      <Card className="group relative p-6 bg-black/50 border border-cyan-500/30 hover:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-cyan-500/10">
        {/* Terminal-style Header */}
        <div className="flex items-center gap-2 mb-4 text-xs font-mono text-cyan-400">
          <span>ticket_id:</span>
          <span className="text-green-400">{ticket.id.slice(0, 8)}...</span>
          <span className="text-gray-400">|</span>
          <span>status:</span>
          <span className="text-yellow-400">{ticket.status}</span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="font-mono font-bold text-xl text-white truncate group-hover:text-cyan-400 transition-colors">
                {ticket.title}
              </h3>
              {breached && (
                <div className="flex items-center gap-1 bg-red-500/20 border border-red-500/50 text-red-400 px-2 py-1 rounded text-xs font-mono">
                  <AlertTriangle className="h-3 w-3" />
                  SLA_BREACH
                </div>
              )}
            </div>

            <p className="text-gray-300 text-base line-clamp-2 mb-4 leading-relaxed font-mono">
              {ticket.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className={`px-3 py-1 rounded font-mono text-xs ${
                ticket.status === 'open' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' :
                ticket.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
                ticket.status === 'resolved' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
                'bg-gray-500/20 text-gray-400 border border-gray-500/50'
              }`}>
                {ticket.status.replace("_", " ").toUpperCase()}
              </div>
              
              <div className={`px-3 py-1 rounded font-mono text-xs ${
                ticket.priority === 'urgent' ? 'bg-red-500/20 text-red-400 border border-red-500/50' :
                ticket.priority === 'high' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50' :
                ticket.priority === 'medium' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' :
                'bg-gray-500/20 text-gray-400 border border-gray-500/50'
              }`}>
                {ticket.priority.toUpperCase()}
              </div>

              <div className={`flex items-center gap-2 px-3 py-1 rounded font-mono text-xs ${
                breached 
                  ? "bg-red-500/20 text-red-400 border border-red-500/50" 
                  : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
              }`}>
                <Clock className="h-3 w-3" />
                <span>{timeRemaining}</span>
              </div>

              {ticket.assignee && (
                <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/50 rounded font-mono text-xs">
                  <User className="h-3 w-3" />
                  <span>{ticket.assignee.name}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10 ring-2 ring-cyan-500/30 group-hover:ring-cyan-400/50 transition-all">
                <AvatarFallback className="text-sm font-mono font-bold bg-gradient-to-br from-cyan-500 to-purple-600 text-white">
                  {ticket.creator?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 font-mono">
                created_at
              </div>
              <div className="text-sm text-gray-300 font-mono">
                {formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true })}
              </div>
            </div>
          </div>
        </div>

        {/* Terminal-style Footer */}
        <div className="mt-4 pt-3 border-t border-cyan-500/20">
          <div className="flex items-center justify-between text-xs font-mono text-gray-500">
            <span>→ Click to view details</span>
            <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
              ./view-ticket
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
