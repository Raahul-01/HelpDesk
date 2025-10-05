import { createClient } from "@/lib/supabase/server"

export type UserRole = "user" | "agent" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient()

  // For demo purposes, we'll use a simple session-based approach
  // In production, you'd integrate with Supabase Auth
  const { data, error } = await supabase.from("users").select("*").limit(1).single()

  if (error || !data) {
    return null
  }

  return data as User
}

export async function checkRole(allowedRoles: UserRole[]): Promise<boolean> {
  const user = await getCurrentUser()
  if (!user) return false
  return allowedRoles.includes(user.role)
}

export async function requireAuth(allowedRoles?: UserRole[]): Promise<User> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    throw new Error("Forbidden")
  }

  return user
}
