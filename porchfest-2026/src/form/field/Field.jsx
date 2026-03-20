import { C, mono, sans } from '../../tokens';

export default function Field({ label, hint, error, htmlFor, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {label && (
        <label
          htmlFor={htmlFor}
          style={{
            ...mono,
            display: 'block',
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '.1em',
            color: C.ink,
            marginBottom: 6,
          }}
        >
          {label}
        </label>
      )}
      {hint && (
        <p style={{ ...sans, fontSize: 13, color: C.inkLight, marginBottom: 6, lineHeight: 1.5 }}>
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p role="alert" aria-live="polite" style={{ ...sans, fontSize: 13, color: C.error, marginTop: 4 }}>
          {error}
        </p>
      )}
    </div>
  );
}
