import { NextRequest, NextResponse } from 'next/server'
import { createSession } from '../../../../auth'
import bcrypt from 'bcryptjs'

// Hardcoded credentials (in production, store in database with hashed password)
const VALID_USERNAME = 'astroStu'
// Pre-computed bcrypt hash for 'astro124'
const VALID_PASSWORD_HASH = '$2b$10$xGyDTUFyh2jkopTqtbNGTuUjoZcp.texzPIBSuFDxkxR7hUgosu0C'

export async function POST(request: NextRequest) {
  try {
    const { username, password, callbackUrl } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Verify username
    if (username !== VALID_USERNAME) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, VALID_PASSWORD_HASH)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create session
    const token = createSession({
      email: `${username}@local`,
      name: username,
    })

    // Return success with redirect URL
    const redirectUrl = callbackUrl || '/'
    const response = NextResponse.json({ success: true, redirectUrl })
    
    // Set auth cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    return response
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    )
  }
}

