import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // For demo purposes, we'll allow all requests
  // In production, you'd check authentication here
  return NextResponse.next()
}

export const config = {
  matcher: ["/tickets/:path*", "/api/:path*"],
}
