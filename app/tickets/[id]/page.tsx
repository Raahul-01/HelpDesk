import { createClient } from "@/lib/supabase/server"
import { TicketHeader } from "@/components/ticket-header"
import { TicketDetails } from "@/components/ticket-details"
import { TicketComments } from "@/components/ticket-comments"
import { TicketTimeline } from "@/components/ticket-timeline"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { notFound, redirect } from "next/navigation"
import { FileText, Clock } from "lucide-react"
import type { Ticket } from "@/lib/types"

export default async function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // If someone navigates to /tickets/new, redirect to the proper static route
  if (id === "new") {
    redirect("/tickets/new")
  }

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

  if (error || !ticket) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-orange-900/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            <div className={`w-3 h-3 ${
              i % 4 === 0 ? 'bg-cyan-400' : 
              i % 4 === 1 ? 'bg-pink-400' : 
              i % 4 === 2 ? 'bg-purple-400' : 'bg-orange-400'
            } rounded-full opacity-40`}></div>
          </div>
        ))}
      </div>

      {/* Page Title */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
            {ticket.title}
          </h1>
          <p className="text-cyan-200 font-mono">ticket_id: {ticket.id.slice(0, 8)}...</p>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <TicketDetails ticket={ticket} />

            <Tabs defaultValue="comments" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-cyan-500/30 backdrop-blur-sm">
                <TabsTrigger value="comments" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-500/50 font-mono">
                  <FileText className="mr-2 h-4 w-4" />
                  comments.log
                </TabsTrigger>
                <TabsTrigger value="timeline" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 data-[state=active]:border-purple-500/50 font-mono">
                  <Clock className="mr-2 h-4 w-4" />
                  timeline.json
                </TabsTrigger>
              </TabsList>
              <TabsContent value="comments" className="mt-8">
                <TicketComments ticketId={id} />
              </TabsContent>
              <TabsContent value="timeline" className="mt-8">
                <TicketTimeline ticketId={id} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <TicketDetails ticket={ticket} sidebarView />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
