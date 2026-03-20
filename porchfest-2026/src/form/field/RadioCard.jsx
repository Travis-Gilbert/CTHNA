import { C, sans, mono } from '../../tokens';

export default function RadioCard({ name, value, checked, onChange, label, description }) {
  const id = `${name}-${value}`;
  return (
    <label
      htmlFor={id}
      style={{
        display: 'block',
        padding: '14px 16px',
        borderRadius: 8,
        border: `1.5px solid ${checked ? C.teal : C.border}`,
        background: checked ? C.tealDim : C.surface,
        cursor: 'pointer',
        transition: 'border-color .2s, background .2s',
      }}
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
        }}
      />
      <span style={{ ...sans, fontSize: 15, fontWeight: checked ? 600 : 400, color: C.ink }}>
        {label}
      </span>
      {description && (
        <span style={{ ...sans, display: 'block', fontSize: 13, color: C.inkLight, marginTop: 2 }}>
          {description}
        </span>
      )}
    </label>
  );
}
