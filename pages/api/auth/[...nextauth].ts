import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { kv } from "@vercel/kv"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add your own logic here to validate credentials
        // For now, using simple hardcoded credentials
        const validUsername = process.env.AUTH_USERNAME || "admin"
        const validPassword = process.env.AUTH_PASSWORD || "admin123"

        if (credentials?.username === validUsername && credentials?.password === validPassword) {
          return {
            id: "1",
            name: credentials.username,
            email: `${credentials.username}@astrology.local`,
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        // Store session in Vercel KV
        if (process.env.KV_REST_API_URL) {
          await kv.set(`session:${user.id}`, {
            userId: user.id,
            name: user.name,
            email: user.email,
            timestamp: Date.now(),
          }, { ex: 30 * 24 * 60 * 60 }) // 30 days expiry
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token.id && process.env.KV_REST_API_URL) {
        // Verify session exists in KV
        const kvSession = await kv.get(`session:${token.id}`)
        if (kvSession) {
          session.user = {
            ...session.user,
            id: token.id as string,
          }
        }
      } else if (token.id) {
        session.user = {
          ...session.user,
          id: token.id as string,
        }
      }
      return session
    },
    async signOut({ token }) {
      // Clean up KV session on sign out
      if (token?.id && process.env.KV_REST_API_URL) {
        await kv.del(`session:${token.id}`)
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)

