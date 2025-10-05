import { Suspense } from "react"
import { TicketsList } from "@/components/tickets-list"
import { TicketsFilters } from "@/components/tickets-filters"
import { SLADashboard } from "@/components/sla-dashboard"
import { Button } from "@/components/ui/button"
import { Plus, Terminal, Database, BarChart3, Zap, Crown, Diamond } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TicketsPage() {
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
            &lt;TicketSystem/&gt;
          </h1>
          <p className="text-cyan-200 font-mono">// Advanced Support Management v2.0</p>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <Tabs defaultValue="tickets" className="w-full">
          {/* Terminal-style Tabs */}
          <TabsList className="mb-8 bg-black/50 border border-cyan-500/30 backdrop-blur-sm">
            <TabsTrigger value="tickets" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-500/50 font-mono">
              <Database className="mr-2 h-4 w-4" />
              tickets.db
            </TabsTrigger>
            <TabsTrigger value="sla" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 data-[state=active]:border-purple-500/50 font-mono">
              <BarChart3 className="mr-2 h-4 w-4" />
              sla_monitor.exe
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="space-y-8">
            <Suspense fallback={
              <div className="flex items-center justify-center py-12">
                <div className="font-mono text-cyan-400">
                  <div className="flex items-center gap-2">
                    <span>Loading ticket filters...</span>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-400"></div>
                  </div>
                </div>
              </div>
            }>
              <TicketsFilters />
            </Suspense>

            <Suspense fallback={
              <div className="flex items-center justify-center py-12">
                <div className="font-mono text-cyan-400">
                  <div className="flex items-center gap-2">
                    <span>Querying database...</span>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-400"></div>
                  </div>
                </div>
              </div>
            }>
              <TicketsList />
            </Suspense>
          </TabsContent>

          <TabsContent value="sla">
            <SLADashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
