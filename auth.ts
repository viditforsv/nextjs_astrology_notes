import { NextRequest, NextResponse } from 'next/server'
import { IncomingMessage, ServerResponse } from 'http'
import jwt from 'jsonwebtoken'

export interface Session {
  email: string
  name?: string
  picture?: string
}

const JWT_SECRET = process.env.AUTH_SECRET || process.env.JWT_SECRET || 'your-secret-key'
const allowedUsers = process.env.ALLOWED_USERS?.split(",").map(email => email.trim()) || []

export function isEmailAllowed(email: string): boolean {
  return allowedUsers.length === 0 || allowedUsers.includes(email)
}

// For App Router (Server Components)
export async function getSession(): Promise<Session | null> {
  try {
    const { cookies } = await import('next/headers')
    const cookieStore = cookies()
    const token = cookieStore.get('auth-token')?.value
    
    if (!token) {
      return null
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as Session
    return decoded
  } catch {
    return null
  }
}

// For Pages Router (getServerSideProps)
export function getSessionFromRequest(req: IncomingMessage): Session | null {
  try {
    const cookies = req.headers.cookie?.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=')
      acc[key] = value
      return acc
    }, {} as Record<string, string>)
    
    const token = cookies?.['auth-token']
    
    if (!token) {
      return null
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as Session
    return decoded
  } catch {
    return null
  }
}

export function createSession(user: { email: string; name?: string; picture?: string }): string {
  if (!isEmailAllowed(user.email)) {
    throw new Error('Email not authorized')
  }
  
  const session: Session = {
    email: user.email,
    name: user.name,
    picture: user.picture,
  }
  
  return jwt.sign(session, JWT_SECRET, { expiresIn: '30d' })
}

// For App Router
export async function deleteSession(): Promise<void> {
  const { cookies } = await import('next/headers')
  const cookieStore = cookies()
  cookieStore.delete('auth-token')
}
