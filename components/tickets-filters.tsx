"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { useState, useTransition } from "react"

export function TicketsFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [search, setSearch] = useState(searchParams.get("search") || "")

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all") {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete("offset") // Reset pagination
    startTransition(() => {
      router.push(`/tickets?${params.toString()}`)
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilter("search", search)
  }

  const clearFilters = () => {
    setSearch("")
    startTransition(() => {
      router.push("/tickets")
    })
  }

  const hasFilters =
    searchParams.get("search") ||
    searchParams.get("status") ||
    searchParams.get("priority") ||
    searchParams.get("breached")

  return (
    <div className="mb-8 space-y-6">
      {/* Terminal-style Search */}
      <div className="bg-black/50 border border-cyan-500/30 backdrop-blur-sm rounded-lg p-6 shadow-2xl">
        <div className="mb-4">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm">
            <span>user@helpdesk:</span>
            <span className="text-white">$</span>
            <span className="text-green-400">./search-tickets</span>
          </div>
        </div>
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400" />
            <Input
              placeholder="Enter search query..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 text-base bg-black/50 border-cyan-500/50 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-lg font-mono"
            />
          </div>
          <Button type="submit" disabled={isPending} className="h-12 px-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 rounded-lg font-mono">
            {isPending ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              "Execute"
            )}
          </Button>
        </form>
      </div>

      {/* Terminal-style Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="bg-black/50 border border-cyan-500/30 backdrop-blur-sm rounded-lg p-4 shadow-xl">
          <div className="text-xs text-cyan-400 font-mono mb-2">// Filter by Status</div>
          <Select defaultValue={searchParams.get("status") || "all"} onValueChange={(v) => updateFilter("status", v)}>
            <SelectTrigger className="w-[180px] h-11 bg-black/50 border-cyan-500/50 text-white focus:border-cyan-400 focus:ring-cyan-400/20 rounded-lg font-mono">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-black border-cyan-500/30 rounded-lg">
              <SelectItem value="all" className="text-white hover:bg-cyan-500/20">All Status</SelectItem>
              <SelectItem value="open" className="text-white hover:bg-cyan-500/20">Open</SelectItem>
              <SelectItem value="in_progress" className="text-white hover:bg-cyan-500/20">In Progress</SelectItem>
              <SelectItem value="resolved" className="text-white hover:bg-cyan-500/20">Resolved</SelectItem>
              <SelectItem value="closed" className="text-white hover:bg-cyan-500/20">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-black/50 border border-purple-500/30 backdrop-blur-sm rounded-lg p-4 shadow-xl">
          <div className="text-xs text-purple-400 font-mono mb-2">// Filter by Priority</div>
          <Select defaultValue={searchParams.get("priority") || "all"} onValueChange={(v) => updateFilter("priority", v)}>
            <SelectTrigger className="w-[180px] h-11 bg-black/50 border-purple-500/50 text-white focus:border-purple-400 focus:ring-purple-400/20 rounded-lg font-mono">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent className="bg-black border-purple-500/30 rounded-lg">
              <SelectItem value="all" className="text-white hover:bg-purple-500/20">All Priority</SelectItem>
              <SelectItem value="low" className="text-white hover:bg-purple-500/20">Low</SelectItem>
              <SelectItem value="medium" className="text-white hover:bg-purple-500/20">Medium</SelectItem>
              <SelectItem value="high" className="text-white hover:bg-purple-500/20">High</SelectItem>
              <SelectItem value="urgent" className="text-white hover:bg-purple-500/20">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-black/50 border border-orange-500/30 backdrop-blur-sm rounded-lg p-4 shadow-xl">
          <div className="text-xs text-orange-400 font-mono mb-2">// Filter by SLA</div>
          <Select defaultValue={searchParams.get("breached") || "all"} onValueChange={(v) => updateFilter("breached", v)}>
            <SelectTrigger className="w-[180px] h-11 bg-black/50 border-orange-500/50 text-white focus:border-orange-400 focus:ring-orange-400/20 rounded-lg font-mono">
              <SelectValue placeholder="SLA Status" />
            </SelectTrigger>
            <SelectContent className="bg-black border-orange-500/30 rounded-lg">
              <SelectItem value="all" className="text-white hover:bg-orange-500/20">All Tickets</SelectItem>
              <SelectItem value="true" className="text-white hover:bg-orange-500/20">Breached Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {hasFilters && (
          <div className="bg-black/50 border border-red-500/30 backdrop-blur-sm rounded-lg p-4 shadow-xl">
            <div className="text-xs text-red-400 font-mono mb-2">// Reset Filters</div>
            <Button variant="outline" onClick={clearFilters} disabled={isPending} className="h-11 px-6 border-red-500/50 hover:border-red-400 hover:bg-red-500/10 text-red-400 hover:text-white rounded-lg font-mono">
              <X className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
