import { C, sans } from '../../tokens';

export default function CheckChip({ name, value, checked, onChange, label }) {
  const id = `${name}-${value}`;
  return (
    <label
      htmlFor={id}
      className="check-chip"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '8px 14px',
        minHeight: 44,
        borderRadius: 20,
        border: `1.5px solid ${checked ? C.teal : C.border}`,
        background: checked ? C.tealDim : 'transparent',
        cursor: 'pointer',
        transition: 'border-color .2s, background .2s',
        userSelect: 'none',
      }}
    >
      <input
        type="checkbox"
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
      <span style={{ ...sans, fontSize: 14, color: checked ? C.teal : C.inkMuted }}>
        {label}
      </span>
    </label>
  );
}
