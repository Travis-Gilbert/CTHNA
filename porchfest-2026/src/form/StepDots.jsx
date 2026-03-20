import { C, mono } from '../tokens';

export default function StepDots({ total, current, accent = C.teal }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            style={{
              height: 6,
              borderRadius: 3,
              transition: 'width .3s, background .3s',
              width: i === current ? 24 : 10,
              background: i === current ? accent : i < current ? accent + '66' : C.border,
            }}
          />
        ))}
      </div>
      <span style={{
        ...mono,
        fontSize: 10,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '.1em',
        color: C.inkLight,
      }}>
        {current + 1} / {total}
      </span>
    </div>
  );
}
