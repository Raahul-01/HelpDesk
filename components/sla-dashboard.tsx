"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, CheckCircle2, Loader2, RefreshCw } from "lucide-react"
import Link from "next/link"

interface SLAStats {
  total: number
  breached: number
  atRisk: number
  byStatus: Record<string, number>
  byPriority: Record<string, number>
}

export function SLADashboard() {
  const [stats, setStats] = useState<SLAStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/sla/stats")
      if (!response.ok) throw new Error("Failed to fetch stats")
      const data = await response.json()
      setStats(data)
    } catch (err) {
      console.error("[v0] Error fetching stats:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const checkBreaches = async () => {
    setIsChecking(true)
    try {
      const response = await fetch("/api/sla/check-breaches", {
        method: "POST",
      })
      if (!response.ok) throw new Error("Failed to check breaches")
      await fetchStats() // Refresh stats after checking
    } catch (err) {
      console.error("[v0] Error checking breaches:", err)
    } finally {
      setIsChecking(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!stats) {
    return <div>Failed to load SLA statistics</div>
  }

  const breachRate = stats.total > 0 ? ((stats.breached / stats.total) * 100).toFixed(1) : "0.0"

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-mono font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            &lt;SLA_Monitor/&gt;
          </h2>
          <p className="text-cyan-200 font-mono text-lg">// Real-time service level agreement monitoring</p>
        </div>
        <Button
          onClick={checkBreaches}
          disabled={isChecking}
          className="group relative bg-transparent border border-cyan-500/50 hover:border-cyan-400 text-cyan-400 hover:text-white transition-all duration-300 font-mono px-6 py-3 rounded-lg"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center gap-2">
            {isChecking ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>./check-breaches</span>
              </>
            ) : (
              <>
                <RefreshCw className="h-5 w-5" />
                <span>$ ./monitor-sla</span>
              </>
            )}
          </div>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-8 bg-black/50 border border-red-500/30 hover:border-red-400/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-mono font-semibold text-red-400 uppercase tracking-wide">SLA_BREACH</p>
              <p className="text-4xl font-mono font-bold text-red-400">{stats.breached}</p>
              <p className="text-sm text-red-300 font-mono">{breachRate}% breach rate</p>
            </div>
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          {stats.breached > 0 && (
            <Button asChild variant="link" className="mt-6 p-0 h-auto text-red-400 hover:text-red-300 font-mono">
              <Link href="/tickets?breached=true">→ view breached tickets</Link>
            </Button>
          )}
        </Card>

        <Card className="p-8 bg-black/50 border border-orange-500/30 hover:border-orange-400/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-mono font-semibold text-orange-400 uppercase tracking-wide">AT_RISK</p>
              <p className="text-4xl font-mono font-bold text-orange-400">{stats.atRisk}</p>
              <p className="text-sm text-orange-300 font-mono">// Within 1 hour of deadline</p>
            </div>
            <div className="p-3 bg-orange-500/20 border border-orange-500/50 rounded-lg">
              <Clock className="h-8 w-8 text-orange-400" />
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-black/50 border border-green-500/30 hover:border-green-400/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-mono font-semibold text-green-400 uppercase tracking-wide">ON_TRACK</p>
              <p className="text-4xl font-mono font-bold text-green-400">
                {stats.total - stats.breached - stats.atRisk}
              </p>
              <p className="text-sm text-green-300 font-mono">// Meeting SLA targets</p>
            </div>
            <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
              <CheckCircle2 className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-8 bg-black/50 border border-cyan-500/30 backdrop-blur-sm hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
          <h3 className="font-mono font-bold text-xl text-cyan-400 mb-6">// Tickets by Status</h3>
          <div className="space-y-4">
            {Object.entries(stats.byStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                <span className="text-sm font-mono font-medium text-cyan-300 uppercase">{status.replace("_", " ")}</span>
                <span className="font-mono font-bold text-lg text-cyan-400">{count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-8 bg-black/50 border border-purple-500/30 backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
          <h3 className="font-mono font-bold text-xl text-purple-400 mb-6">// Tickets by Priority</h3>
          <div className="space-y-4">
            {Object.entries(stats.byPriority).map(([priority, count]) => (
              <div key={priority} className="flex items-center justify-between p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <span className="text-sm font-mono font-medium text-purple-300 uppercase">{priority}</span>
                <span className="font-mono font-bold text-lg text-purple-400">{count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
