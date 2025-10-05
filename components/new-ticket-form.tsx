"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import type { TicketPriority } from "@/lib/types"

export function NewTicketForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as TicketPriority,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!formData.title.trim() || !formData.description.trim()) {
      setError("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      // For demo purposes, using a hardcoded user ID
      // In production, this would come from the authenticated user
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          created_by: "00000000-0000-0000-0000-000000000004", // Demo user
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to create ticket")
      }

      const ticket = await response.json()
      setSuccess(true)

      // Redirect to the new ticket after a brief delay
      setTimeout(() => {
        router.push(`/tickets/${ticket.id}`)
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive" className="bg-red-500/10 border-red-500/50">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-400 font-mono">{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-500/10 text-green-400 border-green-500/50">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription className="font-mono">Ticket created successfully! Redirecting...</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="title" className="text-cyan-300 font-mono text-sm">
          title: <span className="text-red-400">*</span>
        </Label>
        <Input
          id="title"
          placeholder="Enter ticket title..."
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          disabled={isSubmitting}
          required
          className="bg-black/50 border-cyan-500/50 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-lg font-mono"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-cyan-300 font-mono text-sm">
          description: <span className="text-red-400">*</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Provide detailed information about your issue..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          disabled={isSubmitting}
          rows={8}
          required
          className="bg-black/50 border-cyan-500/50 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-lg font-mono resize-none"
        />
        <p className="text-sm text-gray-400 font-mono">// Be as specific as possible to help us resolve your issue faster</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority" className="text-purple-300 font-mono text-sm">priority:</Label>
        <Select
          value={formData.priority}
          onValueChange={(value) => setFormData({ ...formData, priority: value as TicketPriority })}
          disabled={isSubmitting}
        >
          <SelectTrigger id="priority" className="bg-black/50 border-purple-500/50 text-white focus:border-purple-400 focus:ring-purple-400/20 rounded-lg font-mono">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-black border-purple-500/30 rounded-lg">
            <SelectItem value="low" className="text-white hover:bg-purple-500/20 font-mono">LOW - General inquiry or minor issue</SelectItem>
            <SelectItem value="medium" className="text-white hover:bg-purple-500/20 font-mono">MEDIUM - Standard support request</SelectItem>
            <SelectItem value="high" className="text-white hover:bg-purple-500/20 font-mono">HIGH - Significant impact on work</SelectItem>
            <SelectItem value="urgent" className="text-white hover:bg-purple-500/20 font-mono">URGENT - Critical issue blocking work</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-black/50 border border-orange-500/30 p-4 rounded-lg space-y-2">
        <h3 className="font-mono font-medium text-sm text-orange-400">// SLA Response Times</h3>
        <ul className="text-sm text-orange-300 font-mono space-y-1">
          <li>• URGENT: 4 hours</li>
          <li>• HIGH: 8 hours</li>
          <li>• MEDIUM: 24 hours</li>
          <li>• LOW: 72 hours</li>
        </ul>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ./creating-ticket
            </>
          ) : (
            "$ ./create-ticket"
          )}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting} className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-mono">
          ./cancel
        </Button>
      </div>
    </form>
  )
}
