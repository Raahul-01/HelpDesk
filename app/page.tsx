import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Ticket,
  Users,
  Clock,
  BarChart3,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
  Star,
  MessageSquare,
  TrendingUp,
  Sparkles,
  Rocket,
  Target,
  Award,
  Globe,
  Heart,
  Lightbulb,
  Settings,
  Database,
  Lock,
  Smartphone,
  Monitor,
  Laptop,
  Coffee,
  Music,
  Palette,
  Camera,
  BookOpen,
  Compass,
  Crown,
  Diamond,
  Flame,
  Gamepad2 as Gamepad,
  Headphones,
  Layers,
  Megaphone,
  Mic,
  Moon,
  Sun,
  TreePine,
  Waves,
  Wind
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Unique Animated Grid Background */}
      

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
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
            <div className={`w-4 h-4 ${
              i % 4 === 0 ? 'bg-cyan-400' : 
              i % 4 === 1 ? 'bg-pink-400' : 
              i % 4 === 2 ? 'bg-purple-400' : 'bg-orange-400'
            } rounded-full opacity-60`}></div>
          </div>
        ))}
      </div>


      {/* Unique Terminal-Style Hero */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Terminal Window */}
          <div className="bg-black/90 border border-cyan-500/30 rounded-lg overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-cyan-500/30">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-gray-400 font-mono">helpdesk@terminal:~$</span>
              </div>
            </div>
            
            {/* Terminal Content */}
            <div className="p-8 font-mono text-sm">
              <div className="space-y-6">

                <div className="flex items-center gap-2">
                  <span className="text-cyan-400">user@helpdesk:</span>
                  <span className="text-white">$</span>
                  <span className="text-green-400">cat welcome.txt</span>
                </div>
                
                <div className="ml-4 space-y-2 text-gray-300">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    Welcome to HelpDesk
                  </div>
                  <div className="text-lg text-gray-400">
                    // The most advanced support system ever built
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-6">
                  <span className="text-cyan-400">user@helpdesk:</span>
                  <span className="text-white">$</span>
                  <span className="text-green-400">./features --list</span>
                </div>
                
                <div className="ml-4 space-y-1 text-gray-300">
                  <div>✓ AI-powered ticket routing</div>
                  <div>✓ Real-time SLA monitoring</div>
                  <div>✓ Advanced analytics dashboard</div>
                  <div>✓ Multi-channel support</div>
                  <div>✓ Custom automation workflows</div>
                </div>
                
                <div className="flex items-center gap-2 mt-6">
                  <span className="text-cyan-400">user@helpdesk:</span>
                  <span className="text-white">$</span>
                  <span className="text-green-400">./launch --interactive</span>
                </div>
                
                <div className="ml-4">
                  <div className="text-gray-400 mb-4">Choose your action:</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button asChild className="group bg-transparent border border-cyan-500/50 hover:border-cyan-400 text-cyan-400 hover:text-white transition-all duration-300 font-mono justify-start p-4 h-auto">
                      <Link href="/tickets">
                        <div className="flex items-center gap-3">
                          <Monitor className="h-5 w-5" />
                          <div>
                            <div className="font-semibold">View Dashboard</div>
                            <div className="text-xs text-gray-500">Access ticket management</div>
                          </div>
                        </div>
                      </Link>
                    </Button>
                    
                    <Button asChild className="group bg-transparent border border-purple-500/50 hover:border-purple-400 text-purple-400 hover:text-white transition-all duration-300 font-mono justify-start p-4 h-auto">
                      <Link href="/tickets/new">
                        <div className="flex items-center gap-3">
                          <Ticket className="h-5 w-5" />
                          <div>
                            <div className="font-semibold">Create Ticket</div>
                            <div className="text-xs text-gray-500">Start new support request</div>
                          </div>
                        </div>
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-8">
                  <span className="text-cyan-400">user@helpdesk:</span>
                  <span className="text-white">$</span>
                  <span className="text-green-400 animate-pulse">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unique ASCII Art Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="font-mono text-cyan-400 text-sm mb-8">
            <pre className="text-left max-w-2xl mx-auto">
{`  ╔════════════════════════════════════════════════════════════╗
    ║   🚀 HELP DESK SYSTEM FEATURES                             ║
    ╚════════════════════════════════════════════════════════════╝

    ┌──────────────────────────────┐   ┌──────────────────────────────┐
    │  💡 AI-POWERED INTELLIGENCE │   │  ⚡ REAL-TIME SLA MONITORING│
    │  └ Smart ticket routing      │   │  └ Live breach detection     │
    │  └ Automated replies         │   │  └ Instant notifications     │
    │  └ Predictive analytics      │   │  └ Service health dashboards │
    └──────────────────────────────┘   └──────────────────────────────┘

    ┌──────────────────────────────┐   ┌──────────────────────────────┐
    │  🔧 ADVANCED AUTOMATION      │   │  🌐 OMNICHANNEL COLLABORATION │
    │  └ Custom workflows          │   │  └ Comments & timelines      │
    │  └ Smart escalations         │   │  └ Roles & permissions       │
    │  └ Auto-assignments          │   │  └ Email/web integrations    │
    └──────────────────────────────┘   └──────────────────────────────┘`}
            </pre>
          </div>
        </div>

        {/* Interactive Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: Coffee, 
              title: "Developer Friendly", 
              desc: "Built by developers, for developers",
              color: "from-orange-500 to-red-500",
              bgColor: "bg-orange-500/10",
              borderColor: "border-orange-500/30"
            },
            { 
              icon: Gamepad, 
              title: "Gamified Experience", 
              desc: "Make support fun with achievements",
              color: "from-purple-500 to-pink-500",
              bgColor: "bg-purple-500/10",
              borderColor: "border-purple-500/30"
            },
            { 
              icon: Music, 
              title: "Zen Mode", 
              desc: "Focus mode for deep work",
              color: "from-green-500 to-teal-500",
              bgColor: "bg-green-500/10",
              borderColor: "border-green-500/30"
            }
          ].map((feature, index) => (
            <div key={index} className={`group relative p-6 ${feature.bgColor} border ${feature.borderColor} rounded-lg hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 bg-gradient-to-r ${feature.color} rounded-lg`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white font-mono">{feature.title}</h3>
              </div>
              <p className="text-gray-300 mb-4">{feature.desc}</p>
              <div className="flex items-center text-cyan-400 font-mono text-sm">
                <span>→ explore</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Matrix-Style Stats */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="bg-black/50 border border-cyan-500/30 rounded-lg p-8 backdrop-blur-sm">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-mono font-bold text-cyan-400 mb-4">
              &lt;system_stats&gt;
            </h2>
            <p className="text-gray-400 font-mono">// Real-time performance metrics</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "∞", label: "Tickets Processed", color: "text-cyan-400" },
              { value: "99.9%", label: "Uptime", color: "text-green-400" },
              { value: "0ms", label: "Response Time", color: "text-purple-400" },
              { value: "24/7", label: "AI Monitoring", color: "text-orange-400" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className={`text-4xl font-mono font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cyberpunk CTA */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="font-mono text-cyan-400 text-lg mb-8">
            <pre>
{`  ╔══════════════════════════════════════════╗
    ║  🚀 READY TO HACK THE SUPPORT GAME? 🚀  ║
    ╚══════════════════════════════════════════╝`}
            </pre>
          </div>
          
          <p className="text-xl text-gray-300 mb-12 font-mono">
            // Join the elite support hackers who've already upgraded their systems
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono px-8 py-4 text-lg border-0 rounded-lg overflow-hidden">
              <Link href="/tickets">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center gap-3">
                  <Crown className="h-6 w-6" />
                  <span>Become Elite</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            </Button>
            
            <Button asChild className="group border-2 border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/10 text-purple-400 hover:text-white transition-all duration-500 rounded-lg px-8 py-4 text-lg font-mono">
              <Link href="/tickets/new">
                <Diamond className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Create Magic</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cyberpunk Footer */}
      <footer className="relative z-10 border-t border-cyan-500/30 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative p-2 bg-black border border-cyan-500/50 rounded-lg">
                  <Ticket className="h-6 w-6 text-cyan-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-mono font-bold text-cyan-400">&lt;HelpDesk/&gt;</h3>
                <p className="text-xs text-gray-400 font-mono">// Next-Gen Support System</p>
              </div>
            </div>
            <div className="text-sm text-gray-400 font-mono">
              © 2024 HelpDesk System. Powered by Next.js + Supabase + ☕
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
