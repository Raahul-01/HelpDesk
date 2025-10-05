import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Ticket } from "@/lib/types"

interface TicketHeaderProps {
  ticket: Ticket
}

export function TicketHeader({ ticket }: TicketHeaderProps) {
  return (
    <div className="relative z-10 border-b border-cyan-500/30 bg-black/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" asChild className="flex-shrink-0 hover:bg-cyan-500/10 text-cyan-400 hover:text-white transition-all duration-300">
            <Link href="/tickets">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-mono font-bold tracking-tight break-words text-white">{ticket.title}</h1>
            <p className="text-cyan-300 mt-1 font-mono">ticket_id: {ticket.id.slice(0, 8)}...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
