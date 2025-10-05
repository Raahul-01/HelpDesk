import { NewTicketForm } from "@/components/new-ticket-form"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Terminal, Code, FileText } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NewTicketPage() {
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
        {[...Array(6)].map((_, i) => (
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
              i % 3 === 0 ? 'bg-cyan-400' : 
              i % 3 === 1 ? 'bg-purple-400' : 'bg-pink-400'
            } rounded-full opacity-40`}></div>
          </div>
        ))}
      </div>

      {/* Page Title */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Button variant="ghost" size="icon" asChild className="hover:bg-cyan-500/10 text-cyan-400 hover:text-white transition-all duration-300 rounded-lg">
              <Link href="/tickets">
                <ArrowLeft className="h-6 w-6" />
              </Link>
            </Button>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative p-3 bg-black border border-cyan-500/50 rounded-lg">
                <FileText className="h-8 w-8 text-cyan-400" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
            &lt;CreateTicket/&gt;
          </h1>
          <p className="text-cyan-200 font-mono">// Initialize new support request</p>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8 max-w-5xl">
        {/* Terminal-style Form Container */}
        <div className="bg-black/90 border border-cyan-500/30 rounded-lg overflow-hidden shadow-2xl">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-cyan-500/30">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs text-gray-400 font-mono">new-ticket-form@terminal:~$</span>
            </div>
          </div>
          
          {/* Terminal Content */}
          <div className="p-8">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm mb-2">
                <span>user@helpdesk:</span>
                <span className="text-white">$</span>
                <span className="text-green-400">./create-ticket --interactive</span>
              </div>
              <div className="text-gray-400 font-mono text-sm">
                // Fill out the form below to create a new support ticket
              </div>
            </div>
            
            <NewTicketForm />
          </div>
        </div>
      </div>
    </div>
  )
}
