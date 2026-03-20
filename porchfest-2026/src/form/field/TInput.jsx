import { C, sans } from '../../tokens';

export default function TInput({ id, value, onChange, placeholder, type = 'text', ...props }) {
  return (
    <input
      id={id}
      type={type}
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        ...sans,
        width: '100%',
        padding: '12px 14px',
        fontSize: 15,
        border: `1.5px solid ${C.border}`,
        borderRadius: 8,
        background: C.surface,
        color: C.ink,
        outline: 'none',
        transition: 'border-color .2s',
      }}
      onFocus={e => { e.target.style.borderColor = C.teal; }}
      onBlur={e => { e.target.style.borderColor = C.border; }}
      {...props}
    />
  );
}
