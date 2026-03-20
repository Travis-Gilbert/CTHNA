import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { C, serif, sans, mono } from '../tokens';
import Footer from '../components/Footer';

export default function SuccessScreen({ name }) {
  const firstName = name ? name.split(' ')[0] : 'you';
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) { setShow(true); return; }
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
  }, []);

  const ease = 'cubic-bezier(.16,1,.3,1)';
  const enter = (delay, y = 20) => ({
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0) scale(1)' : `translateY(${y}px)`,
    transition: `opacity .7s ${ease} ${delay}s, transform .7s ${ease} ${delay}s`,
  });

  return (
    <div style={{ minHeight: '100vh', background: C.dark, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '80px clamp(20px,5vw,60px)' }}>
      {/* Checkmark */}
      <div style={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: C.tealDim,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        ...enter(0),
        transform: show ? 'translateY(0) scale(1)' : 'translateY(0) scale(0.7)',
      }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M7 14l5 5 9-9"
            stroke={C.teal}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="28"
            strokeDashoffset={show ? 0 : 28}
            style={{ transition: `stroke-dashoffset .5s ${ease} .4s` }}
          />
        </svg>
      </div>

      <div style={{
        ...mono,
        fontSize: 10,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '.14em',
        color: C.tealBright,
        marginBottom: 16,
        ...enter(0.15),
      }}>
        Application Received
      </div>

      <h1 style={{
        ...serif,
        fontSize: 'clamp(28px, 5vw, 42px)',
        fontWeight: 900,
        color: C.heroText,
        textAlign: 'center',
        marginBottom: 16,
        lineHeight: 1.1,
        ...enter(0.25, 24),
      }}>
        We got it, {firstName}.
      </h1>

      <p style={{
        ...sans,
        fontSize: 16,
        color: 'rgba(240,235,228,.5)',
        textAlign: 'center',
        maxWidth: '42ch',
        lineHeight: 1.7,
        marginBottom: 40,
        ...enter(0.35),
      }}>
        We review every application. Selected performers and vendors hear back by mid-May 2026. Watch your email.
      </p>

      <Link
        to="/"
        style={{
          ...mono,
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '.1em',
          color: C.heroText,
          textDecoration: 'none',
          padding: '14px 28px',
          borderRadius: 8,
          border: '1.5px solid rgba(240,235,228,.2)',
          transition: `border-color .2s, opacity .7s ${ease} .45s, transform .7s ${ease} .45s`,
          ...enter(0.45),
        }}
      >
        Back to Porchfest
      </Link>
    </div>
  );
}
