import type { TicketPriority } from "./types"

// SLA deadlines in hours based on priority
const SLA_HOURS: Record<TicketPriority, number> = {
  urgent: 4,
  high: 8,
  medium: 24,
  low: 72,
}

export function calculateSLADeadline(priority: TicketPriority, createdAt: Date = new Date()): Date {
  const hours = SLA_HOURS[priority]
  const deadline = new Date(createdAt)
  deadline.setHours(deadline.getHours() + hours)
  return deadline
}

export function isSLABreached(deadline: string | Date): boolean {
  const deadlineDate = typeof deadline === "string" ? new Date(deadline) : deadline
  return new Date() > deadlineDate
}

export function getTimeRemaining(deadline: string | Date): string {
  const deadlineDate = typeof deadline === "string" ? new Date(deadline) : deadline
  const now = new Date()
  const diff = deadlineDate.getTime() - now.getTime()

  if (diff <= 0) {
    const overdue = Math.abs(diff)
    const hours = Math.floor(overdue / (1000 * 60 * 60))
    const minutes = Math.floor((overdue % (1000 * 60 * 60)) / (1000 * 60))
    return `Overdue by ${hours}h ${minutes}m`
  }

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (hours < 1) {
    return `${minutes}m remaining`
  }

  return `${hours}h ${minutes}m remaining`
}
