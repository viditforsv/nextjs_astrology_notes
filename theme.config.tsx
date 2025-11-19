import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useSession, signOut } from 'next-auth/react'

const NavbarExtraContent = () => {
  const { data: session } = useSession()
  
  if (session) {
    return (
      <button
        onClick={() => signOut()}
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
    defaultMenuCollapseLevel: 1,
    toggleButton: true
  }
}

export default config

