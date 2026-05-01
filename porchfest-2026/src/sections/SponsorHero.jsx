import ScrollReveal from '../components/ScrollReveal';
import { C, serif, sans, mono, cardGradient, cardBorder } from '../tokens';

const STATS = [
  { value: '3,000+', label: 'Attendees 2025' },
  { value: '20+', label: 'Performing Acts' },
  { value: '6', label: 'City Blocks' },
  { value: 'Free', label: 'Always' },
];

export default function SponsorHero() {
  return (
    <section
      style={{
        padding: '140px clamp(20px,5vw,80px) 80px',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      <div
        className="sponsor-hero-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 56,
          alignItems: 'center',
        }}
      >
        <ScrollReveal>
          <div>
            <p
              style={{
                ...mono,
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '.14em',
                color: C.goldBright,
                marginBottom: 12,
              }}
            >
              Sponsorship
            </p>
            <h1
              style={{
                ...serif,
                fontSize: 'clamp(32px, 5vw, 52px)',
                fontWeight: 800,
                lineHeight: 1.08,
                marginBottom: 16,
                color: C.heroText,
              }}
            >
              Put your brand
              <br />
              on a{' '}
              <em style={{ fontStyle: 'italic', color: C.gold }}>porch.</em>
            </h1>
            <p
              style={{
                ...sans,
                fontSize: 18,
                color: 'rgba(240,235,228,.75)',
                lineHeight: 1.6,
                maxWidth: '46ch',
                marginBottom: 28,
              }}
            >
              Sponsors Flints Best Fest.
            </p>
            <div
              className="sponsor-hero-stats"
              style={{ display: 'flex', gap: 32, marginTop: 8, flexWrap: 'wrap' }}
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      ...serif,
                      fontSize: 28,
                      fontWeight: 800,
                      color: C.heroText,
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      ...mono,
                      fontSize: 9,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '.12em',
                      color: 'rgba(240,235,228,.35)',
                      marginTop: 4,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={1}>
          <div
            className="sponsor-hero-img"
            style={{
              borderRadius: 12,
              overflow: 'hidden',
              aspectRatio: '4 / 3',
              border: `1px solid ${cardBorder}`,
              background: cardGradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <picture style={{ width: '100%', height: '100%', display: 'block' }}>
              <source
                type="image/webp"
                srcSet="/photos/photo-red-porch-dj-sm.webp 640w, /photos/photo-red-porch-dj-md.webp 960w, /photos/photo-red-porch-dj-lg.webp 1400w"
                sizes="(max-width: 900px) 480px, 440px"
              />
              <img
                src="/photos/photo-red-porch-dj.jpg"
                srcSet="/photos/photo-red-porch-dj-sm.jpg 640w, /photos/photo-red-porch-dj-md.jpg 960w, /photos/photo-red-porch-dj-lg.jpg 1400w"
                sizes="(max-width: 900px) 480px, 440px"
                alt="Performers and a DJ on a red Carriage Town porch"
                loading="eager"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </picture>
          </div>
        </ScrollReveal>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .sponsor-hero-grid { grid-template-columns: 1fr !important; }
          .sponsor-hero-img { max-width: 480px; margin: 0 auto; }
        }
        @media (max-width: 600px) {
          .sponsor-hero-stats { gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}
