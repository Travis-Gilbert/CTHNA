import { C, sans } from '../../tokens';

export default function TSelect({ id, value, onChange, options, placeholder, 'aria-label': ariaLabel, ...props }) {
  return (
    <select
      id={id}
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      aria-label={ariaLabel}
      style={{
        ...sans,
        width: '100%',
        padding: '12px 14px',
        fontSize: 15,
        border: `1.5px solid ${C.border}`,
        borderRadius: 8,
        background: C.surface,
        color: value ? C.ink : C.inkLight,
        outline: 'none',
        cursor: 'pointer',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%239A8E82' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 14px center',
        paddingRight: 36,
      }}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}
