import { NextRequest, NextResponse } from 'next/server'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  
  // Redirect to Google OAuth
  const redirectUri = `${request.nextUrl.origin}/api/auth/callback/google`
  const scope = 'openid email profile'
  const state = encodeURIComponent(JSON.stringify({ callbackUrl }))
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope,
    access_type: 'offline',
    prompt: 'consent',
    state,
  })}`
  
  return NextResponse.redirect(authUrl)
}
