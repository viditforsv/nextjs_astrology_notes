import { signIn } from "next-auth/react"
import { GetServerSideProps } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"
import { useState } from "react"
import { useRouter } from "next/router"

export default function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid credentials')
        setLoading(false)
      } else {
        router.push('/')
      }
    } catch (error) {
      setError('An error occurred')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fafafa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '8px',
        padding: '48px 40px',
        maxWidth: '360px',
        width: '100%',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e5e5e5'
      }}>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>📿</div>
          <h1 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            margin: '0 0 4px 0',
            color: '#111',
            letterSpacing: '-0.01em'
          }}>
            Vedic Astrology Notes
          </h1>
          <p style={{ 
            color: '#666', 
            fontSize: '13px',
            margin: 0
          }}>
            Sign in to continue
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                outline: 'none',
                transition: 'border-color 0.15s',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#111'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#ddd'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                outline: 'none',
                transition: 'border-color 0.15s',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#111'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#ddd'
              }}
            />
          </div>

          {error && (
            <div style={{
              padding: '10px 14px',
              marginBottom: '16px',
              background: '#fef2f2',
              color: '#991b1b',
              borderRadius: '6px',
              fontSize: '13px',
              border: '1px solid #fecaca'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              fontWeight: '500',
              color: 'white',
              background: loading ? '#888' : '#111',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s',
              fontFamily: 'inherit'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.background = '#000'
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.currentTarget.style.background = '#111'
              }
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)
  
  if (session) {
    return { 
      redirect: { 
        destination: "/",
        permanent: false,
      } 
    }
  }
  
  return {
    props: {},
  }
}

