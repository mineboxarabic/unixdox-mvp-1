'use client';

import { useEffect } from 'react';

/**
 * Root-level error boundary — catches errors from the root layout itself.
 * Must provide its own <html> and <body> since the layout may have crashed.
 * Cannot use Chakra UI here as it depends on the layout Provider.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Global Error]', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          margin: 0,
          backgroundColor: '#f9fafb',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 480, padding: 32 }}>
          <h2 style={{ color: '#dc2626', marginBottom: 16 }}>
            Erreur critique
          </h2>
          <p style={{ color: '#4b5563', marginBottom: 8 }}>
            {error.message || 'Une erreur inattendue est survenue.'}
          </p>
          {error.digest && (
            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 24 }}>
              Digest: {error.digest}
            </p>
          )}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button
              onClick={reset}
              style={{
                padding: '8px 20px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: 14,
              }}
            >
              Réessayer
            </button>
            <button
              onClick={() => (window.location.href = '/login')}
              style={{
                padding: '8px 20px',
                backgroundColor: 'white',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: 14,
              }}
            >
              Retour à la connexion
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
