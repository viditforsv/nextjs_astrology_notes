import { useState } from "react";
import Layout from '@theme/Layout';

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleGoogleSignIn = () => {
    const callbackUrl = window.location.search.includes('callbackUrl') 
      ? new URLSearchParams(window.location.search).get('callbackUrl') || "/"
      : "/";
    const authUrl = `/api/auth/google?callbackUrl=${encodeURIComponent(callbackUrl)}`;
    window.location.href = authUrl;
  };

  const handleUsernameLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      const callbackUrl = window.location.search.includes('callbackUrl')
        ? new URLSearchParams(window.location.search).get('callbackUrl') || "/"
        : "/";
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          callbackUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.error || "Invalid credentials");
        setIsLoading(false);
        return;
      }

      // Redirect to callback URL
      window.location.href = data.redirectUrl || "/";
    } catch (err) {
      setLoginError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Sign In" description="Sign in to Vedic Astrology Notes">
      <div style={{
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}>
        <div style={{
          background: 'var(--ifm-background-color)',
          borderRadius: '8px',
          padding: '48px 40px',
          maxWidth: '360px',
          width: '100%',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid var(--ifm-color-emphasis-300)',
        }}>
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📿</div>
            <h1 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              margin: '0 0 4px 0',
            }}>
              Vedic Astrology Notes
            </h1>
            <p style={{ 
              color: 'var(--ifm-color-content-secondary)', 
              fontSize: '13px',
              margin: 0
            }}>
              Sign in to continue
            </p>
          </div>
          
          {loginError && (
            <div style={{
              padding: '10px 14px',
              marginBottom: '20px',
              background: '#fef2f2',
              color: '#991b1b',
              borderRadius: '6px',
              fontSize: '13px',
              border: '1px solid #fecaca'
            }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleUsernameLogin} style={{ marginBottom: '20px' }}>
            <div style={{ marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '14px',
                  border: '1px solid var(--ifm-color-emphasis-300)',
                  borderRadius: '6px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  background: 'var(--ifm-background-color)',
                  color: 'var(--ifm-font-color-base)',
                }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '14px',
                  border: '1px solid var(--ifm-color-emphasis-300)',
                  borderRadius: '6px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  background: 'var(--ifm-background-color)',
                  color: 'var(--ifm-font-color-base)',
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                fontWeight: '500',
                color: 'white',
                background: isLoading ? '#666' : 'var(--ifm-color-primary)',
                border: 'none',
                borderRadius: '6px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'background 0.15s',
                fontFamily: 'inherit'
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            margin: '20px 0',
            gap: '12px'
          }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--ifm-color-emphasis-300)' }} />
            <span style={{ fontSize: '12px', color: 'var(--ifm-color-content-secondary)' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--ifm-color-emphasis-300)' }} />
          </div>

          <button
            onClick={handleGoogleSignIn}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              fontWeight: '500',
              color: 'white',
              background: 'var(--ifm-color-primary)',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background 0.15s',
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
              <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.348 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </Layout>
  );
}
