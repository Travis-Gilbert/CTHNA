import { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { C, serif, sans, mono, tagStyle } from '../tokens';
import { CATEGORIES, STATS, accentColor, accentBright, accentDim } from '../porchfest-data';

function CatCard({ cat, selected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const isSelected = selected === cat.id;
  const color = accentColor(cat.accent);
  const dim = accentDim(cat.accent);
  const Icon = cat.icon;

  return (
    <button
      onClick={() => onSelect(cat.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '24px 20px',
        borderRadius: 12,
        border: `2px solid ${isSelected ? color : hovered ? C.border : C.borderLight}`,
        background: isSelected ? dim : C.surface,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'border-color .2s, background .2s, transform .2s',
        transform: hovered ? 'translateY(-2px)' : 'none',
        position: 'relative',
      }}
    >
      {isSelected && (
        <span style={{
          ...mono,
          position: 'absolute',
          top: 10,
          right: 12,
          fontSize: 9,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '.1em',
          color,
        }}>
          Selected
        </span>
      )}
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: dim,
        marginBottom: 12,
      }}>
        <Icon />
      </div>
      <h3 style={{ ...serif, fontSize: 16, fontWeight: 700, color: C.ink, marginBottom: 4 }}>
        {cat.label}
      </h3>
      <p style={{ ...sans, fontSize: 13, color: C.inkMuted, lineHeight: 1.5 }}>
        {cat.description}
      </p>
    </button>
  );
}

export default function CategorySelect({ selected, onSelect, onStart }) {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Mini hero */}
      <div style={{
        background: C.dark,
        padding: '120px clamp(20px,5vw,80px) 60px',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <ScrollReveal>
            <div style={tagStyle(C.burgBright)}>
              Applications Open &middot; 7th Annual
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h1 style={{
              ...serif,
              fontSize: 'clamp(32px, 6vw, 48px)',
              fontWeight: 900,
              lineHeight: 1.05,
              color: C.heroText,
              marginBottom: 16,
            }}>
              Be part of Porchfest.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p style={{ ...sans, fontSize: 16, lineHeight: 1.7, color: 'rgba(240,235,228,.5)', maxWidth: '48ch' }}>
              Musicians, food vendors, entertainers, and anyone with something to bring to the neighborhood. Pick a category and tell us about yourself.
            </p>
          </ScrollReveal>

          {/* Mini stats */}
          <ScrollReveal delay={3}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px 32px',
              marginTop: 28,
              paddingTop: 20,
              borderTop: '1px solid rgba(240,235,228,.08)',
            }}>
              {STATS.map(s => (
                <div key={s.label}>
                  <span style={{ ...serif, fontSize: 18, fontWeight: 800, color: C.burgBright }}>{s.value}</span>
                  <span style={{ ...mono, fontSize: 9, textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(240,235,228,.28)', marginLeft: 8 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Category cards */}
      <div style={{ background: C.paper, padding: '48px clamp(20px,5vw,80px) 80px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <p style={{ ...mono, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: C.inkLight, marginBottom: 16 }}>
            What are you applying as?
          </p>
          <div className="cat-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
          }}>
            {CATEGORIES.map(cat => (
              <CatCard key={cat.id} cat={cat} selected={selected} onSelect={onSelect} />
            ))}
          </div>

          {selected && (
            <button
              onClick={onStart}
              style={{
                ...mono,
                display: 'block',
                width: '100%',
                marginTop: 20,
                padding: '16px 32px',
                borderRadius: 8,
                border: 'none',
                background: C.teal,
                color: '#fff',
                fontSize: 12,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '.12em',
                cursor: 'pointer',
                transition: 'background .2s',
              }}
            >
              Start Application
            </button>
          )}

          {/* About section */}
          <div style={{ marginTop: 60, paddingTop: 40, borderTop: `1px solid ${C.borderLight}` }}>
            <p style={{ ...mono, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: C.teal, marginBottom: 16 }}>
              About the Event
            </p>
            <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { q: 'What is Porchfest?', a: 'A free music and arts festival in Carriage Town, Flint. Performers play on front porches, street corners, and stages across six blocks.' },
                { q: 'When and where?', a: 'Friday, July 17, 2026. Carriage Town, Flint, MI. Centered on Mason Street and First Avenue.' },
                { q: 'Who performs?', a: 'Musicians, DJs, bands, spoken word artists, dancers, and comedians. All genres. Flint-based acts get priority.' },
                { q: 'Does it cost anything?', a: 'Free for everyone. Free to apply. Selected performers and vendors pay nothing. The community funds the event.' },
              ].map(item => (
                <div key={item.q} style={{ padding: '16px 18px', borderRadius: 10, border: `1px solid ${C.borderLight}`, background: C.surface }}>
                  <h4 style={{ ...serif, fontSize: 15, fontWeight: 700, color: C.ink, marginBottom: 6 }}>{item.q}</h4>
                  <p style={{ ...sans, fontSize: 13, color: C.inkMuted, lineHeight: 1.6 }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <Link to="/" style={{ ...mono, fontSize: 10, textTransform: 'uppercase', letterSpacing: '.1em', color: C.inkLight, textDecoration: 'underline' }}>
              Back to Porchfest Home
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:400px){.cat-grid{grid-template-columns:1fr!important}.info-grid{grid-template-columns:1fr!important}}
      `}</style>
    </div>
  );
}
