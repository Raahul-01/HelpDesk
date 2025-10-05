"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TicketsPaginationProps {
  total: number
  limit: number
  offset: number
}

export function TicketsPagination({ total, limit, offset }: TicketsPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentPage = Math.floor(offset / limit) + 1
  const totalPages = Math.ceil(total / limit)

  const navigate = (newOffset: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("offset", newOffset.toString())
    router.push(`/tickets?${params.toString()}`)
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between border-t border-cyan-500/30 pt-4">
      <p className="text-sm text-gray-400 font-mono">
        // Showing {offset + 1} to {Math.min(offset + limit, total)} of {total} tickets
      </p>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => navigate(offset - limit)} disabled={offset === 0} className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-mono">
          <ChevronLeft className="h-4 w-4 mr-1" />
          ./prev
        </Button>

        <span className="text-sm text-cyan-300 font-mono">
          page {currentPage} of {totalPages}
        </span>

        <Button variant="outline" size="sm" onClick={() => navigate(offset + limit)} disabled={offset + limit >= total} className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-mono">
          ./next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}
