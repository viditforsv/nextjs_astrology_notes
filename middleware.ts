import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.AUTH_SECRET || process.env.JWT_SECRET || 'your-secret-key'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Allow access to sign-in page and API auth routes
  if (pathname.startsWith("/auth/signin") || pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }
  
  // Check for auth token
  const token = request.cookies.get('auth-token')?.value
  
  if (!token) {
    const signInUrl = new URL("/auth/signin", request.url)
    signInUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(signInUrl)
  }
  
  // Verify token
  try {
    jwt.verify(token, JWT_SECRET)
    return NextResponse.next()
  } catch {
    // Invalid token, redirect to sign in
    const signInUrl = new URL("/auth/signin", request.url)
    signInUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(signInUrl)
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|m4a)).*)',
  ],
}
