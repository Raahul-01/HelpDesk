export function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url || url.trim() === "") {
    throw new Error("Missing env NEXT_PUBLIC_SUPABASE_URL")
  }
  return url
}

export function getSupabaseAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!key || key.trim() === "") {
    throw new Error("Missing env NEXT_PUBLIC_SUPABASE_ANON_KEY")
  }
  return key
}


