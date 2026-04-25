import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { C, serif, sans, mono } from '../tokens';

const STORAGE_KEY = 'porchfest-2026-application';

export default function PaymentThanks() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');
  const canceled = params.get('canceled') === '1';

  // Clear stored application once payment is confirmed (best-effort).
  useEffect(() => {
    if (sessionId) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // localStorage may be disabled (private mode) -- ignore.
      }
    }
  }, [sessionId]);

  if (canceled) {
    return (
      <div style={{ minHeight: '100vh', background: C.paper, paddingTop: 100, paddingBottom: 80 }}>
        <div
          style={{
            maxWidth: 560,
            margin: '0 auto',
            padding: '40px clamp(20px,5vw,40px)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              ...mono,
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '.14em',
              color: C.inkMuted,
              marginBottom: 12,
            }}
          >
            Payment canceled
          </p>
          <h1
            style={{
              ...serif,
              fontSize: 32,
              fontWeight: 800,
              color: C.ink,
              marginBottom: 12,
            }}
          >
            No charge made.
          </h1>
          <p
            style={{
              ...sans,
              fontSize: 15,
              color: C.inkMuted,
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            Your application is still saved. Head back to finish when you are ready.
          </p>
          <Link
            to="/apply"
            style={{
              ...mono,
              display: 'inline-block',
              padding: '14px 28px',
              borderRadius: 8,
              background: C.gold,
              color: '#fff',
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '.12em',
              textDecoration: 'none',
            }}
          >
            Back to application
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: C.paper, paddingTop: 100, paddingBottom: 80 }}>
      <div
        style={{
          maxWidth: 560,
          margin: '0 auto',
          padding: '40px clamp(20px,5vw,40px)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            border: `2px solid ${C.teal}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke={C.teal}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12l5 5L20 7" />
          </svg>
        </div>
        <p
          style={{
            ...mono,
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '.14em',
            color: C.teal,
            marginBottom: 12,
          }}
        >
          Payment received
        </p>
        <h1
          style={{
            ...serif,
            fontSize: 32,
            fontWeight: 800,
            color: C.ink,
            marginBottom: 12,
          }}
        >
          You are in.
        </h1>
        <p
          style={{
            ...sans,
            fontSize: 15,
            color: C.inkMuted,
            lineHeight: 1.7,
            marginBottom: 28,
            maxWidth: '46ch',
            margin: '0 auto 28px',
          }}
        >
          Thanks for vending Porchfest 2026. We will email a receipt and reach out
          with logistics details before the festival. Questions? Email{' '}
          <a href="mailto:porchfest@cthna.org" style={{ color: C.teal }}>
            porchfest@cthna.org
          </a>
          .
        </p>
        <Link
          to="/"
          style={{
            ...mono,
            display: 'inline-block',
            padding: '14px 28px',
            borderRadius: 8,
            background: C.teal,
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '.12em',
            textDecoration: 'none',
          }}
        >
          Back to Porchfest
        </Link>
      </div>
    </div>
  );
}
