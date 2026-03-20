import { useEffect, useRef, useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import { C, serif, sans, mono } from '../tokens';
import { HERO_COPY, PHOTOS } from '../porchfest-data';

export default function Hero() {
  const bgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Gentle parallax on background image
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (bgRef.current) {
            const y = window.scrollY * 0.3;
            bgRef.current.style.transform = `translateY(${y}px) scale(1.05)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Trigger entrance after image loads
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      overflow: 'hidden',
      background: C.dark,
    }}>
      {/* Background poster with parallax */}
      <div style={{ position: 'absolute', inset: '-5% 0', overflow: 'hidden' }}>
        <img
          ref={bgRef}
          src={PHOTOS.hero}
          alt="Porchfest 2026 poster: handcrafted stop-motion scene of musicians playing guitar and banjo on a front porch in Carriage Town"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
            transform: 'scale(1.05)',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 1.2s cubic-bezier(.16,1,.3,1)',
          }}
          loading="eager"
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(26,24,22,.96) 0%, rgba(26,24,22,.65) 35%, rgba(26,24,22,.15) 60%, rgba(42,36,32,.05) 100%)',
        }} />
      </div>

      {/* Content with staggered entrance */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: '0 clamp(24px,5vw,80px) 64px',
        maxWidth: 1100,
      }}>
        <ScrollReveal delay={0} distance={20}>
          <div style={{
            ...mono,
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '.18em',
            color: C.tealBright,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <span className="hero-line" style={{
              display: 'block',
              width: loaded ? 28 : 0,
              height: 2,
              background: C.tealBright,
              transition: 'width .6s cubic-bezier(.16,1,.3,1) .3s',
            }} />
            {HERO_COPY.tag} <span style={{ color: C.burgBright }}>{HERO_COPY.tagAccent}</span> &middot; {HERO_COPY.tagSuffix}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1} distance={30}>
          <h1 style={{
            ...serif,
            fontSize: 'clamp(48px, 10vw, 96px)',
            fontWeight: 900,
            lineHeight: 0.95,
            color: C.heroText,
            marginBottom: 22,
            maxWidth: '18ch',
          }}>
            <span style={{ color: C.burgBright, fontWeight: 900, display: 'block' }}>Porchfest</span>
            <span style={{ fontWeight: 600 }}>Flint's Best Fest</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={2} distance={24}>
          <p style={{
            ...sans,
            fontSize: 'clamp(16px, 2.2vw, 19px)',
            lineHeight: 1.7,
            color: 'rgba(240,235,228,.55)',
            maxWidth: '50ch',
            marginBottom: 32,
          }}>
            {HERO_COPY.sub}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={3} distance={20}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px 40px', marginBottom: 36 }}>
            {HERO_COPY.metaItems.map((item) => (
              <div key={item.label}>
                <div style={{ ...serif, fontSize: 28, fontWeight: 900, color: C.burgBright, lineHeight: 1 }}>{item.value}</div>
                <div style={{ ...mono, fontSize: 9, textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(240,235,228,.28)', marginTop: 4 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={4} distance={16}>
          <div className="hero-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Button href="/apply">Apply to Perform &rarr;</Button>
            <Button variant="secondary" href="#about">Learn More</Button>
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint" style={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        opacity: loaded ? 1 : 0,
        transition: 'opacity 1s ease 1.2s',
      }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="hero-arrow">
          <path d="M10 4v12M5 11l5 5 5-5" stroke="rgba(240,235,228,.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ ...mono, fontSize: 8, textTransform: 'uppercase', letterSpacing: '.14em', color: 'rgba(240,235,228,.22)' }}>Scroll</span>
      </div>

      <style>{`
        .hero-arrow{animation:heroFloat 2.5s ease-in-out infinite}
        @keyframes heroFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
        @media(max-width:640px){.hero-actions{flex-direction:column}}
        @media(prefers-reduced-motion:reduce){.hero-arrow{animation:none}.hero-scroll-hint{opacity:1!important;transition:none!important}}
      `}</style>
    </section>
  );
}
