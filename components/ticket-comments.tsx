"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Send, MessageSquare, AlertCircle } from "lucide-react"
import type { Comment } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

interface TicketCommentsProps {
  ticketId: string
}

export function TicketComments({ ticketId }: TicketCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchComments()
  }, [ticketId])

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}/comments`)
      if (!response.ok) throw new Error("Failed to fetch comments")
      const data = await response.json()
      setComments(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load comments")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`/api/tickets/${ticketId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newComment,
          user_id: "00000000-0000-0000-0000-000000000002", // Demo agent
        }),
      })

      if (!response.ok) throw new Error("Failed to post comment")

      const comment = await response.json()
      setComments([...comments, comment])
      setNewComment("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post comment")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="font-mono text-cyan-400">
          <div className="flex items-center gap-2">
            <span>Loading comments...</span>
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive" className="bg-red-500/10 border-red-500/50">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-400 font-mono">{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="mb-4">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm mb-2">
            <span>user@helpdesk:</span>
            <span className="text-white">$</span>
            <span className="text-green-400">./add-comment</span>
          </div>
        </div>
        <Textarea
          placeholder="Enter your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={isSubmitting}
          rows={4}
          className="bg-black/50 border-cyan-500/50 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-lg font-mono resize-none"
        />
        <Button type="submit" disabled={isSubmitting || !newComment.trim()} className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ./posting
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              $ ./post-comment
            </>
          )}
        </Button>
      </form>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <Card className="p-8 text-center bg-black/50 border border-cyan-500/30">
            <MessageSquare className="h-12 w-12 text-cyan-400 mx-auto mb-3" />
            <p className="text-gray-400 font-mono">// No comments yet. Be the first to comment!</p>
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="p-4 bg-black/50 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 flex-shrink-0 ring-2 ring-cyan-500/30">
                  <AvatarFallback className="text-xs font-mono bg-gradient-to-br from-cyan-500 to-purple-600 text-white">
                    {comment.user?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-medium text-sm text-cyan-400">{comment.user?.name}</span>
                    <span className="text-xs text-gray-500 font-mono">
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-words">{comment.content}</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
