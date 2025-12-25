import React, { useEffect, useState } from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const NavbarExtraContent = () => {
  const [session, setSession] = useState<{ email: string; name?: string } | null>(null)

  useEffect(() => {
    // Check if user is authenticated by checking for cookie
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/session')
        if (response.ok) {
          const data = await response.json()
          setSession(data.user)
        }
      } catch {
        setSession(null)
      }
    }
    checkAuth()
  }, [])

  const handleSignOut = async () => {
    await fetch('/api/auth/signout', { method: 'POST' })
    window.location.href = '/auth/signin'
  }
  
  if (session) {
    return (
      <button
        onClick={handleSignOut}
        style={{
          padding: '6px 12px',
          fontSize: '14px',
          borderRadius: '6px',
          border: '1px solid #e2e8f0',
          background: 'transparent',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        Sign Out
      </button>
    )
  }
  return null
}

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>📿 Vedic Astrology Notes</span>,
  footer: {
    text: 'Vedic Astrology Documentation',
  },
  editLink: {
    component: null,
  },
  feedback: {
    content: null,
  },
  navbar: {
    extraContent: NavbarExtraContent,
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Vedic Astrology Notes'
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Vedic Astrology Notes" />
      <meta property="og:description" content="Comprehensive notes on Vedic Astrology" />
    </>
  ),
  navigation: {
    prev: true,
    next: true
  },
  darkMode: true,
  primaryHue: 260,
  sidebar: {
    defaultMenuCollapseLevel: 0,
    toggleButton: true
  }
}

export default config
