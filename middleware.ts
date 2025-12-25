import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || process.env.JWT_SECRET || 'your-secret-key'
)

// 1. MUST be async to use 'await jwtVerify'
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  if (pathname === "/auth/signin" || pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }
  
  const token = request.cookies.get('auth-token')?.value
  
  if (!token) return redirectToLogin(request)
  
  try {
    // 2. Only use jose. It is Edge compatible.
    await jwtVerify(token, SECRET)
    return NextResponse.next()
  } catch (err) {
    const response = redirectToLogin(request)
    response.cookies.delete('auth-token')
    return response
  }
}

function redirectToLogin(req: NextRequest) {
  const signInUrl = new URL("/auth/signin", req.url)
  if (req.nextUrl.pathname !== "/") {
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
  }
  return NextResponse.redirect(signInUrl)
}

export const config = {
  matcher: ['/((?!api/auth|auth/signin|_next/static|_next/image|favicon.ico).*)'],
}