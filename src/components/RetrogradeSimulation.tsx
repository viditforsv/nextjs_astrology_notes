import React, { useState } from 'react';

export default function RetrogradeSimulation() {
  const [iframeError, setIframeError] = useState(false);

  if (iframeError) {
    return (
      <div style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: 'var(--ifm-color-emphasis-100)' }}>
        <p style={{ marginBottom: '0.5rem' }}>
          <strong>Interactive Simulation:</strong> The retrograde motion simulation can be viewed directly on the source website.
        </p>
        <a 
          href="https://simufisica.com/en/retrograde-motion-planets/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            display: 'inline-block',
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--ifm-color-primary)',
            color: 'white',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
          Open Retrograde Motion Simulation →
        </a>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--ifm-color-content-secondary)', fontStyle: 'italic' }}>
          Interactive simulation showing apparent retrograde movement of planets from Earth's perspective. 
          You can switch between heliocentric and geocentric models and adjust simulation parameters.
        </p>
      </div>
    );
  }

  return (
    <div style={{ margin: '1rem 0', width: '100%' }}>
      <iframe
        src="https://simufisica.com/en/retrograde-motion-planets/"
        width="100%"
        height="600"
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          display: 'block',
        }}
        allow="fullscreen"
        title="Retrograde Motion Planets Simulation"
        loading="lazy"
        onError={() => setIframeError(true)}
        onLoad={(e) => {
          // Check if iframe loaded successfully
          try {
            const iframe = e.target as HTMLIFrameElement;
            if (!iframe.contentWindow) {
              setIframeError(true);
            }
          } catch (err) {
            setIframeError(true);
          }
        }}
      />
      <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--ifm-color-content-secondary)', fontStyle: 'italic' }}>
        Interactive simulation showing apparent retrograde movement of planets from Earth's perspective. 
        You can switch between heliocentric and geocentric models and adjust simulation parameters.
      </p>
    </div>
  );
}
