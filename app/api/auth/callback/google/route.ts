import { NextRequest, NextResponse } from 'next/server'
import { createSession } from '../../../../../auth'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  
  // Parse callbackUrl from state if provided
  let callbackUrl = '/'
  if (state) {
    try {
      const stateData = JSON.parse(decodeURIComponent(state))
      callbackUrl = stateData.callbackUrl || '/'
    } catch {
      callbackUrl = '/'
    }
  }

  if (!code) {
    return NextResponse.redirect(new URL('/auth/signin?error=AuthError', request.url))
  }

  try {
    // Exchange code for token
    const redirectUri = `${request.nextUrl.origin}/api/auth/callback/google`
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error('Token exchange error:', errorText)
      throw new Error('Failed to exchange token')
    }

    const tokens = await tokenResponse.json()

    // Get user info
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    })

    if (!userResponse.ok) {
      throw new Error('Failed to get user info')
    }

    const user = await userResponse.json()

    // Create session
    const token = createSession({
      email: user.email,
      name: user.name,
      picture: user.picture,
    })

    // Redirect with cookie
    const response = NextResponse.redirect(new URL(callbackUrl, request.url))
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    return response
  } catch (error: any) {
    console.error('Auth error:', error)
    const errorUrl = new URL('/auth/signin', request.url)
    errorUrl.searchParams.set('error', error.message === 'Email not authorized' ? 'AccessDenied' : 'AuthError')
    return NextResponse.redirect(errorUrl)
  }
}

