import { NextResponse } from "next/server"
import { SignJWT } from "jose"
import { OAuth2Client } from "google-auth-library"

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || process.env.AUTH_SECRET || 'secret')
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

export async function POST(req: Request) {
  const { password, googleToken } = await req.json()
  let isValid = false

  // 1. Strategy A: Fixed Password
  if (password === process.env.ADMIN_PASSWORD) {
    isValid = true
  } 
  
  // 2. Strategy B: Google Auth
  else if (googleToken) {
    try {
      const client = new OAuth2Client(GOOGLE_CLIENT_ID)
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: GOOGLE_CLIENT_ID,
      })
      // Optional: Check if email is allowed
      // const email = ticket.getPayload()?.email
      // if (email === "my@email.com") isValid = true
      isValid = true 
    } catch (e) { 
      console.error("Google Auth Failed", e) 
    }
  }

  if (!isValid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // 3. Issue the "Pass" (JWT Cookie)
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(SECRET)

  const response = NextResponse.json({ success: true })
  
  response.cookies.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
    sameSite: 'lax',
  })

  return response
}

