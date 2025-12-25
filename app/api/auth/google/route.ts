import { NextRequest, NextResponse } from 'next/server'
import { createSession } from '../../../../auth'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  if (!code) {
    // Redirect to Google OAuth
    const redirectUri = `${request.nextUrl.origin}/api/auth/google`
    const scope = 'openid email profile'
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope,
      access_type: 'offline',
      prompt: 'consent',
      callbackUrl,
    })}`
    
    return NextResponse.redirect(authUrl)
  }

  try {
    // Exchange code for token
    const redirectUri = `${request.nextUrl.origin}/api/auth/google`
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

